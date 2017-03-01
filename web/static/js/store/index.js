/* global window */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers/index';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

export default function configureStore() {
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunkMiddleware),
      applyMiddleware(routerMiddleware(browserHistory))
    )
  );
}
