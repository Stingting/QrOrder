import React from 'react';
import {Button, Divider, List} from 'antd';
import {connect} from 'dva';
import styles from './PayDetail.less';
import { Popover, NavBar, Icon } from 'antd-mobile';
import homeSrc from '../../assets/img/home.png';

import moment from 'moment';

const Item = Popover.Item;

function OrderDetail ({dispatch,location,cart}) {
  const detailData = cart.detail;
  const tip = detailData.status===1?'订单未支付':'订单已完成';
  const orderDetailContent =
    <div className={styles["detail-content"]}>
      <div className={styles.tip}>
        {tip}
      </div>
      <Divider/>
      <div className={styles.content}>
      <List
        itemLayout="horizontal"
        dataSource={detailData.list}
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
      </div>
      <div className={styles.bottom}>
        <span>总价：&yen;{detailData.price} &nbsp;&nbsp;</span>
        <Button type="danger"  style={{display:detailData.status===1?'inline-block':'none'}}>确认支付</Button>
      </div>
      <div className={styles["order-desc"]}>
        <div><span className={styles.title}>餐桌</span>&nbsp;{detailData.tableName}</div>
        <div><span className={styles.title}>用餐人数</span>&nbsp;{detailData.personNum}人</div>
        <div><span className={styles.title}>订单号码</span>&nbsp;{detailData.orderNo}</div>
        <div><span className={styles.title}>订单时间</span>&nbsp;{moment(detailData.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
    </div>

  /**
   * 返回订单列表
   */
  function backToUnpaidList() {
    dispatch({
      type:'cart/backToUnpaidList'
    })
  };

  /**
   * 返回首页
   */
  function onSelect(opt) {
    dispatch({
      type:'cart/backToHome'
    })
  }

  const myImg = src => <img src={homeSrc} width={18} height={18} alt="" />;

  return (
    <div>
      <div className={styles.navbar}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => backToUnpaidList()}
          rightContent={
            <Popover mask
                     overlayClassName="fortest"
                     overlayStyle={{color: 'currentColor'}}
                     overlay={[
                       (<Item key="1" value="home" data-seed="logId" icon={myImg('home')}>首页</Item>)
                     ]}
                     align={{
                       overflow: {adjustY: 0, adjustX: 0},
                       offset: [-10, 0],
                     }}
                     onSelect={onSelect}>
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}>
              <Icon type="ellipsis"/>
              </div>
            </Popover>
          }
        >订单详情</NavBar>
      </div>
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
