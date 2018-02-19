import {getDishDetail, getMenu,changePurchaseNum,changeCollect} from '../services/customer';
import {getLocalStorage} from "../utils/helper";

export default {

  namespace: 'menu',

  state: {
    page:1, //菜单列表当前页
    size:5, //每页显示个数
    count:0, //菜单列表总数
    data:[{dashId:1,desc:'test',name:'test',pic:'',price:0,saleCount:0,type:'test'}], //菜单列表数据
    visible:false, //弹框是否可见
    loading:false, //显示列表加载样式
    detail:{count:0, desc: "", name: "", pic: "", price: 0, saleCount: 0, type: "", isCollect:false}, //菜式详情
    loadingMore: false, //列表显示加载更多按钮判断
    showLoadingMore: true,//是否显示加载更多
    totalPurchaseNum:0 //记录总的购买数量

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
        //进入菜单页面时触发的操作
        if(pathname.includes('/app/v1/menu')) {
          dispatch({type: 'getMenu'});
        }
      });
    },
  },

  effects: {
    *getMenu({ payload }, { call, put , select}) {  // eslint-disable-line
      const page = yield select(state => state.menu.page);//获取menu model下的page
      const size = yield select(state => state.menu.size);
      console.log(page +　"" + size);
      yield put({type: 'showLoading', loading: true});
      const {data} = yield call(getMenu, getLocalStorage("merchantId"), page, size);
      if(data) {
        yield put(
          {
            type: 'showMenu',
            data:data.data,
            count:data.count,
            loading:false
          }
        );
      }
    },
    *getDishDetail({payload:id}, {put, call}) {
      const {data} = yield call(getDishDetail, getLocalStorage("merchantId"), id);
      if(data) {
        yield put({
          type : 'showDishDetail',
          detail : data,
          visible:true
        })
      }
    },

    *onLoadMore({payload}, {call,put,select}) {
      yield put({type: 'showLoadMore', loadingMore: true});
      const page = yield select(state => state.menu.page) + 1 ;//页码加一
      const size = yield select(state => state.menu.size);
      const list = yield select(state => state.menu.data); //当前列表
      console.log(page +　"" + size);
      yield put({type: 'showLoading', loading: true});
      const {data} = yield call(getMenu, getLocalStorage("merchantId"), page, size);
      if(data) {
        const result = list.concat(data.data); //拼接
        yield put(
          {
            type: 'showMenu',
            data:result,
            count:data.count,
            loading:false
          }
        );
      }
    },

    *addToCart({dishId, dishType}, {call, put, select}) {
      yield put({type: 'addPurchaseNum'});
      const count = yield select(state => state.menu.detail.count);
      const {data} = yield call(changePurchaseNum, count,dishId,getLocalStorage("merchantId"),dishType);

    },

    *reduceToCart({dishId,dishType}, {call,put,select}) {
      yield put({type: 'reducePurchaseNum'});
      const count = yield select(state => state.menu.detail.count);
      const {data} = yield call(changePurchaseNum, count,dishId,getLocalStorage("merchantId"),dishType);
    },

    *changeCollect({payload}, {call, put,select}) {
      yield put({type:'changeCollectState'});
      const isCollect = yield select(state => state.menu.detail.isCollect);
      const dishId = yield select(state => state.menu.detail.id);
      const {data} = yield call(changeCollect, dishId, getLocalStorage("merchantId"),isCollect);
    }
  },

  reducers: {
    showLoading(state, payload) {
      return {...state, ...payload};
    },
    showMenu(state, payload) {
      const pageSize = state.count%state.rows + 1;
      if (pageSize > state.page) {
        state.loadingMore = true;
      } else {
        state.loadingMore = false;
      }
      window.dispatchEvent(new Event('resize'));
      return { ...state, ...payload };
    },

    showDishDetail(state, payload) {
      return {...state, ...payload}
    },
    closeDetailDialog(state,payload) {
      state.visible = false;
      return {...state, payload};
    },
    showLoadMore(state, payload) {
      return {...state, payload};
    },
    changeCollectState(state, payload) {
      state.detail.isCollect = !state.detail.isCollect;
      return {...state, payload}
    },
    addPurchaseNum(state, payload) {
      state.detail.count++;
      state.totalPurchaseNum++;
      return {...state, payload}
    },
    reducePurchaseNum(state,payload) {
      state.detail.count--;
      state.totalPurchaseNum--;
      return {...state,payload}
    }
  },

};
