import {getMenu} from '../services/customer';
import {getLocalStorage} from "../utils/helper";

export default {

  namespace: 'menu',

  state: {
    page:1,
    size:5,
    count:0,
    data:[{dashId:1,desc:'test',name:'test',pic:'',price:0,saleCount:0,type:'test'}]
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
      const {data} = yield call(getMenu, getLocalStorage("merchantId"), page, size);
      if(data) {
        yield put(
          {
            type: 'showMenu',
            data:data.data,
            count:data.count
          }
        );
      }
    },
  },

  reducers: {
    showMenu(state, payload) {
      return { ...state, ...payload };
    },
  },

};
