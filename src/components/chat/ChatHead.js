import React from 'react';
import {Tag} from 'antd';
import styles from './Chat.less';
const ChatHead = ({num, count,name}) => {
  return (
    <div className={styles["chat-head"]}>
      <Tag color="#2db7f5">{name}</Tag>
      <Tag color="#87d068">{count}人</Tag>
    </div>
  );
};

export default ChatHead;
