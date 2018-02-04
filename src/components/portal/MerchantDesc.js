import React , {Component} from 'react';
import { Avatar } from 'antd';

const MerchantDesc = ({pic,name,desc}) => {
  return (
    <div>
      <Avatar src={pic[0]} size="large" shape="square" /><span>{name}</span><span>{desc}</span>
    </div>
  )
};

export default MerchantDesc;
