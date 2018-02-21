import React from 'react';
import { connect } from 'dva';
import {Tabs} from 'antd';
import PaidList from '../components/cart/PaidList';
import UnpaidList from '../components/cart/UnpaidList';
import MainLayout from "../components/common/MainLayout";
import {Layout} from 'antd';
import styles from '../assets/less/global.less';
import cartStyles from './CartPage.less';

const { Header, Content, Footer, Sider} = Layout;
const TabPane = Tabs.TabPane;

function CartPage({ dispatch , fetch, location, scan, cart,recDishes}) {

  const { paidList,unpaidData,activeKey,price} = cart;
  const {detailModalVisible,detail} = recDishes;
  const paidListProps = {paidList,detailModalVisible,detail,price};
  const unpaidListProps = {unpaidData,price};

  /**
   * 获取支付列表
   * @param key
   */
  function getPayList(key) {
    console.log(`key= ${key}` );
    dispatch({
      type:'cart/getPayList',
      payload:key
    })
  }

  /**
   * 跳转订单详情页面
   */
  function toOrderDetail() {
    dispatch({
      type:'cart/toOrderDetail'
    })
  }

  /**
   * 删除订单
   */
  function deleteDish(dishId, orderId) {
    dispatch({
      type:'cart/deleteDish',
      dishId:dishId,
      orderId:orderId
    });
  }

  /**
   * 展示菜单详情
   */
  function showDishDetail(id) {
    dispatch({
      type : 'recDishes/getDishDetail', //指定action,namespace+action
      payload : id
    })
  }

  /**
   * 关闭详情框
   * @param closeFlag
   */
  function closeDetailDialog(closeFlag) {
    dispatch({
      type : 'recDishes/closeDetailDialog'
    })
  }

  return (
    <MainLayout>
        <div className={cartStyles['cart-head']}>
          <span className={cartStyles['head-font']}>我的订单</span>
        </div>
        <Tabs defaultActiveKey={activeKey} onChange={getPayList}>
          <TabPane tab="未支付" key="1">
            <UnpaidList {...unpaidListProps} toOrderDetail={toOrderDetail}/>
          </TabPane>
          <TabPane tab="已支付" key="2">
            <PaidList {...paidListProps}
                      deleteDish = {deleteDish}
                      closeDetailDialog={closeDetailDialog}
                      showDishDetail={showDishDetail}/>
          </TabPane>
        </Tabs>
    </MainLayout>
  );
}
CartPage.propTypes = {

};
function mapStateToProps({cart,recDishes}) {
  return {cart,recDishes};
}
export default connect(mapStateToProps)(CartPage);
