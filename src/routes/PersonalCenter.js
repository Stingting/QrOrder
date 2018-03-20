import React from 'react';
import {connect} from 'dva';
import MainLayout from '../components/common/MainLayout';
import {Icon} from 'antd';
import styles from './PersonalCenter.less';
import {getSessionStorage} from "../utils/helper";

function PersonalCenter({dispatch, pcenter}) {

  /**
   * 跳转购物车页面
   */
  function toCartPage() {
      dispatch({
        type:'pcenter/toCartPage'
      });
  }

  /**
   * 跳转收藏列表页面
   */
  function toCollectPage() {
    dispatch({
      type:'pcenter/toCollectPage'
    })
  }

  /**
   * 换桌
   */
  function changeTable() {

  }

  /**
   * 清桌
   */
  function cleanTable() {

  }

  /**
   * 关于
   */
  function aboutUs() {
    dispatch({
      type:'pcenter/about'
    })
  }

  /**
   * 修改昵称
   */
  function toUpdateNickname() {
    dispatch({
      type:'pcenter/toUpdateNickname'
    })
  }
  return (
    <MainLayout>
      <div>
        <div className={styles['pcenter-head']} onClick={toUpdateNickname}>
          <div className={styles.head}>
            <img width={60} height={60} src={getSessionStorage("head")} alt=''/>
          </div>
          <div className={styles.name}>user</div>
        </div>
        <div className={styles['pcenter-content']}>
          <ul>
            <li onClick={toCartPage} className={styles.divider}>
              <Icon type="profile" className={styles['icon-profile']}/><span className={styles.title}>我的订单</span>
            </li>
            <li onClick={toCollectPage} className={styles.divider}>
              <Icon type="star" className={styles['icon-collect']}/><span className={styles.title}>我的收藏</span>
            </li>
            <li onClick={changeTable} className={styles.divider}>
              <Icon type="retweet" className={styles['icon-change']}/><span className={styles.title}>换桌</span>
            </li>
            <li onClick={cleanTable} className={styles.divider}>
              <Icon type="delete" className={styles['icon-clean']}/><span className={styles.title}>清桌</span>
            </li>
            <li onClick={aboutUs}>
              <Icon type="bars" className={styles['icon-about']}/><span className={styles.title}>关于</span>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

PersonalCenter.propTypes = {
};
function mapStateToProps({pcenter}) {
  return {pcenter};
}
export default connect(mapStateToProps)(PersonalCenter);
