import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import cportal from './routes/CustomerPortal';
import scanpage from './routes/ScanPage';
import menu from './routes/MenuPage';
import chat from './routes/ChatPage';
import cart from './routes/CartPage';
import PayDetail from './components/cart/PayDetail';
import user from './routes/PersonalCenter';
import UserCollection from './components/pcenter/UserCollection';
import About from './components/pcenter/About';
import UpdateNickname from './components/pcenter/UpdateNickname';

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
        <Route path="/app/v1/user" exact component={user} />
        <Route path="/app/v1/user/collect" exact component={UserCollection} />
        <Route path="/app/v1/user/about" exact component={About} />
        <Route path="/app/v1/user/updateNickname" exact component={UpdateNickname} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
