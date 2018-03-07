import constant from '../config';
import mqttClient from '../utils/mqttUtil';
import {getMenu, getChatRoomInfo,getChatRecord} from "../services/customer";
import {getLocalStorage,getSessionStorage} from "../utils/helper";
import moment from 'moment';
import uuid from 'uuid';

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
          dispatch({type: 'getChatRecord'});
          //进入聊天页面时清空未读条数
          dispatch({type:'clearUnReadCount'});
        }
        //连接mqtt服务
        mqttClient.getInstance().on('connect', function () {
          //订阅主题： orderSystem/2/2/chat,  orderSystem/business_id/table_id/chat
          const topic = `orderSystem/${getSessionStorage("merchantId")}/${getSessionStorage("tableNum")}/chat`;
          console.log(`订阅的主题：${topic}`);
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
      if(data) {
        const chatRecords = [];
        if(data.data!=null && data.data.length>0) {
          data.data.map((item, key) => (
            chatRecords.push(item.data)
          ));
          console.log(`聊天记录：${JSON.stringify(chatRecords)}`);
          yield put({
            type: 'refreshChatMsg',
            chatRecords: chatRecords
          });
        }
      }
    }
  },

  reducers: {
    showChatRoomInfo(state, payload) {
      return { ...state, ...payload };
    },
    handleSend(state, payload) {
      //添加发送内容
      const msg = {
        msgId:uuid.v4(),
        time:new Date().getTime(),
        head:getSessionStorage("head"),
        content:payload.msg,
        userId:getSessionStorage("userId"),
        nickName:getSessionStorage("nickName")
      };
      const sendMsg = {
        data:msg,
        dataType: "text",
        action:"say"
      };
      //发送string 或 Buffer 类型
      const topic = `orderSystem/${getSessionStorage("merchantId")}/${getSessionStorage("tableNum")}/chat`;
      mqttClient.getInstance().publish(topic, JSON.stringify(sendMsg));
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
      const msg = JSON.parse(payload.chatMsg);
      if(msg) {
        state.sendMessages.push(msg.data);
      }
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
