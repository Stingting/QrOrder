import {changeCollect, changePurchaseNum, getCartList, getDishDetail, getMenu} from '../services/customer';
import {getSessionStorage} from "../utils/helper";
import {Toast} from 'antd-mobile';

export default {

  namespace: 'menu',

  state: {
    count:0, //总数
    data:{}, //分类菜单map数据
    visible:false, //弹框是否可见
    loading:false, //显示列表加载样式
    detail:{}, //菜式详情
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
        //进入首页时获取当前用户的购物车购买数量
        if(pathname.includes('/app/v1/cportal')) {
          dispatch({type: 'getCartInfo'});
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
      const selectedCount = yield select(state => state.menu.detail.selectedCount);
      const {data} = yield call(changePurchaseNum, selectedCount,dishId,getSessionStorage("merchantId"),dishType,getSessionStorage("tableNum"));

    },

    *reduceToCart({dishId,dishType}, {call,put,select}) {
      yield put({type: 'reducePurchaseNum'});
      const selectedCount = yield select(state => state.menu.detail.selectedCount);
      const {data} = yield call(changePurchaseNum, selectedCount,dishId,getSessionStorage("merchantId"),dishType,getSessionStorage("tableNum"));
    },

    *addToCartForCart({dish}, {call, put, select}) {
      yield put({type: 'addCartPurchaseNum'});
      let num = dish.num +1;
      const {data} = yield call(changePurchaseNum,num,dish.id,getSessionStorage("merchantId"),dish.type,getSessionStorage("tableNum"));
      if(data&&data.isOk) {
          //刷新购车列表
        yield put({
          type:'cart/getCartList'
        })
      }
    },

    *reduceToCartForCart({dish}, {call,put,select}) {
      yield put({type: 'reduceCartPurchaseNum'});
      let num = dish.num - 1;
      const {data} = yield call(changePurchaseNum, num, dish.id, getSessionStorage("merchantId"), dish.type, getSessionStorage("tableNum"));
      if(data&&data.isOk) {
        //刷新购车列表
        yield put({
          type:'cart/getCartList'
        })
      }

    },

    *changeCollect({isCollect,foodId}, {call, put,select}) {
      yield put({
          type:'changeCollectState',
          isCollect:isCollect
      });
      const {data} = yield call(changeCollect, foodId, getSessionStorage("merchantId"),isCollect);
      if(data&& data.isOk) {
        if(isCollect) {
          Toast.info("收藏成功！可到我的收藏查看");
        } else {
          Toast.info("取消收藏成功！")
        }
      }
    },
    *getCartInfo({payload}, {call,put,select}) {
      //获取当前用户的购物车数量
      const {data} = yield call(getCartList,getSessionStorage("merchantId"),getSessionStorage("tableNum"));
      if(data) {
        let totalPurchaseNum=0;
        let cartList = data.data;
        let userId = getSessionStorage("userId");
        for(let i=0;i<cartList.length;i++) {
          let cart = cartList[i];
          if(userId === cart.userId) {
            totalPurchaseNum = cart.count;
            break;
          }
        }
        yield put ({
          type:'refreshTotalPurchaseNum',
          totalPurchaseNum:totalPurchaseNum
        });
      }
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
      return {...state, ...payload};
    },
    showLoadMore(state, payload) {
      return {...state, ...payload};
    },
    changeCollectState(state, payload) {
      state.detail.isCollect = payload.isCollect;
      return {...state, ...payload}
    },
    addPurchaseNum(state, payload) {
      state.detail.selectedCount++;
      state.totalPurchaseNum++;
      return {...state, ...payload}
    },
    reducePurchaseNum(state,payload) {
      state.detail.selectedCount--;
      state.totalPurchaseNum--;
      return {...state,...payload}
    },
    addCartPurchaseNum(state, payload) {
      state.totalPurchaseNum++;
      return {...state, ...payload}
    },
    reduceCartPurchaseNum(state,payload) {
      state.totalPurchaseNum--;
      return {...state,...payload}
    },
    changeCurrentType(state,payload) {
      const currentType = payload.key;
      state.currentType = currentType;
      state.currentDishes = state.data[currentType];
      return {...state, ...payload};
    },
    cleanPurchaseNum(state,payload) {
      console.log(`已经下单，清空购买数量了`);
      state.totalPurchaseNum = 0;
      return {...state, ...payload};
    },
    refreshTotalPurchaseNum(state, payload) {
      return {...state, ...payload};
    }
  },

};
