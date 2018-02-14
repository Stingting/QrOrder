import React from 'react';
import {Icon, Menu} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva';
import styles from '../../assets/less/global.less';

function MenuBanner ({dispatch, navigation,cart}) {
  const total = cart.totalUnpaidCount;
  function handleClick (e) {
    dispatch({
      type:'navigation/setCurrentKey',
      current: e.key,
    });
  };

  return (
    <Menu
      style={{textAlign:'center'}}
      mode="horizontal"
      onClick={handleClick}
      selectedKeys={[navigation.current]}>
      <Menu.Item key="portal"> <Icon type="home"  className={styles.menu}/><div>首页</div>
        <Link to="/app/v1/cportal"></Link>
      </Menu.Item>
      <Menu.Item key="menu"> <Icon type="appstore-o"  className={styles.menu}/><div>本店菜谱</div>
        <Link to="/app/v1/menu"></Link>
      </Menu.Item>
      <Menu.Item key="cart"> <Icon type="shopping-cart" className={styles.menu}/><sup style={{display:total==0?'none':'inline'}}>{total}</sup><div>已点菜</div>
        <Link to="/app/v1/cart"></Link>
      </Menu.Item>
      <Menu.Item key="chat"> <Icon type="message"  className={styles.menu}/><div>呼叫服务员</div>
        <Link to="/app/v1/chat"></Link>
      </Menu.Item>
      <Menu.Item key="user"> <Icon type="user"  className={styles.menu}/><div>个人中心</div>
        <Link to="/app/v1/user"></Link>
      </Menu.Item>
    </Menu>
  );
};

MenuBanner.propTypes = {
};

function mapStateToProps({navigation,cart}) {
  return {navigation,cart};
}

export default connect(mapStateToProps)(MenuBanner);
