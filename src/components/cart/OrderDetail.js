import React from 'react';
import {Button, List} from 'antd';
import {connect} from 'dva';
import styles from './OrderDetail.less';
import {Icon, NavBar, Popover} from 'antd-mobile';
import SVG from 'react-inlinesvg';

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
      <div className={styles.content}>
      <List
        itemLayout="horizontal"
        dataSource={detailData.list}
        renderItem={item => (
          <List.Item>
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
      <div className={styles.bottom}>
        <span>合计：&yen;{detailData.price} &nbsp;&nbsp;</span>
        <Button type="danger" size='default' style={{display:detailData.status===1?'inline-block':'none'}}>确认支付</Button>
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

  const myImg = src => <SVG src={src}></SVG>;

  return (
    <div>
        <NavBar
          style={{position:'fixed',width:'100%',zIndex:8}}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => backToUnpaidList()}
          rightContent={
            <Popover mask
                     overlayClassName="fortest"
                     overlayStyle={{color: 'currentColor'}}
                     overlay={[
                       (<Item key="1" value="home" data-seed="logId">首页</Item>)
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
      {orderDetailContent}
    </div>
  );
};

function mapStateToProps({cart}) {
  return {cart};
}
export default connect(mapStateToProps)(OrderDetail);
