import React from 'react';
import {List,Avatar} from 'antd'
import styles from './Chat.less';
import {getSessionStorage} from "../../utils/helper";
import moment from 'moment';

const ChatContent = ({sendMessages}) => {
  const content = sendMessages.map((item,key) => (
    <div key={key}>
      <div className={styles["chat-thread"]}>
        <div className={item.userId ===getSessionStorage("userId")?styles["head-right"]:styles["head-left"]}><Avatar src={item.head}/></div>
        <div className={item.userId ===getSessionStorage("userId")?styles["content-right"]:styles["content-left"]}>{item.content}</div>
        <div className={styles.time}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
    </div>
  ));
  return (
    <div className={styles["chat-content"]}>
      {content}
    </div>
  );
};

export default ChatContent;
