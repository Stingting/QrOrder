import {getPaidList, getUnPaidList, deleteDish, getOrderDetail,confirmOrder} from '../services/customer';
import {getLocalStorage,getSessionStorage} from "../utils/helper";
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
    personNum:null //用餐人数
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
        const {data} = yield call(getPaidList, getSessionStorage("merchantId"),getSessionStorage("tableNum"));
        yield put({
          type: 'refreshPayList',
          paidList:data.data.list,
          totalPerson:data.data.totalPerson,
          totalPrice: data.data.totalPrice,
          totalCount: data.data.totalCount
        })
      } else {
        const {data} = yield call(getUnPaidList, getSessionStorage("merchantId"));
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
    *toOrderDetail({payload}, {call,put,select}) {
      const foods = yield select(state =>state.cart.unpaidData);
      const personNum = yield select(state=>state.cart.personNum);
      if(personNum==null || personNum==undefined||personNum=='') {
        message.warn("请选择用餐人数！",2);
      }
      //确认订单
      else {
        const params = [];
        foods.map(function (food) {
          const obj = {
            id: food.id,
            type: food.type,
            num: food.num
          };
          params.push(obj);
        });
        const {data} = yield call(confirmOrder, params, getSessionStorage("merchantId"),  personNum, getSessionStorage("tableNum"));
        if (data) {
          yield put(routerRedux.push({
            pathname: '/app/v1/cart/orderdetail',
            params: {
              orderId: data.id
            },
          }));
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
      yield put(routerRedux.goBack());
    },

    *deleteDish({dishId,orderId},{call,put,select}) {
      const activeKey = yield select(state => state.cart.activeKey);
      const {data} = yield call(deleteDish, dishId, orderId, getSessionStorage("merchantId")) ;
      if (data.isOk) {
         message.success("删除成功！", 0.2);
         //刷新支付列表
         yield put({ type: 'getPayList', payload: activeKey });
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
    handlePersonNumChange(state,payload) {
      state.personNum = payload.personNum;
      return {...state, ...payload};
    }
  },

};
