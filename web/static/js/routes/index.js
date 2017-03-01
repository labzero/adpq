
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchCart as fetchCartAction } from '../actions';
import {
  AccountContainer,
  AppContainer,
  CartContainer,
  CategoryContainer,
  LoginContainer,
  Logout,
  ItemDetailContainer,
  HomepageContainer,
  AdminContainer
} from '../components/index';
import { getUserData } from '../lib/user';

const hasRole = (user, role) => (role ? user.role === role : true);

export default function getRoutes(store) {
  const requireAuth = role => (nextState, replace, callback) => {
    const user = getUserData();
    if (user && hasRole(user, role)) {
      callback();
    } else {
      replace(`/login?next=${nextState.location.pathname}${nextState.location.search}`);
      callback();
    }
  };

  const fetchCart = role => (_nextState, _replace, callback) => {
    const user = getUserData();
    if (user && hasRole(user, role)) {
      store.dispatch(fetchCartAction());
    }
    callback();
  };

  return (<Route path="/" component={AppContainer} onEnter={fetchCart()} onChange={fetchCart()}>
    <IndexRoute component={HomepageContainer} onEnter={requireAuth()} />
    <Route path="category/:name" component={CategoryContainer} onEnter={requireAuth()} />
    <Route path="item/:id" component={ItemDetailContainer} onEnter={requireAuth()} />
    <Route path="account" component={AccountContainer} onEnter={requireAuth()} />
    <Route path="cart" component={CartContainer} onEnter={requireAuth()} />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={Logout} />
    <Route path="admin" component={AdminContainer} onEnter={requireAuth()} />
  </Route>);
}
