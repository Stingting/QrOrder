import React from 'react';
import {List,Avatar} from 'antd'
import styles from './Chat.less';

const ChatContent = ({sendMessages}) => {
  return (
    <div className={styles["chat-content"]} id="test">
      <List
        split={false}
        itemLayout="horizontal"
        dataSource={sendMessages}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.head}/>}
              title={item.time}
              description={item.content}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChatContent;
