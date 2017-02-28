
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  AccountContainer,
  AppContainer,
  CategoryContainer,
  LoginContainer,
  Logout,
  ItemDetailContainer,
  HomepageContainer,
  AdminContainer,
  OrderReportContainer
} from '../components/index';
import { getUserData } from '../lib/user';

const hasRole = (user, role) => (role ? user.role === role : true);

export default function getRoutes(store) {
  const requireAuth = (_store, role) => (nextState, replace, callback) => {
    const user = getUserData();
    if (user && hasRole(user, role)) {
      callback();
    } else {
      replace(`/login?next=${nextState.location.pathname}${nextState.location.search}`);
      callback();
    }
  };

  return (<Route path="/" component={AppContainer}>
    <IndexRoute component={HomepageContainer} onEnter={requireAuth(store)} />
    <Route path="category/:name" component={CategoryContainer} onEnter={requireAuth(store)} />
    <Route path="item/:id" component={ItemDetailContainer} />
    <Route path="account" component={AccountContainer} onEnter={requireAuth(store)} />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={Logout} />
    <Route path="admin" component={AdminContainer} onEnter={requireAuth(store)}>
      <IndexRoute component={OrderReportContainer} />
    </Route>
  </Route>);
}
