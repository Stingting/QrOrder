import React from 'react';
import {Button, Input, Popover} from 'antd';
import styles from './Chat.less';

const MessageInput = ({sendContent, handleSend, handleChange,words,visible,handleVisibleChange}) => {
  words = ['你好！', '迟点给你答复'] ;//先写死，由前端缓存，不从后台缓存
  const content = words.map(d => <p key={d} className={styles["quick-send"]} onClick={()=>handleSend(d)}>{d}</p>);
  return (
    <div className={styles["chat-input"]}>
      <div className={styles.input}>
        <Input placeholder="输入文字"
               value={sendContent}
               onChange={(e) => handleChange(e.target.value)}
               onPressEnter={() => handleSend(sendContent)}/>
      </div>
     {/* <div className={styles["quick-send"]}>
        <Popover content={content} trigger="click" visible={visible} onVisibleChange={(e) => handleVisibleChange(e)}>
          <Button type="primary" size="small">快速回复</Button>
        </Popover>
      </div>*/}
      <div className={styles.btn}>
        <Popover  content={content} placement="top" trigger="click" visible={visible}>
          <Button type="primary" size="default" onClick={() => handleSend(sendContent)}>发送</Button>
        </Popover>
      </div>
    </div>
  );
};

export default MessageInput;
