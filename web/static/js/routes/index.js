
import React from "react";
import { Route, IndexRoute } from "react-router";
import { Login, Logout, Homepage } from "../components"
import AppContainer from "../containers/App";
import { LoginContainer, ItemDetailContainer, HomepageContainer } from "../containers/index"

const requireAuth = (nextState, replace, callback) => {
  //check auth
  callback();
}

export default (<Route path="/" component={AppContainer}>
  <IndexRoute component={HomepageContainer} onEnter={requireAuth}/>
  <Route path="item/:id" component={ItemDetailContainer}/>
  <Route path="login" component={LoginContainer}/>
  <Route path="logout" component={Logout}/>
</Route>);
