import  {getRecDishes, getDishDetail} from '../services/recDishes';

export default {
  namespace : 'recDishes',

  state :{
    list: [{id:1, dishName: '红绕肉'}], //初始化
    loading : false, //控制加载状态
    detail : {}, //详情,
    detailModalVisible:false
  },
  reducers: {
    showLoading(state, payload) {
      return {...state, ...payload};
    },
    showDishList(state, payload) {
      return {...state, ...payload};
    },
    showDishDetail(state, payload) {
      return {...state, ...payload}
    },
    closeDetailDialog(state,payload) {
      state.detailModalVisible = false;
      return {...state, payload}
    }
  },
  effects: {
    //声明时需要添加*，普通函数内部不能使用yield关键字，否则会出错
    *getRecDishes(action, {put, call}) {
      yield put({type: 'showLoading', loading: true});
      const {data} = yield call(getRecDishes);
      console.log("结果=" + data.result);
      if (data) {
        yield put({
          type : 'showDishList',
          loading : false,
          list : data.result
      });
      }
    },

    *getDishDetail({payload:id}, {put, call}) {
      const {data} = yield call(getDishDetail,id);
      if(data) {
        yield put({
          type : 'showDishDetail',
          detail : data.result,
          detailModalVisible:true
        })
      }
    }
  }
,
  subscriptions: {
    setup({ dispatch,history }){
      console.log('running subscriptions ...');
      //监听，当进入pathname时，触发`getRecDishes` action
      return history.listen(({ pathname,search })=>{
        console.log(`pathname: ${pathname}`);
        dispatch({ type:'getRecDishes'});
      });
    }
  },

}
