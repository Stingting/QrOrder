import {routerRedux} from 'dva/router';
import {getCollectList} from "../services/customer";
import {getLocalStorage,getSessionStorage} from "../utils/helper";

export default {

  namespace: 'pcenter',

  state: {
      count:0, //总数
      data:[], //菜单列表,
      page:1,//当前页
      size:5,//每页显示的条数
      loading:false,
      loadingMore: false,
      showLoadingMore: true
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
    *toCollectPage({ payload }, { call, put }) {  // eslint-disable-line
      yield put(routerRedux.push('/app/v1/user/collect', payload));
    },

    *about({ payload }, { call, put }) {  // eslint-disable-line
      yield put(routerRedux.push('/app/v1/user/about', payload));
    },
    *getCollectList({payload}, {call, put, select}) {
      const page = yield select(state => state.pcenter.page);
      const size = yield select(state => state.pcenter.size);
      yield put({type: 'showLoading', loading: true});
      const {data} = yield call(getCollectList, getSessionStorage("merchantId"), page, size);
      if(data) {
        yield put(
          {
            type: 'showCollectList',
            data:data.data,
            count:data.count,
            loading:false
          }
        );
      }
    },
    *onLoadMore({payload}, {call,put,select}) {
      yield put({type: 'showLoadMore', loadingMore: true});
      const page = yield select(state => state.menu.page) + 1 ;//页码加一
      const size = yield select(state => state.menu.size);
      const list = yield select(state => state.menu.data); //当前列表
      yield put({type: 'showLoading', loading: true});
      const {data} = yield call(getCollectList, getSessionStorage("merchantId"), page, size);
      if(data) {
        const result = list.concat(data.data); //拼接
        yield put(
          {
            type: 'showCollectList',
            data:result,
            count:data.count,
            loading:false
          }
        );
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
      const pageSize = state.count%state.rows + 1;
      if (pageSize > state.page) {
        state.loadingMore = true;
      } else {
        state.loadingMore = false;
      }
      window.dispatchEvent(new Event('resize'));
      return { ...state, ...payload };
    },
    closeDetailDialog(state,payload) {
      state.visible = false;
      return {...state, payload};
    },
    showLoadMore(state, payload) {
      return {...state, payload};
    },
    showLoading(state, payload) {
      return {...state, ...payload};
    }
  },

};
