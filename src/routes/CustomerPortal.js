import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import RecDishes from "../components/portal/RecDishes";
import MerchantDesc from "../components/portal/MerchantDesc";
import MainLayout from '../components/common/MainLayout';
import {Modal} from 'antd';
import EditPersonNum from '../components/portal/EditPersonNum';

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
  function addToCart(dish) {
    dispatch({
      type:'menu/addToCart',
      dish:dish
    })
  }

  /*
   *减少购买数量
   */
  function reduceToCart(dish) {
    dispatch({
      type:'menu/reduceToCart',
      dish:dish
    })
  }

  /**
   * 关闭用餐人数填写框
   */
  function closeDialog() {
    dispatch({
      type:'recDishes/closeDialog'
    })
  }

  /**
   * 加入餐桌
   * @param personNum
   */
  function joinTable(personNum) {
    dispatch({
      type:'recDishes/joinTable',
      personNum:personNum
    })
  }

  const {
    list, name,pic,desc
  } = recDishes;

  const {
    visible,detail
  } = menu;

  const {addPersonNumModalVisible} = recDishes;

  const merchantProps = {
    name,
    pic,
    desc
  };

  const dishProps = {
    list, visible,detail
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
        <Modal
          title="填写用餐人数"
          maskClosable={false}
          closable={false}
          visible={addPersonNumModalVisible}
          mask={true}
          maskStyle={{backgroundColor: 'rgba(240, 240, 245,0.5)'}}
          footer={null}
          onOk={() => closeDialog(true)}
          onCancel={() => closeDialog(true)}>
          <EditPersonNum joinTable={joinTable}/>
        </Modal>
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

