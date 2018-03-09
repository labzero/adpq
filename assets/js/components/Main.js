import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from '../store';
import getRoutes from '../routes';

export default class Main extends React.Component {
  render() {
    const store = configureStore();
    const history = syncHistoryWithStore(browserHistory, store);
    const router = (<Router history={history}>
      {getRoutes(store)}
    </Router>);

    return (
      <Provider store={store}>
        {router}
      </Provider>
    );
  }
}
