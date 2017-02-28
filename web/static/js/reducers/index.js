import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import categoriesReducer from './categories';
import alerts from './alerts';
import auth from './auth';
import cart from './cart';
import catalog from './catalog';
import orderHistory from './orderHistory';

export default combineReducers({
  alerts,
  auth,
  categories: categoriesReducer,
  cart,
  catalog,
  form: formReducer,
  orderHistory,
  routing: routerReducer
});
