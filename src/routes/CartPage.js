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

function CartPage({ dispatch , fetch, location, scan, cart,menu}) {

  const { paidList,unpaidData,activeKey,price} = cart;
  const {visible,detail} = menu;
  const paidListProps = {paidList,visible,detail,price};
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

  function showDishDetail(id) {
    dispatch({
      type : 'menu/getDishDetail', //指定action,namespace+action
      payload : id
    })
  }
  function closeDetailDialog( closeFlag) {
    dispatch({
      type : 'menu/closeDetailDialog'
    })
  }

  //收藏或取消收藏
  function changeCollect(foodId,isCollect) {
    dispatch({
      type:'menu/changeCollect',
      isCollect:isCollect,
      foodId:foodId
    })
  }

  /**
   * 增加购买数量
   */
  function addToCart(dishId,dishType) {
    dispatch({
      type:'menu/addToCart',
      dishId:dishId,
      dishType:dishType
    })
  }

  /*
   *减少购买数量
   */
  function reduceToCart(dishId, dishType) {
    dispatch({
      type:'menu/reduceToCart',
      dishId:dishId,
      dishType:dishType
    })
  }

  return (
    <MainLayout>
        <div className={cartStyles['cart-head']}>
          <span className={cartStyles['head-font']}>我的订单</span>
        </div>
        <div className={cartStyles.tab}>
          <Tabs defaultActiveKey={activeKey} onChange={getPayList}>
            <TabPane tab="未支付" key="1">
              <UnpaidList {...unpaidListProps} toOrderDetail={toOrderDetail}/>
            </TabPane>
            <TabPane tab="已支付" key="2">
              <PaidList {...paidListProps}
                        deleteDish = {deleteDish}
                        closeDetailDialog={closeDetailDialog}
                        showDishDetail={showDishDetail}
                        changeCollect={changeCollect}
                        addToCart={addToCart}
                        reduceToCart={reduceToCart}
              />
            </TabPane>
          </Tabs>
        </div>
    </MainLayout>
  );
}
CartPage.propTypes = {

};
function mapStateToProps({cart,menu}) {
  return {cart,menu};
}
export default connect(mapStateToProps)(CartPage);
