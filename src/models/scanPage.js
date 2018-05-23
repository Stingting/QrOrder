import pathToRegexp from 'path-to-regexp';
import constant from '../config';
import {routerRedux} from 'dva/router';
import {setSessionStorage,getSessionStorage, isObject} from "../utils/helper";
import {Toast} from 'antd-mobile';
import Uri from 'jsuri';
import {wechatAuth,getUserInfo} from "../services/customer";

export default {
  namespace: 'scan',

  state: {

  },
  reducers: {


  },
  effects: {
    *wechatAuth({payload}, {call, put}) {
      //获取微信授权认证url
      const {data,err} = yield call(wechatAuth);
      if(err) {
        throw new Error(err.message);
      }
      else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
            const authUrl = data.url;
            console.log(`authUrl:${authUrl}`);
            //跳转微信授权认证url
            if(authUrl) {
               document.location.href = authUrl;
            }
        }
      }

    },

    *getUserInfo({code,wechatstate}, {call, put}) {
      const {data,err} = yield call(getUserInfo, code, wechatstate);
      if(err) {
        throw new Error(err.message);
      }
      else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          //获取用户信息和调用后台接口token
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
            // 获取微信授权认证url
            if(!isObject(getSessionStorage("userId"))) {
              dispatch({
                type: 'wechatAuth',
              });
            }
          }
        }

        //微信授权登录回调
        if (pathname.includes("/app/v1/user/wechatAuth")) {
          var uri = new Uri(document.location.href);
          //获取微信返回的code和state给后台
          var code = new Uri(uri.query()).getQueryParamValue("code");
          var wechatstate = new Uri(uri.query()).getQueryParamValue("state");
          //通过code和state调用后台接口获取用户信息
          dispatch({
            type:'getUserInfo',
            code:code,
            wechatstate:wechatstate
          })
        }
      });
    }
  }
}

