import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import RecDishes from "../components/RecDishes";
import {Layout} from 'antd';
const { Header, Content, Footer, Sider} = Layout;
function Portal({ fetch, location, dispatch, recDishes }) {

  return (
    <Layout>
      <Header>xxxxxx</Header>
      <Content>
        <RecDishes {...recDishes}>{recDishes}</RecDishes>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

//验证是否是object
Portal.propTypes = {
  recDishes: PropTypes.object,
};

// 指定关联recDishes
function mapStateToProps({ recDishes }) {
  return {recDishes};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Portal);

