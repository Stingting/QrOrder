import React from 'react';
import { connect } from 'dva';

function About({dispatch,pcenter}) {

  return (
    <div>关于我们</div>
  );
};

function mapStateToProps({pcenter}) {
  return {pcenter};
}
export default connect(mapStateToProps)(About);
