import React from 'react';
import {List,Avatar} from 'antd'
import moment from 'moment';

const ChatContent = ({sendMessages}) => {
  return (
    <div style={{minHeight:220}}>
      <List
        split={false}
        itemLayout="horizontal"
        dataSource={sendMessages}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.pic}/>}
              title={moment(item.date).format('YYYY-MM-DD HH:mm:ss')}
              description={item.content}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChatContent;
