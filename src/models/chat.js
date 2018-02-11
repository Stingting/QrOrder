import constant from '../config';
import mqttClient from '../utils/mqttUtil';
import {getMenu, getChatRoomInfo} from "../services/customer";
import {getLocalStorage} from "../utils/helper";

export default {

  namespace: 'chat',

  state: {
      count:0, //	人数
      num:0,	//几号桌
      remark:'',	//备注
      words:['你好！', '迟点给你答复'],//常用短语
      chatRecords:[], //聊天记录,
      sendMessages:[],
      sendContent:'' //发送的消息
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,search})=>{
        //进入聊天页面时触发的操作
        if(pathname.includes('/app/v1/chat')) {

          mqttClient.getInstance().on('connect', function () {
            console.log("connect to emqtt...");
            mqttClient.getInstance().subscribe(constant.topic);
          });

          mqttClient.getInstance().on('message', function (topic, message) {  //这里有bug，页面来回切换回来时，重复收到多条消息。
            // message is Buffer
            console.log(`收到的消息 ${message.toString()}`);
            //获取订阅消息
            dispatch({type:'setChatMessage', chatMsg:message.toString()});
          });

          mqttClient.getInstance().on('close', function () {
              console.log("emqtt closed...");
          });

          mqttClient.getInstance().on("error", function (error) {
            console.log(error.toString());
          });

          //获取聊天室信息
          dispatch({type: 'getChatRoomInfo'});

        }
      });
    },
  },

  effects: {
    *getChatRoomInfo({ payload }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(getChatRoomInfo, getLocalStorage("merchantId"), getLocalStorage("tableNum"));
      yield put({
        type: 'showChatRoomInfo' ,
        count : data.count,
        num: data.num,
        remark:data.remark,
        words:data.words
      });
    },
  },

  reducers: {
    showChatRoomInfo(state, payload) {
      return { ...state, ...payload };
    },
    handleSend(state, payload) {
      //添加发送内容
      const msg = {date:new Date(), pic:"",content:state.sendContent,isRead:true};
      //发送string 或 Buffer 类型
      mqttClient.getInstance().publish(constant.topic, JSON.stringify(msg));
      //发送后清空发送文本框内容
      state.sendContent = "";
      return{...state, ...payload};
    },
    handleInputChange(state, payload) {
      state.sendContent = payload.msg;
      return{...state, ...payload};
    },
    setChatMessage(state, payload) {
      state.sendMessages.push(JSON.parse(payload.chatMsg));
      return{...state, ...payload}
    }
  },

};
