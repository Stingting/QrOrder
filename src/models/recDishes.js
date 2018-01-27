import  {getRecDishes} from '../services/recDishes';

export default {
  namespace : 'recDishes',

  state :{
    list: [{id:1, dishName: '红绕肉'}],
    count:0,
    loading : false,
  },
  reducers: {
    request(state, payload) {
      return {...state, ...payload};
    },
    response(state, payload) {
      return {...state, ...payload};
    }
  },
  effects: {
    *getRecDishes(action, {put, call}) {
      yield put({type: 'request', loading: true});
      const {data} = yield call(getRecDishes);
      console.log("结果=" + data.result);
      if (data) {
        yield put({
          type : 'response',
          loading : false,
          list : data.result
        });
      }
    }
  }
,
  subscriptions: {
    setup({ dispatch,history }){
      console.log('running subscriptions ...');
      return history.listen(({ pathname,search })=>{
        console.log(`pathname: ${pathname}`);
        dispatch({ type:'getRecDishes'});
      });
    }
  },

}
