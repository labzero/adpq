import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import categoriesReducer from './categories';
import alerts from './alerts';
import auth from './auth';
import cart from './cart';
import catalog from './catalog';
import orderHistory from './orderHistory';
import orderReport from './order_report'

export default combineReducers({
  alerts,
  auth,
  categories: categoriesReducer,
  cart,
  catalog,
  auth,
  orderReport,
  form: formReducer,
  orderHistory,
  routing: routerReducer
});
