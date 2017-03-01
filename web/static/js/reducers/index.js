import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import categoriesReducer from './categories';
import alerts from './alerts';
import auth from './auth';
import cart from './cart';
import catalog from './catalog';
import orderReport from './admin/orderReport';
import orderHistory from './orderHistory';
import adminCatalog from './admin/catalog';

export default combineReducers({
  adminCatalog,
  alerts,
  auth,
  categories: categoriesReducer,
  cart,
  catalog,
  form: formReducer,
  orderHistory,
  orderReport,
  routing: routerReducer
});
