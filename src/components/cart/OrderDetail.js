import React from 'react';
import {Layout,Button,List,Avatar,Icon,Divider} from 'antd';
import { connect } from 'dva';
import styles from './PayDetail.less';

const { Header, Content, Footer, Sider} = Layout;


function OrderDetail ({dispatch,location,cart}) {
  const detailData = cart.detail;
  const detailList = new Array();
  detailList.push(detailData);
  const orderDetailContent = detailList.map((item,key) => (
    <div className={styles["detail-content"]}>
      <div className={styles.tip}>
        <div className={styles.tip1}>餐桌号：{item.tableName}&nbsp;&nbsp;用餐人数：{item.personNum}人</div>
        {/*<div className={styles.tip2}>备注：{item.remark}</div>*/}
      </div>
      <Divider/>
      <List
        itemLayout="horizontal"
        dataSource={item.list}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<img width={100} height={100} alt={item.name} src={item.pic}/>}
              title={<span className={styles.dishname}>{item.name}</span>}
              description={<div>
                <div>{item.desc}</div>
                <div>{item.type.name}&nbsp;月售:&nbsp;{item.saleCount}</div>
                <div><span style={{color: 'red'}}>&yen;{item.price}</span>
                </div>
              </div>}
            />
            <div>
              &times;{item.num}
            </div>
          </List.Item>
        )}
      />
      <div className={styles.bottom}>
        <span>总价：&yen;{item.price} &nbsp;&nbsp;</span>
        <Button type="danger">确认支付</Button>
      </div>
    </div>
  ));
  /**
   * 返回
   */
  function backToUnpaidList() {
    dispatch({
      type:'cart/backToUnpaidList'
    })
  };

  return (
    <div>
      <div className={styles["detail-head"]} onClick={backToUnpaidList}><Icon type="left"/>订单详情</div>
      <div>
        {orderDetailContent}
      </div>
    </div>
  );
};

function mapStateToProps({cart}) {
  return {cart};
}
export default connect(mapStateToProps)(OrderDetail);
