
import React from "react";
import { Route, IndexRoute } from "react-router";
import {
  AccountContainer,
  App,
  CategoryContainer,
  LoginContainer,
  Logout,
  ItemDetailContainer,
  HomepageContainer } from "../components/index"
import { loginUser } from "../actions"
import { getUserData } from "../lib/user"
import * as Roles from "../constants/Roles"

const hasRole = (user, role) => role ? user.role === role : true

export default function getRoutes(store) {
  const requireAuth = (store, role) => {
    return (nextState, replace, callback) => {
      const user = getUserData()
      if (user && hasRole(user, role)) {
        callback()
      } else {
        replace(`/login?next=${nextState.location.pathname}${nextState.location.search}`)
        callback()
      }
    }
  }

  return (<Route path="/" component={App}>
    <IndexRoute component={HomepageContainer} onEnter={requireAuth(store)}/>
    <Route path="category/:name" component={CategoryContainer} onEnter={requireAuth(store)}/>
    <Route path="item/:id" component={ItemDetailContainer}/>
    <Route path="account" component={AccountContainer} onEnter={requireAuth(store)}/>
    <Route path="login" component={LoginContainer}/>
    <Route path="logout" component={Logout}/>
  </Route>)

}
