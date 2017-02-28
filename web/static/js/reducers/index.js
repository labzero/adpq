import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import categoriesReducer from './categories';
import auth from './auth';
import cart from './cart';
import catalog from './catalog';

export default combineReducers({
  auth,
  categories: categoriesReducer,
  cart,
  catalog,
  form: formReducer,
  routing: routerReducer
});
