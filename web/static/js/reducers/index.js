import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import categoriesReducer from './categories'
import { reducer as formReducer } from 'redux-form'
import { default as authReducer } from './auth'
import { default as catalogReducer } from './catalog'

export default combineReducers({
  routing: routerReducer,
  catalog: catalogReducer,
  categories: categoriesReducer,
  auth: authReducer,
  form: formReducer
});
