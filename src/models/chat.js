import constant from '../config';
import mqttClient from '../utils/mqttUtil';
import {getMenu, getChatRoomInfo,getChatRecord} from "../services/customer";
import {getLocalStorage,getSessionStorage} from "../utils/helper";
import moment from 'moment';

export default {

  namespace: 'chat',

  state: {
      count:0, //	人数
      num:0,	//几号桌
      remark:'',	//备注
      words:['你好！', '迟点给你答复'],//常用短语
      sendMessages:[],
      sendContent:'', //发送的消息
      unReadCount:0, //消息未读条数
      visible:false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
        //进入聊天页面时触发的操作
        if(pathname.includes('/app/v1/chat')) {
          //获取聊天室信息
          // dispatch({type: 'getChatRoomInfo'});
          //获取聊天记录
          // dispatch({type: 'getChatRecord'});
          //进入聊天页面时清空未读条数
          dispatch({type:'clearUnReadCount'});
        }
        //连接mqtt服务
        mqttClient.getInstance().on('connect', function () {
          //订阅主题：order_system/2/2/chat, order_system/business_id/table_id/chat
          const topic = `order_system/${getSessionStorage("merchantId")}/${getSessionStorage("tableNum")}/chat`;
          mqttClient.getInstance().subscribe(topic);
          mqttClient.getInstance().on('message', function (topic, message) {
            // message is Buffer
            console.log(`收到的消息 ${message.toString()}`);
            //设置聊天消息
            dispatch({type:'setChatMessage', chatMsg:message.toString()});
            if(!history.location.pathname.includes('/app/v1/chat')) { //判断当前页面是否是聊天页面，这里用history.location.pathname获取当前路径
              dispatch({type:'addUnreadCount'});
            }
          });
        });

        mqttClient.getInstance().on('close', function () {
            console.log("emqtt closed...");
        });

        mqttClient.getInstance().on("error", function (error) {
          console.log(error.toString());
        });

      });
    },
  },

  effects: {
    *getChatRoomInfo({ payload }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(getChatRoomInfo, getSessionStorage("merchantId"), getSessionStorage("tableNum"));
      yield put({
        type: 'showChatRoomInfo' ,
        count : data.count,
        num: data.num,
        remark:data.remark,
        words:data.words
      });
    },
    *getChatRecord({payload}, {call,put}) {
      const {data} = yield call(getChatRecord, getSessionStorage("merchantId"), getSessionStorage("tableNum"));
      yield put({
        type:'refreshChatMsg',
        chatRecords:data.data
      });
    }
  },

  reducers: {
    showChatRoomInfo(state, payload) {
      return { ...state, ...payload };
    },
    handleSend(state, payload) {
      //添加发送内容
      const msg = {
        time:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        head:getSessionStorage("head"),
        content:payload.msg,
        userId:getSessionStorage("userId"),
        nickName:getSessionStorage("nickName")
      };
      //发送string 或 Buffer 类型
      const topic = `order_system/${getSessionStorage("merchantId")}/${getSessionStorage("tableNum")}/chat`;
      mqttClient.getInstance().publish(topic, JSON.stringify(msg));
      //发送后清空发送文本框内容
      state.sendContent = "";
      state.visible=false;
      return{...state, ...payload};
    },
    handleInputChange(state, payload) {
      state.sendContent = payload.msg;
      return{...state, ...payload};
    },
    setChatMessage(state, payload) {
      state.sendMessages.push(JSON.parse(payload.chatMsg));
      return{...state, ...payload}
    },
    addUnreadCount(state, payload) {
      state.unReadCount++;
      return{...state, ...payload}
    },
    clearUnReadCount(state, payload) {
      state.unReadCount=0;
      return{...state, ...payload}
    },
    refreshChatMsg(state,payload) {
      const records = payload.chatRecords;
      state.sendMessages=[];
      records.map((item,key) => (
        state.sendMessages.push(item)
      ));
      return{...state, ...payload}
    },
    handleVisibleChange(state,payload) {
      state.visible = payload.visible;
      return{...state, ...payload}
    }
  },

};
