import {getPayList,deleteDish} from '../services/customer';
import {getLocalStorage} from "../utils/helper";
import {routerRedux} from 'dva/router';
import {message} from 'antd';

export default {

  namespace: 'cart',

  state: {
    paidList:[], //已支付订单
    unpaidList:[], //未支付订单,
    price:0, //订单总价
    activeKey:'1',
    totalUnpaidCount:0 //未支付的菜式数量
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
         if(pathname.includes('/app/v1/cart')) {
           dispatch({
             type:'getPayList',
             payload:'1'
           })
         }
      });
    }
  },

  effects: {
    *getPayList({ payload }, { call, put , select}) {  // eslint-disable-line
      yield put({ type: 'changeActiveKey', activeKey:payload });
      const activeKey = yield select(state => state.cart.activeKey);
      const isPaid = activeKey=='1'?false:true;
      const {data} = yield call(getPayList, getLocalStorage("merchantId"), isPaid);
      if (data) {
        if (isPaid) {
          yield put({
            type: 'refreshPayList',
            paidList:data.data,
            price:data.price
          })
        } else {
          yield put({
            type :'refreshPayList',
            unpaidList:data.data,
            price:data.price
          })
        }
      }
    },
    *showPayDetail({payload}, {call,put,select}) {
      yield put(routerRedux.push('/app/v1/cart/paydetail', payload));
    },

    *backToUnpaidList({payload}, {call,put,select}) {
      yield put(routerRedux.goBack());
    },

    *deleteDish({dishId,orderId},{call,put,select}) {
      const activeKey = yield select(state => state.cart.activeKey);
      const {data} = yield call(deleteDish, dishId, orderId, getLocalStorage("merchantId")) ;
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
    }
  },

};
