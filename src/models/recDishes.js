import {getMerchantInfo,addOrCleanTable} from '../services/customer';
import {getSessionStorage,setSessionStorage,isObject} from "../utils/helper";
import {Toast} from 'antd-mobile';

export default {
  namespace : 'recDishes',

  state :{
    count:0, //总数
    desc:'', //商家简介
    name:'', //商家名称
    pic:[], //商家图片
    list: [], //初始化推荐菜单列表
    addPersonNumModalVisible:false
  },
  reducers: {
    showLoading(state, payload) {
      return {...state, ...payload};
    },
    showDishList(state, payload) {
      return {...state, ...payload};
    },
    setPersonNumModalVisible(state, payload) {
      state.addPersonNumModalVisible = true;
      return {...state, ...payload};
    },
    closeDialog(state,payload) {
      state.addPersonNumModalVisible = false;
      return {...state, ...payload};
    }
  },
  effects: {
    //声明时需要添加*，普通函数内部不能使用yield关键字，否则会出错
    *getMerchantInfo(action, {put, call}) {
      const {data,err} = yield call(getMerchantInfo, getSessionStorage("merchantId"));
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
            type: 'showDishList',
            list: data.data.food,
            count: data.data.count,
            desc: data.data.desc,
            name: data.data.name,
            pic: (data.data.pic === undefined || data.data.pic === '' || data.data.pic == null) ? [] : data.data.pic
          });
        }
      }
    },
    *joinTable({personNum}, {put,call}) {
       const params = {
          merchantId:getSessionStorage("merchantId"),
          status:3,
          tableId:getSessionStorage("tableNum"),
          personNum:personNum
       };
      const {data,err} = yield call(addOrCleanTable,params);
      if(err) {
        throw new Error(err.message);
      } else {
        if (data.msg) {
          if (data.msg !== "") {
            Toast.info(data.msg);
          }
        }
        else {
          setSessionStorage("personNum", personNum);
          console.log(`加入餐桌成功！`);
          console.log(`当前餐桌用餐人数：${getSessionStorage("personNum")}`);
          yield put({
            type: 'closeDialog'
          })
        }
      }
    }
  }
,
  subscriptions: {
    setup({ dispatch,history }){
      //监听，当进入pathname时，触发`getMerchantInfo` action
      return history.listen(({ pathname,search})=>{
        //进入首页时获取商家信息
        if(pathname.includes('/app/v1/cportal')) {
          dispatch({type: 'getMerchantInfo'});
        }
        //进入首页时填写用餐人数后加入餐桌
        if(pathname.includes('/app/v1/cportal') && !isObject(getSessionStorage("personNum"))) {
            //弹出人数填写框加入餐桌
            dispatch({type:'setPersonNumModalVisible'});
        }
      });
    }
  },

}
