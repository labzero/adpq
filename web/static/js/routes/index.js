
import React from "react";
import { Route, IndexRoute } from "react-router";
import {
  App,
  CategoryContainer,
  LoginContainer,
  Logout,
  ItemDetailContainer,
  HomepageContainer } from "../components/index"

const requireAuth = (nextState, replace, callback) => {
  //check auth
  callback();
}

export default (<Route path="/" component={App}>
  <IndexRoute component={HomepageContainer} onEnter={requireAuth}/>
  <Route path="category/:name" component={CategoryContainer} onEnter={requireAuth}/>
  <Route path="item/:id" component={ItemDetailContainer} onEnter={requireAuth}/>
  <Route path="login" component={LoginContainer}/>
  <Route path="logout" component={Logout}/>
</Route>);
