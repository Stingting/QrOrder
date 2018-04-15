import React from 'react';
import {connect} from 'dva';
import MenuList from '../components/menu/MenuList';
import MainLayout from '../components/common/MainLayout';
import {NavBar} from 'antd-mobile';

function MenuPage({ dispatch , fetch, location, menu}) {

  const {data,visible,detail,purchaseNum,types,currentType,currentDishes} = menu;

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
   * 改变当前选中类型的菜单
   * @param key
   */
  function changeCurrentType(key) {
    dispatch({
      type:'menu/changeCurrentType',
      key:key
    })
  }

  const menuListProps={visible,detail,purchaseNum,types,currentType,currentDishes};

  return (
    <MainLayout>
       <NavBar mode="dark" style={{position:'fixed',width:'100%',zIndex:8}}>本店菜谱</NavBar>
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
