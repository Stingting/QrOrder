import React from 'react';
import {Input, Icon, Button} from 'antd';
import { Select } from 'antd';
const Option = Select.Option;

const MessageInput = ({sendContent, handleSend, handleChange,words}) => {

  const suffix = <Button type="primary" onClick={()=>handleSend()}>发送</Button>;
  const options = words.map(d => <Option key={d}>{d}</Option>);
  return (
    <div style={{ marginBottom: 0 }}>
      <Select
        style={{ width: 200 }}
        placeholder="快速回复"
        onChange={(value)=>handleChange(value)}>
        {options}
      </Select>
      <Input  placeholder="Enter your message"
             value={sendContent}
             onChange={(e)=>handleChange(e.target.value)}
             onPressEnter={()=>handleSend()}
             suffix={suffix}/>
    </div>
  );
};

export default MessageInput;
