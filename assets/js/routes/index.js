/* global document */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  expireAlerts as expireAlertsAction,
  fetchCart as fetchCartAction
} from '../actions';
import { scrollToTop } from '../lib/scroll';
import {
  AccountContainer,
  AdminContainer,
  AdminOrderReportContainer,
  AppContainer,
  CartContainer,
  CatalogContainer,
  CategoryContainer,
  CreateItem,
  EditItemContainer,
  HomepageContainer,
  ItemDetailContainer,
  LoginContainer,
  Logout,
  OrderReportContainer,
  OrderContainer,
  ThanksContainer
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

  const expireAlerts = () => () => {
    store.dispatch(expireAlertsAction());
  };

  const onChange = role => (nextState, replace, callback) => {
    expireAlerts(role)(nextState, replace, callback);
    fetchCart(role)(nextState, replace, callback);
    scrollToTop();
    document.querySelectorAll('.usa-accordion-button').forEach(button => button.setAttribute('aria-expanded', false));
    document.querySelectorAll('.usa-nav-submenu').forEach(submenu => submenu.setAttribute('aria-hidden', true));
  };

  return (<Route path="/" component={AppContainer} onEnter={fetchCart()} onChange={onChange()}>
    <IndexRoute component={HomepageContainer} onEnter={requireAuth()} />
    <Route path="category/:name" component={CategoryContainer} onEnter={requireAuth()} />
    <Route path="item/:manufacturer_sku" component={ItemDetailContainer} onEnter={requireAuth()} />
    <Route path="account" component={AccountContainer} onEnter={requireAuth()} >
      <IndexRoute component={OrderReportContainer} />
    </Route>
    <Route path="cart" component={CartContainer} onEnter={requireAuth()} />
    <Route path="orders" onEnter={requireAuth()}>
      <Route path="thanks" component={ThanksContainer} />
      <Route path=":id" component={OrderContainer} onEnter={requireAuth()} />
    </Route>
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={Logout} />
    <Route path="admin" component={AdminContainer} onEnter={requireAuth('ADMIN')}>
      <IndexRoute component={AdminOrderReportContainer} />
      <Route path="catalog" component={CatalogContainer} />
      <Route path="orders/:id" component={OrderContainer} />
      <Route path="item/new" component={CreateItem} />
      <Route path="item/:manufacturer_sku" component={EditItemContainer} />
    </Route>
  </Route>);
}
