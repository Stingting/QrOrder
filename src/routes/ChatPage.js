import React from 'react';
import {connect} from 'dva';
import ChatHead from '../components/chat/ChatHead';
import ChatContent from '../components/chat/ChatContent';
import MessageInput from '../components/chat/MessageInput';
import MainLayout from '../components/common/MainLayout';

import {Layout} from 'antd';
import styles from '../assets/less/global.less';

const { Header, Content, Footer, Sider} = Layout;

function ChatPage({ dispatch , fetch, location, chat}) {

  const {num, count, remark,sendContent,sendMessages,words} = chat;
  const chatHeadProps = {num, count, remark};
  const messageInputProps = {sendContent,words};
  const chatContentProps = {sendMessages};

  //监听输入框变化
  function handleChange(value) {
    dispatch({
      type: 'chat/handleInputChange',
      msg: value
    })
  }

  //发送消息
  function handleSend() {
    dispatch({
      type : 'chat/handleSend' //指定action,namespace+action
    })
  }

  return (
    <MainLayout>
      <Header className={styles.header}>
        <ChatHead {...chatHeadProps}/>
      </Header>
      <Content className={styles.content}>
        <ChatContent {...chatContentProps}/>
        <MessageInput {...messageInputProps} handleSend={handleSend} handleChange={handleChange}/>
      </Content>
    </MainLayout>
  );
}
ChatPage.propTypes = {

};
function mapStateToProps({ chat}) {
  return {chat};
}
export default connect(mapStateToProps)(ChatPage);
