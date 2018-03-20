import React from 'react';
import {Icon, Menu,Badge} from 'antd';
import {Modal} from 'antd-mobile';
import {Link} from 'dva/router';
import {connect} from 'dva';
import styles from '../../assets/less/global.less';
import CartList from '../../components/cart/CartList';

function MenuBanner ({dispatch, navigation,menu,chat,cart}) {

  const totalPurchaseNum = menu.totalPurchaseNum;
  const unReadCount = chat.unReadCount;
  const {cartListVisible,cartList} = cart;
  const cartListProps = {cartList};

  function handleClick (e) {
    dispatch({
      type:'navigation/setCurrentKey',
      current: e.key,
    });
    if(e.key === 'cart') {
      getCartList();
    }
  };
  //展示购物车列表
  function getCartList() {
    dispatch({
      type:'cart/getCartList'
    })
  }
  //关闭购物车列表
  function closeCartList() {
    dispatch({
      type:'cart/closeCartList'
    })
  }
  //确认下单
  function confirmOrder() {
    dispatch({
      type:'cart/confirmOrder'
    })
  }
  //购物车列表添加购买数量
  function addToCartForCart(dish) {
    dispatch({
      type:'menu/addToCartForCart',
      dish:dish
    })
  }
  //购物车列表减少购买数量
  function reduceToCartForCart(dish) {
    dispatch({
      type:'menu/reduceToCartForCart',
      dish:dish
    })
  }
  return (
    <div>
      <Menu
        style={{textAlign:'center',position:'fixed',bottom:0,width:'100%',borderTop:'1px solid #ccc'}}
        mode="horizontal"
        onClick={handleClick}
        selectedKeys={[navigation.current]}>
        <Menu.Item key="portal" style={{width:'20%'}}> <Icon type="home"  className={styles.menu}/><div className={styles["menu-text"]}>首页</div>
          <Link to="/app/v1/cportal"></Link>
        </Menu.Item>
        <Menu.Item key="menu" style={{width:'20%'}}> <Icon type="appstore-o" className={styles.menu}/><div className={styles["menu-text"]}>菜谱</div>
          <Link to="/app/v1/menu"></Link>
        </Menu.Item>
        <Menu.Item key="cart" style={{width:'20%'}}>
          <Badge count={totalPurchaseNum} overflowCount={999} offset={[0,50]}>
          <div className={styles["circle-shopping-cart"]}>
            <Icon type="shopping-cart"className={styles.menu}  style={{marginTop:-10,marginRight:0}}/>
          </div>
          </Badge>
          {/*<Link to="/app/v1/cart"></Link>*/}
        </Menu.Item>
        <Menu.Item key="chat" style={{width:'20%'}}> <Icon type="message"  className={styles.menu}/><sup style={{display:unReadCount===0?'none':'inline'}}>{unReadCount}</sup>
          <div className={styles["menu-text"]}>呼叫</div>
          <Link to="/app/v1/chat"></Link>
        </Menu.Item>
        <Menu.Item key="user" style={{width:'20%'}}> <Icon type="user"  className={styles.menu}/><div className={styles["menu-text"]}>我</div>
          <Link to="/app/v1/user"></Link>
        </Menu.Item>
      </Menu>
      <Modal
        popup
        visible={cartListVisible}
        onClose={closeCartList}
        animationType="slide-up"
      >
      <CartList confirmOrder={confirmOrder} {...cartListProps} addToCartForCart={addToCartForCart} reduceToCartForCart={reduceToCartForCart}/>
      </Modal>
    </div>
  );
};

MenuBanner.propTypes = {
};

function mapStateToProps({navigation,menu,chat,cart}) {
  return {navigation,menu,chat,cart};
}

export default connect(mapStateToProps)(MenuBanner);
