import {getPaidList, getUnPaidList, deleteDish, getOrderDetail,confirmOrder} from '../services/customer';
import {getLocalStorage,getSessionStorage} from "../utils/helper";
import {routerRedux} from 'dva/router';
import {message} from 'antd';

export default {

  namespace: 'cart',

  state: {
    paidList:[], //已支付订单
    unpaidData:{}, //用户未支付订单,
    price:0, //订单总价
    activeKey:'1',
    totalUnpaidCount:0, //未支付的菜式数量,
    detail:{count:0,data:{},price:0,remark:""} //订单详情
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
        const {data} = yield call(getPaidList, getSessionStorage("merchantId"));
        yield put({
          type: 'refreshPayList',
          paidList:data.data,
          price:data.price
        })
      } else {
        const {data} = yield call(getUnPaidList, getSessionStorage("merchantId"));
        yield put({
          type :'refreshPayList',
          unpaidData:data.data,
          price:data.price
        })
      }
    },
    *toOrderDetail({payload}, {call,put,select}) {
      const dishes = yield select(state =>state.cart.unpaidData.list);
      //确认订单
      const {data} = yield call(confirmOrder, dishes,getSessionStorage("merchantId"), getSessionStorage("personNum"), getSessionStorage("tableNum"));
      if(data.isOk) {
        yield put(routerRedux.push({
          pathname: '/app/v1/cart/orderdetail',
          params: {
            orderId: data.id
          },
        }));
      }
    },

    *getOrderDetail({orderId}, {call,put,select}) {
      const {data} = yield call (getOrderDetail, orderId,getSessionStorage("merchantId"));
      yield put({
        type:'showOrderDetail',
        detail : data
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
    }
  },

};
