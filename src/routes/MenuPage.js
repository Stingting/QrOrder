import React from 'react';
import { connect } from 'dva';
import MenuList from '../components/menu/MenuList';
import MenuBanner from '../components/common/MenuBanner';
import MainLayout from '../components/common/MainLayout';
import {Layout} from 'antd';
import styles from '../assets/less/global.less';
const { Header, Content, Footer, Sider} = Layout;

function MenuPage({ dispatch , fetch, location, menu}) {

  const {loading,data,visible,detail,loadingMore,showLoadingMore} = menu;

  function showDishDetail(id) {
    dispatch({
      type : 'menu/getDishDetail', //指定action,namespace+action
      payload : id
    })
  }
  function closeDetailDialog(closeFlag) {
    dispatch({
      type : 'menu/closeDetailDialog'
    })
  }

  //加载更多
  function onLoadMore() {

    dispatch({
      type : 'menu/onLoadMore'
    })

  }

  const menuListProps={loading,data, visible,detail,loadingMore,showLoadingMore};

  return (
    <MainLayout>
    <Layout>
      <Header className={styles.header}>
      </Header>
      <Content>
        <MenuList {...menuListProps} showDishDetail={showDishDetail} closeDetailDialog = {closeDetailDialog} onLoadMore = {onLoadMore}></MenuList>
      </Content>
    </Layout>
    </MainLayout>
  );
}
MenuPage.propTypes = {

};
function mapStateToProps({ menu}) { //只接管menu model的state值
  return {menu};
}
export default connect(mapStateToProps)(MenuPage);
