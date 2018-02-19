import React from 'react';
import {Tag} from 'antd';
import styles from './Chat.less';
const ChatHead = ({num, count,remark}) => {
  return (
    <div className={styles["chat-head"]}>
      <Tag color="#2db7f5">第{num}桌</Tag>
      <Tag color="#87d068">{count}人</Tag>
      <Tag color="#108ee9">{remark}</Tag>
    </div>
  );
};

export default ChatHead;
