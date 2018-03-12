import {confirmOrder, deleteDish, getCartList, getOrderDetail, getPaidList, getUnPaidList} from '../services/customer';
import {getSessionStorage,isObject} from "../utils/helper";
import {routerRedux} from 'dva/router';
import {message} from 'antd';

export default {

  namespace: 'cart',

  state: {
    paidList:[], //已支付订单
    unpaidData:{}, //用户未支付订单,
    price:0, //订单总价,
    count:0,
    activeKey:'1',
    totalUnpaidCount:0, //未支付的菜式数量,
    totalPerson:0,
    totalPrice: 0,
    totalCount: 0,
    detail:{}, //订单详情
    cartListVisible:false,
    cartList:[], //购物车列表信息
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search,params})=>{
         if(pathname.includes('/app/v1/cart')) {
           dispatch({
             type:'getPayList',
             payload:'1'
           })
         }

        if (pathname.includes('/app/v1/cart/orderdetail')) {
          /**
           * 获取订单详情信息
           */
          dispatch({
            type: 'getOrderDetail',
            orderId: params.orderId
          })
        }
        });
    }
  },

  effects: {
    *getPayList({ payload }, { call, put , select}) {  // eslint-disable-line
      yield put({ type: 'changeActiveKey', activeKey:payload });
      const activeKey = yield select(state => state.cart.activeKey);
      const isPaid = activeKey==='1'?false:true;
      if (isPaid) {
        const {data} = yield call(getPaidList, getSessionStorage("merchantId"),getSessionStorage("tableNum"),2);
        yield put({
          type: 'refreshPayList',
          paidList:data.data.list,
          totalPerson:data.data.totalPerson,
          totalPrice: data.data.totalPrice,
          totalCount: data.data.totalCount
        })
      } else {
        const {data} = yield call(getUnPaidList, getSessionStorage("merchantId"),getSessionStorage("tableNum"),1);
        if(data) {
          yield put({
            type: 'refreshPayList',
            unpaidData: data.data.list,
            price: data.data.price,
            count: data.data.count
          })
        }
      }
    },

    *getOrderDetail({orderId}, {call,put,select}) {
      const {data} = yield call (getOrderDetail,getSessionStorage("merchantId"),orderId);
      yield put({
        type:'showOrderDetail',
        detail : data.data
      })
    },

    *backToUnpaidList({payload}, {call,put,select}) {
      yield put(routerRedux.push('/app/v1/cart'));
    },

    *deleteDish({dishId,orderId},{call,put,select}) {
      const activeKey = yield select(state => state.cart.activeKey);
      const {data} = yield call(deleteDish, dishId, orderId, getSessionStorage("merchantId")) ;
      if (data.isOk) {
         message.success("删除成功！", 0.2);
         //刷新支付列表
         yield put({ type: 'getPayList', payload: activeKey });
      }
    },

    *confirmOrder({ payload }, { call, put,select }) {
      yield put({
        type:'closeCartList'
      });
      //结算，只结算自己的
      const cartData = yield select(state => state.cart.cartList);
      let shoppingCartId;
      if(cartData.length >0) {
        for(let i =0; i<cartData.length;i++) {
          let item = cartData[i];
          if(item.userId === getSessionStorage("userId")) {
            shoppingCartId = item.id;
            break;
          } else {
            continue;
          }
        }
      }
      if (isObject(shoppingCartId)) {
        const {data} = yield call(confirmOrder,shoppingCartId,getSessionStorage("merchantId"),getSessionStorage("personNum"),getSessionStorage("tableNum"));
        if(data&&data.isOk) {
          const orderId = data.id;
          yield put(routerRedux.push({
            pathname: '/app/v1/cart/orderdetail',
            params: {
              orderId: orderId
            },
          }));
          //清空购买数量
          yield put({type:'menu/cleanPurchaseNum'});
        }
      } else {
        message.warn("您当前没有要结算的购物车信息",3);
      }
    },
    *getCartList({payload}, {call, put}) {
      const {data} = yield call(getCartList,getSessionStorage("merchantId"),getSessionStorage("tableNum"));
      if(data) {
        //获取购物车列表信息
        yield put ({
          type:'refreshCartList',
          cartList:data.data,
          cartListVisible:true
        });
      }
    },
    //刷新获取同桌点的菜式
    *getNewCartList({payload},{call,put}) {
      const {data} = yield call(getCartList,getSessionStorage("merchantId"),getSessionStorage("tableNum"));
      if(data) {
        //获取购物车列表信息
        yield put ({
          type:'refreshCartList',
          cartList:data.data
        });
      }
    }
  },

  reducers: {
    changeActiveKey(state, payload) {
      return { ...state, ...payload };
    },
    refreshPayList(state, payload) {
      return {...state, ...payload};
    },
    showOrderDetail(state, payload) {
      return {...state, ...payload};
    },
    showCartList(state, payload) {
      state.cartListVisible = true;
      return {...state, ...payload};
    },
    closeCartList(state, payload) {
      state.cartListVisible = false;
      return {...state, ...payload};
    },
    refreshCartList(state, payload) {
      return {...state, ...payload};
    }
  },

};
