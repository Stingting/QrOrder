import React from 'react';
import { connect } from 'dva';
import {List,Avatar,Modal,message,Spin,Button, Icon} from 'antd';
import styles from './UserCollection.less';

function UpdateNickname({dispatch,pcenter,backToPcenter}) {
  //返回个人中心
  function userBack() {
    dispatch({
      type: 'pcenter/backToPcenter'
    })
  }
  return (
    <div>
      <div className={styles['collect-head']}>
        <span className={styles['head-font']} onClick={userBack}><Icon type="left"/>个人信息</span>
      </div>
      <div>

      </div>
    </div>
  )
};

function mapStateToProps({pcenter}) {
  return {pcenter};
}
export default connect(mapStateToProps)(UpdateNickname);
