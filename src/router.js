import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Cportal from './routes/CustomerPortal';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/cportal" exact component={Cportal} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
