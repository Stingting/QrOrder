import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import cportal from './routes/CustomerPortal';
import scanpage from './routes/ScanPage';
import menu from './routes/MenuPage';
import chat from './routes/ChatPage';
import cart from './routes/CartPage';
import PayDetail from './components/cart/PayDetail';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/app/v1/scanpage/:id" exact component={scanpage} />
        <Route path="/app/v1/cportal" exact component={cportal} />
        <Route path="/app/v1/menu" exact component={menu} />
        <Route path="/app/v1/chat" exact component={chat} />
        <Route path="/app/v1/cart" exact component={cart} />
        <Route path="/app/v1/cart/paydetail" exact component={PayDetail} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
