import React from 'react';
import {Button, Form, Input,InputNumber} from 'antd';

const FormItem = Form.Item;

const EditPersonNum = ({form:{getFieldDecorator,validateFields},joinTable}) => {

  const formItemLayout ={
    labelCol: { span: 4 },
    wrapperCol: { span: 8},
  };

  /**
   * 表单验证
   * @param e
   */
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        //加入餐桌
        joinTable(values);
      }
    });
  }
  return (
    <div>
      <div style={{textAlign:'center'}}>
        <Form onSubmit={(e)=>handleSubmit(e)} className="login-form">
          <FormItem label="用餐人数：" {...formItemLayout}>
            {getFieldDecorator('personNum',  {
              rules: [{ required: true, message: '请填写用餐人数！' }],
            })(
              <InputNumber min={1}/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
              确定
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

export default Form.create()(EditPersonNum);
