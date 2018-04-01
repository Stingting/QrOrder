import pathToRegexp from 'path-to-regexp';
import constant from '../config';
import {routerRedux} from 'dva/router';
import {setSessionStorage} from "../utils/helper";
import {login} from "../services/customer";
import {Toast} from 'antd-mobile';

export default {
  namespace: 'scan',

  state: {

  },
  reducers: {


  },
  effects: {
    *login({ payload }, { call, put }) {
        const {data,err} = yield call(login, payload);
        if(err) {
          if(err.response.status === 504) {
            Toast.offline('服务器请求异常!!!', 4);
          } else {
            throw new Error(err.message);
          }
        }
        else if (data) {
          const token = data.authorization;
          const head = data.head;
          const userId = data.id;
          const nickName = data.nickName;
          setSessionStorage("token", token);
          setSessionStorage("head", head);
          setSessionStorage("userId", userId);
          setSessionStorage("nickName", nickName);
          //跳转到首页
          yield put(routerRedux.push('/app/v1/cportal'));
        }
    },

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
            setSessionStorage("merchantId", id);
            //缓存桌号
            setSessionStorage("tableNum", num);
            console.log("merchantId=" + id + ", tableNum=" + num);
            //登录验证（暂时先写死一个用户，后面会通过微信认证接口）
            dispatch(
              {
                type:'login',
                payload:{
                  userName:constant.userName,
                  password:constant.password //这里用户先写死
                }
             })
          }
        }
      });
    }
  }
}

