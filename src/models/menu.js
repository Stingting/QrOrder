import {getDishDetail, getMenu,changePurchaseNum,changeCollect} from '../services/customer';
import {getLocalStorage,getSessionStorage} from "../utils/helper";

export default {

  namespace: 'menu',

  state: {
    count:0, //总数
    data:{}, //分类菜单map数据
    visible:false, //弹框是否可见
    loading:false, //显示列表加载样式
    detail:{count:0, desc: "", name: "", pic: "", price: 0, saleCount: 0, type: "", isCollect:false}, //菜式详情
    totalPurchaseNum:0 ,//记录总的购买数量
    types:[],//菜式分类
    currentType:'',//当前选中的菜式分类
    currentDishes:[] //当前菜式分类的菜式列表
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
      yield put({type: 'showLoading', loading: true});
      const {data} = yield call(getMenu, getSessionStorage("merchantId"));
      if(data) {
        const types = Object.keys(data.data);
        const currentType = types.length>0?types[0]:'';
        const currentDishes = data.data[currentType];
        yield put(
          {
            type: 'showMenu',
            data:data.data,
            count:data.count,
            loading:false,
            types:types,
            currentType:currentType,
            currentDishes:currentDishes
          }
        );
      }
    },
    *getDishDetail({payload:id}, {put, call}) {
      const {data} = yield call(getDishDetail, getSessionStorage("merchantId"), id);
      if(data) {
        yield put({
          type : 'showDishDetail',
          detail : data.data,
          visible:true
        })
      }
    },

    *addToCart({dishId, dishType}, {call, put, select}) {
      yield put({type: 'addPurchaseNum'});
      const count = yield select(state => state.menu.detail.count);
      const {data} = yield call(changePurchaseNum, count,dishId,getSessionStorage("merchantId"),dishType);

    },

    *reduceToCart({dishId,dishType}, {call,put,select}) {
      yield put({type: 'reducePurchaseNum'});
      const count = yield select(state => state.menu.detail.count);
      const {data} = yield call(changePurchaseNum, count,dishId,getSessionStorage("merchantId"),dishType);
    },

    *changeCollect({payload}, {call, put,select}) {
      yield put({type:'changeCollectState'});
      const isCollect = yield select(state => state.menu.detail.isCollect);
      const dishId = yield select(state => state.menu.detail.id);
      const {data} = yield call(changeCollect, dishId, getSessionStorage("merchantId"),isCollect);
    }
  },

  reducers: {
    showLoading(state, payload) {
      return {...state, ...payload};
    },
    showMenu(state, payload) {
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
    },
    changeCurrentType(state,payload) {
      const currentType = payload.key;
      state.currentType = currentType;
      state.currentDishes = state.data[currentType];
      return {...state, ...payload};
    }
  },

};
