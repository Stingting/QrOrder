import React from 'react';
import { connect } from 'dva';
import MenuList from '../components/menu/MenuList';
import MenuBanner from '../components/common/MenuBanner';
import MainLayout from '../components/common/MainLayout';
import {Layout} from 'antd';
import styles from '../assets/less/global.less';
const { Header, Content, Footer, Sider} = Layout;

function MenuPage({ dispatch , fetch, location, menu}) {

  const {loading,data,visible,detail,loadingMore,showLoadingMore,purchaseNum,types,currentType,currentDishes} = menu;

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
  function changeCollect() {
    dispatch({
      type:'menu/changeCollect'
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

  /**
   * 改变当前选中类型的菜单
   * @param key
   */
  function changeCurrentType(key) {
    dispatch({
      type:'menu/changeCurrentType',
      key:key
    })
  }

  const menuListProps={loading, visible,detail,loadingMore,showLoadingMore,purchaseNum,types,currentType,currentDishes};

  return (
    <MainLayout>
       <MenuList {...menuListProps} data={data} showDishDetail={showDishDetail}
                 closeDetailDialog = {closeDetailDialog}
                 changeCollect = {changeCollect}
                 addToCart={addToCart}
                 reduceToCart={reduceToCart}
                 changeCurrentType={changeCurrentType}>
       </MenuList>
    </MainLayout>
  );
}
MenuPage.propTypes = {

};
function mapStateToProps({ menu}) { //只接管menu model的state值
  return {menu};
}
export default connect(mapStateToProps)(MenuPage);
