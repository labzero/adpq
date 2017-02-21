
import React from "react";
import { Route, IndexRoute } from "react-router";
import AppContainer from "../containers/App";
import {
  CategoryContainer,
  LoginContainer,
  ItemDetailContainer,
  HomepageContainer } from "../containers/index"
import {
   Login,
   Logout,
   Homepage } from "../components"

const requireAuth = (nextState, replace, callback) => {
  //check auth
  callback();
}

export default (<Route path="/" component={AppContainer}>
  <IndexRoute component={HomepageContainer} onEnter={requireAuth}/>
  <Route path="category/:name" component={CategoryContainer} onEnter={requireAuth}/>
  <Route path="item/:id" component={ItemDetailContainer} onEnter={requireAuth}/>
  <Route path="login" component={LoginContainer}/>
  <Route path="logout" component={Logout}/>
</Route>);
