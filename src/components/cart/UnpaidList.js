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
        dataSource={item}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<img width={150} height={150} alt={item.name} src={item.pic}/>}
              title={item.name}
              description={
                <div>
                  <div>{item.desc}</div>
                  <div>{item.type.name}&nbsp;月售:&nbsp;{item.saleCount}</div>
                  <div><span style={{color: 'red'}}>&yen;{item.price}</span></div>
                </div>
                }
            />
          </List.Item>
        )}
      />
      <div className={styles.bottom}>
        <span>总价：&yen;{price} &nbsp;&nbsp;</span>
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
