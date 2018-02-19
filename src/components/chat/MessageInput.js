import React from 'react';
import {Input, Icon, Button,Form,Popover} from 'antd';
import styles from './Chat.less';
const FormItem = Form.Item;

const MessageInput = ({sendContent, handleSend, handleChange,words,visible,handleVisibleChange}) => {
  const content = words.map(d => <p className={styles["quick-send"]} onClick={()=>handleSend(d)}>{d}</p>);
  return (
    <div className={styles["chat-input"]}>
      <Form layout="inline">
        <FormItem>
          <Input className={styles.input}
                 placeholder="Enter your message"
                 value={sendContent}
                 onChange={(e) => handleChange(e.target.value)}
                 onPressEnter={() => handleSend(sendContent)}/>
        </FormItem>
        <FormItem>
          <Popover content={content} trigger="click" visible={visible} onVisibleChange={(e)=>handleVisibleChange(e)}>
            <Button type="primary">快速回复</Button>
          </Popover>
        </FormItem>
        <FormItem>
          <Button className={styles.btn} type="primary" onClick={() => handleSend(sendContent)}>发送</Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default MessageInput;
