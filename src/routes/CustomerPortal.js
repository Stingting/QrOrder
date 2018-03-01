import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import RecDishes from "../components/portal/RecDishes";
import MerchantDesc from "../components/portal/MerchantDesc";
import MainLayout from '../components/common/MainLayout';
import {Layout} from 'antd';

const { Header, Content, Footer, Sider} = Layout;

function Portal({ dispatch , fetch, location, recDishes,menu}) {
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
  const {
    loading, list, name,pic,desc
  } = recDishes;

  const {
    visible,detail
  } = menu;

  const merchantProps = {
    name,
    pic,
    desc
  };

  const dishProps = {
    list, loading, visible,detail
  };
  return (
    <MainLayout>
        <MerchantDesc {...merchantProps}></MerchantDesc>
        <RecDishes
          {...dishProps}
          showDishDetail={showDishDetail}
          closeDetailDialog = {closeDetailDialog}
          changeCollect={changeCollect}
          addToCart={addToCart}
          reduceToCart={reduceToCart}>
        </RecDishes>
    </MainLayout>
  );
}
//验证是否是object
Portal.propTypes = {
  recDishes: PropTypes.object
};

// 指定关联recDishes model
function mapStateToProps({ recDishes,menu}) {
  return {recDishes,menu};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Portal);

