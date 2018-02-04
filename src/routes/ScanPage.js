import React from 'react';
import { connect } from 'dva';
function ScanPage({ dispatch , fetch, location, scan}) {
  return (
   <div>welcome!</div>
  );
}
ScanPage.propTypes = {

};
function mapStateToProps({ scan}) {
  return {scan};
}
export default connect(mapStateToProps)(ScanPage);
