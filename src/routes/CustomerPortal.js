import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import RecDishes from "../components/portal/RecDishes";
import MerchantDesc from "../components/portal/MerchantDesc";
import MainLayout from '../components/common/MainLayout';
import {Layout} from 'antd';

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
    <MainLayout>
        <MerchantDesc {...merchantProps}></MerchantDesc>
        <RecDishes {...dishListProps} showDishDetail={showDishDetail} closeDetailDialog = {closeDetailDialog}></RecDishes>
    </MainLayout>
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

