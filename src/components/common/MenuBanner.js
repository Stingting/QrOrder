import React from 'react';
import {Menu} from 'antd';
import {Modal,Badge} from 'antd-mobile';
import {Link} from 'dva/router';
import {connect} from 'dva';
import styles from '../../assets/less/global.less';
import CartList from '../../components/cart/CartList';
import homesvg from '../../assets/svg/home.svg';
import menusvg from '../../assets/svg/menu.svg';
import cartsvg from '../../assets/svg/cart.svg';
import chatsvg from '../../assets/svg/chat.svg';
import usersvg from '../../assets/svg/user.svg';
import useractivesvg from '../../assets/svg/user-active.svg';
import chatactivesvg from '../../assets/svg/chat-active.svg';
import homeactivesvg from '../../assets/svg/home-active.svg';
import menuactivesvg from '../../assets/svg/menu-active.svg';
import cartactivesvg from '../../assets/svg/cart-active.svg';
import SVG from 'react-inlinesvg';
import chat from "../../models/chat";

function MenuBanner ({dispatch, navigation,menu,chat,cart}) {

  const unReadCount = chat.unReadCount;
  const {cartListVisible,cartList} = cart;
  const {totalPurchaseNum, totalPurchasePrice} = menu;
  const cartListProps = {cartList, totalPurchasePrice, totalPurchaseNum};

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
        <Menu.Item key="portal" style={{width:'20%'}}>
          {navigation.current ==='portal'?<SVG src={homeactivesvg}></SVG>:<SVG src={homesvg}></SVG>}
          <div className={styles[navigation.current ==='portal'?"menu-text-active":"menu-text"]}>首页</div>
          <Link to="/app/v1/cportal"></Link>
        </Menu.Item>
        <Menu.Item key="menu" style={{width:'20%'}}>
          {navigation.current ==='menu'?<SVG src={menuactivesvg}></SVG>:<SVG src={menusvg}></SVG>}
          <div className={styles[navigation.current ==='menu'?"menu-text-active":"menu-text"]}>菜谱</div>
          <Link to="/app/v1/menu"></Link>
        </Menu.Item>
        <Menu.Item key="cart" style={{width:'20%'}}>
          <Badge text={totalPurchaseNum} overflowCount={55}  style={{ marginLeft: 32}}>
            <span style={{paddingBottom:12, display:'inline-block'}}>
              {navigation.current ==='cart'?<SVG src={cartactivesvg}></SVG>:<SVG src={cartsvg}></SVG>}
            </span>
          </Badge>
          {/*<sup style={{display:totalPurchaseNum===0?'none':'inline'}}>{totalPurchaseNum}</sup>*/}
          <div className={styles[navigation.current ==='cart'?"menu-text-active":"menu-text"]}>购物车</div>
          {/*<Link to="/app/v1/cart"></Link>*/}
        </Menu.Item>
        <Menu.Item key="chat" style={{width:'20%'}}>
          <Badge text={unReadCount} overflowCount={55}  style={{ marginLeft: 32}}>
            <span style={{paddingBottom:12, display:'inline-block'}}>
              {navigation.current ==='chat'?<SVG src={chatactivesvg}></SVG>:<SVG src={chatsvg}></SVG>}
            </span>
          </Badge>
          {/*<sup style={{display:unReadCount===0?'none':'inline'}}>{unReadCount}</sup>*/}
          <div className={styles[navigation.current ==='chat'?"menu-text-active":"menu-text"]}>呼叫</div>
          <Link to="/app/v1/chat"></Link>
        </Menu.Item>
        <Menu.Item key="user" style={{width:'20%'}}>
          {navigation.current ==='user'?<SVG src={useractivesvg}></SVG>:<SVG src={usersvg}></SVG>}
          <div className={styles[navigation.current ==='user'?"menu-text-active":"menu-text"]}>我</div>
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
