import React from 'react';
import {Button, List} from 'antd';
import styles from './UnpaidList.less';
import {Result,WingBlank} from 'antd-mobile';
import SVG from 'react-inlinesvg';
import nodatasvg from '../../assets/svg/nodata.svg';

const UnpaidList = ({unpaidData,toOrderDetail,nodataVisible}) => {
  let unpaidContent;
  if(nodataVisible) {
     unpaidContent =
      <div className={styles.item}>
        {/*<p className={styles.split}>/!*订单号：{item.id}*!/</p>*/}
        <List
          itemLayout="horizontal"
          dataSource={unpaidData.list}
          renderItem={item => (
            <List.Item onClick={()=>toOrderDetail(unpaidData.id)}>
              <List.Item.Meta
                avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
                title={<span className={styles.dishname}>{item.name}</span>}
                description={
                  <div className={styles.desc}>
                    <div className={styles.row1}>{item.desc}</div>
                    <div className={styles.row2}>{/*{item.type.name}&nbsp;*/}月售:&nbsp;{item.saleCount}</div>
                    <div className={styles.row3}>&yen;{item.price}</div>
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
  } else {
    unpaidContent = <Result
      img={<SVG src={nodatasvg}></SVG>}
      title="您暂时没有订单"
      message="可以去菜单列表看看"
    />;
  }

  return (
    <WingBlank>
      <div className={styles["unpaid-list"]}>
        <div className={styles.content}>
          {unpaidContent}
        </div>
        <div className={styles.bottom} style={{display:unpaidData.status===1?'inline-block':'none'}}>
          <span>合计：&yen;{unpaidData.price} &nbsp;&nbsp;</span>
          <Button type="danger" size='default'>确认支付</Button>
        </div>
      </div>
    </WingBlank>
  );
};
export default UnpaidList;
