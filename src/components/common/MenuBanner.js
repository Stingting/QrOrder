import React from 'react';
import {Icon, Menu,Badge} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva';
import styles from '../../assets/less/global.less';

function MenuBanner ({dispatch, navigation,menu,chat}) {
  const totalPurchaseNum = menu.totalPurchaseNum;
  const unReadCount = chat.unReadCount;
  function handleClick (e) {
    dispatch({
      type:'navigation/setCurrentKey',
      current: e.key,
    });
  };

  return (
    <Menu
      style={{textAlign:'center',position:'fixed',bottom:0,width:'100%',borderTop:'1px solid #ccc'}}
      mode="horizontal"
      onClick={handleClick}
      selectedKeys={[navigation.current]}>
      <Menu.Item key="portal"> <Icon type="home"  className={styles.menu}/><div className={styles["menu-text"]}>首页</div>
        <Link to="/app/v1/cportal"></Link>
      </Menu.Item>
      <Menu.Item key="menu"> <Icon type="appstore-o" className={styles.menu}/><div className={styles["menu-text"]}>菜谱</div>
        <Link to="/app/v1/menu"></Link>
      </Menu.Item>
      <Menu.Item key="cart">
        <Badge count={totalPurchaseNum} overflowCount={999} offset={[0,30]}  style={{marginTop:-10}}>
          <Icon type="profile"className={styles.menu}  style={{marginTop:-10}}/>
        </Badge>
        <div className={styles["menu-text"]}>订单</div>
        <Link to="/app/v1/cart"></Link>
      </Menu.Item>
      <Menu.Item key="chat"> <Icon type="message"  className={styles.menu}/><sup style={{display:unReadCount===0?'none':'inline'}}>{unReadCount}</sup>
        <div className={styles["menu-text"]}>呼叫</div>
        <Link to="/app/v1/chat"></Link>
      </Menu.Item>
      <Menu.Item key="user"> <Icon type="user"  className={styles.menu}/><div className={styles["menu-text"]}>我</div>
        <Link to="/app/v1/user"></Link>
      </Menu.Item>
    </Menu>
  );
};

MenuBanner.propTypes = {
};

function mapStateToProps({navigation,menu,chat}) {
  return {navigation,menu,chat};
}

export default connect(mapStateToProps)(MenuBanner);
