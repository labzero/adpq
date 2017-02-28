import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import categoriesReducer from './categories';
import auth from './auth';
import catalog from './catalog';
import orderReport from './order_report';

export default combineReducers({
  routing: routerReducer,
  categories: categoriesReducer,
  catalog,
  auth,
  orderReport,
  form: formReducer
});
