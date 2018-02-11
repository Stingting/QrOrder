import React from 'react';
import {Tag} from 'antd';

const ChatHead = ({num, count,remark}) => {
  return (
    <div>
      <div>
        <Tag color="#2db7f5">第{num}桌</Tag>
        <Tag color="#87d068">{count}人</Tag>
        <Tag color="#108ee9">{remark}</Tag>
      </div>
    </div>
  );
};

export default ChatHead;
