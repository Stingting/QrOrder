import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import RecDishes from "../components/portal/RecDishes";
import MerchantDesc from "../components/portal/MerchantDesc";
import styles from './CustomerPortal.less';
import constant from '../config';
import {Layout, Icon, Menu} from 'antd';
import { Link } from 'dva/router';
const { Header, Content, Footer, Sider} = Layout;
function Portal({ dispatch , fetch, location, recDishes}) {
  function showDishDetail(id) {
    dispatch({
      type : 'recDishes/getDishDetail', //指定action,namespace+action
      payload : id
    })
  }
  function closeDetailDialog(closeFlag) {
    dispatch({
      type : 'recDishes/closeDetailDialog'
    })
  }
  const {
    loading, list, detailModalVisible,detail,name,pic,desc
  } = recDishes;

  const dishListProps={
    list,
    loading,
    detailModalVisible,
    detail
  };
  const merchantProps = {
    name,
    pic,
    desc
  };
  return (
    <Layout>
      <Header className={styles.header}>
        <MerchantDesc {...merchantProps}></MerchantDesc>
      </Header>
      <Content>
        <RecDishes {...dishListProps} showDishDetail={showDishDetail} closeDetailDialog = {closeDetailDialog}></RecDishes>
      </Content>
      <Footer>
        <Menu mode="horizontal">
          <Menu.Item> <Link to="/app/v1/cportal"><Icon type="home"  className={styles.menu}/><div>首页</div></Link></Menu.Item>
          <Menu.Item> <Link to="/app/v1/menu"><Icon type="appstore-o"  className={styles.menu}/><div>本店菜谱</div></Link></Menu.Item>
          <Menu.Item> <Link to="/"><Icon type="shopping-cart" className={styles.menu}/><div>已点菜</div></Link></Menu.Item>
          <Menu.Item> <Link to="/"><Icon type="message"  className={styles.menu}/><div>呼叫服务员</div></Link></Menu.Item>
          <Menu.Item> <Link to="/"><Icon type="user"  className={styles.menu}/><div>个人中心</div></Link></Menu.Item>
        </Menu>
      </Footer>
    </Layout>
  );
}
//验证是否是object
Portal.propTypes = {
  recDishes: PropTypes.object
};

// 指定关联recDishes model
function mapStateToProps({ recDishes}) {
  return {recDishes};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Portal);

