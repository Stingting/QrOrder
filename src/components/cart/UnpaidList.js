import React from 'react';
import {Button, List,Select,Divider} from 'antd';
import styles from './UnpaidList.less';
import {isEmptyObject} from "../../utils/helper";

const Option = Select.Option;

const UnpaidList = ({unpaidData,price,toOrderDetail,handlePersonNumChange}) => {
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
              avatar={<img width={80} height={80} alt={item.name} src={item.pic}/>}
              title={<span className={styles.dishname}>{item.name}</span>}
              description={
                <div>
                  &times;{item.num}
                </div>
                }
            />
            <div>&yen;{item.price}</div>
          </List.Item>
        )}
      />
    </div>
  ));

  const maxPersonNum=20;
  const listOptions = () => {
    const res = [];
    for(let i = 1; i <= maxPersonNum; i++) {
      res.push(<Option value={i} key={i}>{i}人</Option>)
    }
    return res
  };

  return (
    <div className={styles["unpaid-list"]}>
      <div className={styles.content}>
        {unpaidContent}
      </div>
      <div style={{display:isEmptyObject(unpaidData)?'none':'inline'}}>
        <Divider dashed={true}/>
        <div className={styles.option}>
          用餐人数：
          <Select
            placeholder="选择用餐人数"
            style={{ width: '80%' }}
            onChange={(value)=>handlePersonNumChange(value)}>
            {listOptions()}
          </Select>
        </div>
        <Divider dashed={true}/>
        <div className={styles.bottom}>
          <span>合计：&yen;{price} &nbsp;&nbsp;</span>
          <Button type="danger" onClick={()=>toOrderDetail()}>确认订单</Button>
        </div>
      </div>
    </div>
  );
};
export default UnpaidList;
