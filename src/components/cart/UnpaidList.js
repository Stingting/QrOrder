import React from 'react';
import {Button, List} from 'antd';
import styles from './UnpaidList.less';

const UnpaidList = ({unpaidData,price,toOrderDetail}) => {

  const unpaidList = new Array();
  unpaidList.push(unpaidData);
  const unpaidContent = unpaidList.map((item,key) => (
    <div className={styles.item}>
      {/*<p className={styles.split}>/!*订单号：{item.id}*!/</p>*/}
      <List
        itemLayout="horizontal"
        dataSource={item.list}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.pic}/>}
              title={item.name}
              description={"价格：" + item.price}
            />
          </List.Item>
        )}
      />
      <div className={styles.bottom}>
        <span>总价：&yen;{item.price} &nbsp;&nbsp;</span>
        <Button type="danger" onClick={()=>toOrderDetail()}>确认订单</Button>
      </div>
    </div>
  ));
  return (
    <div className={styles["unpaid-list"]}>
      <div className={styles.content}>
        {unpaidContent}
      </div>
    </div>
  );
};
export default UnpaidList;
