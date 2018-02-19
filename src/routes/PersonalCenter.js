import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/common/MainLayout';
import {Divider, Icon,Avatar} from 'antd';
import styles from './PersonalCenter.less';
import {routerRedux} from "dva/router";

function PersonalCenter({dispatch, pcenter}) {

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
            <Avatar style={{verticalAlign: 'middle' }} size="large" type="user"></Avatar>
          </div>
          <div className={styles.name}>ssssss</div>
          <div className={styles.uname}><Icon type="right" /></div>
        </div>
        <div className={styles['pcenter-content']}>
          <ul>
            <li onClick={toCollectPage}>
              <Icon type="star" className={styles['icon-collect']}/><span className={styles.title}>我的收藏</span>
            </li>
            <Divider/>
            <li onClick={changeTable}>
              <Icon type="retweet" className={styles['icon-change']}/><span className={styles.title}>换桌</span>
            </li>
            <Divider/>
            <li onClick={cleanTable}>
              <Icon type="delete" className={styles['icon-clean']}/><span className={styles.title}>清桌</span>
            </li>
            <Divider/>
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
function mapStateToProps({}) {
  return {};
}
export default connect(mapStateToProps)(PersonalCenter);
