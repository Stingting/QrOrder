import React from 'react';
import {connect} from 'dva';
import {Icon, NavBar} from 'antd-mobile';

function UpdateNickname({dispatch,pcenter}) {

  //返回个人中心
  function userBack() {
    dispatch({
      type: 'pcenter/backToPcenter'
    })
  }
  return (
    <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => userBack()}
        rightContent={[
          <Icon key="1" type="ellipsis" />
        ]}
      >个人信息</NavBar>
    </div>
  )
};

function mapStateToProps({pcenter}) {
  return {pcenter};
}
export default connect(mapStateToProps)(UpdateNickname);
