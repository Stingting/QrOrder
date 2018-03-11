import React from 'react';
import {Button, List,Select,Divider} from 'antd';
import styles from './UnpaidList.less';
import {isEmptyObject} from "../../utils/helper";

const Option = Select.Option;

const UnpaidList = ({unpaidData,price}) => {
  console.log(`unpaidData${JSON.stringify(unpaidData)}`)
  const unpaidList = new Array();
  unpaidList.push(unpaidData);
  const unpaidContent = unpaidList.map((item,key) => (
    <div className={styles.item} key={key}>
      {/*<p className={styles.split}>/!*订单号：{item.id}*!/</p>*/}
      <List
        itemLayout="horizontal"
        dataSource={item}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
              title={<span className={styles.dishname}>{item.name}</span>}
              description={
                <div>
                  <div>{item.desc}</div>
                  <div>{item.type.name}&nbsp;月售:&nbsp;{item.saleCount}</div>
                  <div><span style={{color: 'red'}}>&yen;{item.price}</span>
                  </div>
                </div>
              }
            />
          <div>
            &times;{item.num}
          </div>
          </List.Item>
        )}
      />
    </div>
  ));

  return (
    <div className={styles["unpaid-list"]}>
      <div className={styles.content}>
        {unpaidContent}
      </div>
      <div className={styles.bottom}>
        <span>总价：&yen;{price} &nbsp;&nbsp;</span>
        <Button type="danger">确认支付</Button>
      </div>
    </div>
  );
};
export default UnpaidList;
