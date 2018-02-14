import React from 'react';
import {List,Avatar,Button} from 'antd';
import styles from './UnpaidList.less';

const UnpaidList = ({unpaidList,showPayDetail}) => {
  //当前用户的未支付订单数据
  const curUserUnpaidData = unpaidList.length>0?unpaidList[0]:{};
  return (
    <div className={styles["unpaid-list"]}>
      <div>
      <List
        itemLayout="horizontal"
        dataSource={curUserUnpaidData.list}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.pic}/>}
              title={item.name}
              description={"价格："+ item.price}
            />
          </List.Item>
        )}
      />
      </div>
      <div className={styles.bottom}>
          <span>总价：&yen;{curUserUnpaidData.price} &nbsp;&nbsp;</span>
          <Button type="danger" onClick={()=>showPayDetail()}>确认订单</Button>
      </div>
    </div>
  );
};
export default UnpaidList;
