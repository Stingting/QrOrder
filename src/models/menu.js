import {changeCollect, changePurchaseNum, getCartList, getDishDetail, getMenu} from '../services/customer';
import {getSessionStorage} from "../utils/helper";
import {Toast} from 'antd-mobile';

export default {

  namespace: 'menu',

  state: {
    count:0, //总数
    data:{}, //分类菜单map数据
    visible:false, //弹框是否可见
    detail:{}, //菜式详情
    totalPurchaseNum:0 ,//记录购物车总的购买数量
    totalPurchasePrice:0 ,//记录购物车总的购买价格
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
      const {data,err} = yield call(getMenu, getSessionStorage("merchantId"));
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          const types = Object.keys(data.data);
          const currentType = types.length > 0 ? types[0] : '';
          const currentDishes = data.data[currentType];
          yield put(
            {
              type: 'showMenu',
              data: data.data,
              count: data.count,
              types: types,
              currentType: currentType,
              currentDishes: currentDishes
            }
          );
        }
      }
    },
    *getDishDetail({payload:id}, {put, call}) {
      const {data,err} = yield call(getDishDetail, getSessionStorage("merchantId"), id);
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          yield put({
            type: 'showDishDetail',
            detail: data.data,
            visible: true
          })
        }
      }
    },

    *addToCart({dish}, {call, put, select}) {
      let selectedCount = yield select(state => state.menu.detail.selectedCount);
      let num = selectedCount + 1;
      const {data,err} = yield call(changePurchaseNum, num ,dish.id,getSessionStorage("merchantId"),dish.type,getSessionStorage("tableNum"));
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          yield put({
            type: 'addPurchaseNum',
            price:dish.price
          });
        }
      }

    },

    *reduceToCart({dish}, {call,put,select}) {
      let selectedCount = yield select(state => state.menu.detail.selectedCount);
      let num = selectedCount -1;
      const {data,err} = yield call(changePurchaseNum,num,dish.id,getSessionStorage("merchantId"),dish.type,getSessionStorage("tableNum"));
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          yield put({
            type: 'reducePurchaseNum',
            price:dish.price
          });
        }
      }
    },

    *addToCartForCart({dish}, {call, put, select}) {
      //购物车列表的操作
      let num = dish.num +1;
      const {data,err} = yield call(changePurchaseNum,num,dish.id,getSessionStorage("merchantId"),dish.type,getSessionStorage("tableNum"));
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
                type: 'addCartPurchaseNum',
                price:dish.price
              }
            );

          //刷新购车列表
          yield put({
            type: 'cart/getCartList'
          })
        }
      }
    },

    *reduceToCartForCart({dish}, {call,put,select}) {
      //购物车列表的操作
      let num = dish.num - 1;
      const {data,err} = yield call(changePurchaseNum, num, dish.id, getSessionStorage("merchantId"), dish.type, getSessionStorage("tableNum"));
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
              type: 'reduceCartPurchaseNum',
              price:dish.price
            });
          //刷新购车列表
          yield put({
            type: 'cart/getCartList'
          })
        }
      }

    },

    *changeCollect({isCollect,foodId}, {call, put,select}) {
      yield put({
          type:'changeCollectState',
          isCollect:isCollect
      });
      const {data,err} = yield call(changeCollect, foodId, getSessionStorage("merchantId"),isCollect);
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          if (isCollect) {
            Toast.info("收藏成功！可到我的收藏查看");
          } else {
            Toast.info("取消收藏成功！")
          }
        }
      }
    },
    *getCartInfo({payload}, {call,put,select}) {
      //获取当前用户的购物车数量
      const {data,err} = yield call(getCartList,getSessionStorage("merchantId"),getSessionStorage("tableNum"));
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          let totalPurchaseNum = 0;
          let totalPurceasePrice = 0;
          let cartList = data.data;
          let userId = getSessionStorage("userId");
          for (let i = 0; i < cartList.length; i++) {
            let cart = cartList[i];
            if (userId === cart.userId) {
              totalPurchaseNum = cart.count;
              totalPurceasePrice = cart.price;
              break;
            }
          }
          yield put({
            type: 'refreshTotalPurchaseNum',
            totalPurchaseNum: totalPurchaseNum,
            totalPurchasePrice:totalPurceasePrice
          });
        }
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
      state.totalPurchasePrice = state.totalPurchasePrice + payload.price;
      return {...state, ...payload}
    },
    reducePurchaseNum(state,payload) {
      state.detail.selectedCount--;
      state.totalPurchaseNum--;
      state.totalPurchasePrice = state.totalPurchasePrice - payload.price;
      return {...state,...payload}
    },
    addCartPurchaseNum(state, payload) {
      state.totalPurchaseNum++;
      state.totalPurchasePrice = state.totalPurchasePrice + payload.price;
      return {...state, ...payload}
    },
    reduceCartPurchaseNum(state,payload) {
      state.totalPurchaseNum--;
      state.totalPurchasePrice = state.totalPurchasePrice - payload.price;
      return {...state,...payload}
    },
    changeCurrentType(state,payload) {
      const currentType = payload.key;
      state.currentType = currentType;
      state.currentDishes = state.data[currentType];
      return {...state, ...payload};
    },
    cleanPurchaseNum(state,payload) {
      console.log(`已经下单，清空购物车购买数量和总价了`);
      state.totalPurchaseNum = 0;
      state.totalPurchasePrice = 0;
      return {...state, ...payload};
    },
    refreshTotalPurchaseNum(state, payload) {
      return {...state, ...payload};
    }
  },

};
