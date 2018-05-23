import React from 'react';
import { connect } from 'dva';
function WechatAuth({ dispatch , fetch, location, scan}) {
  return (
    <div></div>
  );
}
WechatAuth.propTypes = {

};
function mapStateToProps({ scan}) {
  return {scan};
}
export default connect(mapStateToProps)(WechatAuth);
