import {routerRedux} from 'dva/router';
import {getCollectList} from "../services/customer";
import {getSessionStorage} from "../utils/helper";
import {Toast} from 'antd-mobile';

export default {

  namespace: 'pcenter',

  state: {
      count:0, //总数
      data:[], //菜单列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,search})=>{
        if (pathname.includes('/app/v1/user/collect')) {
            dispatch({
              type:'getCollectList'
            })
        }
      });
    },
  },

  effects: {
    *toCartPage({ payload }, { call, put }) {
      yield put(routerRedux.push('/app/v1/cart', payload));
    },
    *toCollectPage({ payload }, { call, put }) {
      yield put(routerRedux.push('/app/v1/user/collect', payload));
    },
    *about({ payload }, { call, put }) {
      yield put(routerRedux.push('/app/v1/user/about', payload));
    },
    *getCollectList({payload}, {call, put, select}) {
      const {data,err} = yield call(getCollectList, getSessionStorage("merchantId"));
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          yield put(
            {
              type: 'showCollectList',
              data: data.data,
              count: data.count
            }
          );
        }
      }
    },
    *backToPcenter({payload}, {call,put,select}) {
      yield put(routerRedux.goBack());
    },

    *toUpdateNickname({payload}, {call,put,select}) {
      yield put(routerRedux.push('/app/v1/user/updateNickname', payload));
    }
  },

  reducers: {
    showCollectList(state, payload) {
      return { ...state, ...payload };
    },
    showLoadMore(state, payload) {
      return {...state, ...payload};
    },
    showLoading(state, payload) {
      return {...state, ...payload};
    }
  },

};
