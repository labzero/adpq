import React from "react";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from "../store";
import routes from "../routes";

export default class MainContainer extends React.Component {
  render() {
    const store = configureStore();
    const history = syncHistoryWithStore(browserHistory, store)
    const router = <Router history={history}>
      {routes}
    </Router>;

    return (
      <Provider store={store}>
        {router}
      </Provider>
    );
  }
}
