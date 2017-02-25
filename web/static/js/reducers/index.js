import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form'
import { default as authReducer } from './auth'
import { default as catalogReducer } from './catalog'

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  catalog: catalogReducer,
  form: formReducer
});
