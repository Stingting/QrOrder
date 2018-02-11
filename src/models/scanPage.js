import pathToRegexp from 'path-to-regexp';
import constant from '../config';
import {routerRedux} from 'dva/router';
import {setLocalStorage} from "../utils/helper";

export default {
  namespace: 'scan',

  state: {

  },
  reducers: {


  },
  effects: {
    *toIndex({ payload },{select,call, put}){
      yield put(routerRedux.push('/app/v1/cportal'));
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, search}) => {
        const path = constant.scanPath;
        if (pathname.includes(path)) {
          const match = pathToRegexp(path + '/:id/:num').exec(pathname);
          if (match) {
            const id = match[match.length - 2];
            const num = match[match.length - 1];
            //缓存商家id
            setLocalStorage("merchantId", id);
            //缓存桌号
            setLocalStorage("tableNum", num);
            console.log("merchantId=" + id + ", tableNum=" + num);
            //跳转首页
            // With query
            dispatch({type: 'toIndex'});
          }
        }
      });
    }
  }
}

