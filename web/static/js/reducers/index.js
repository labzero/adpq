import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { default as userReducer } from './user'
import { default as catalogReducer } from './catalog'

export default combineReducers({
  routing: routerReducer,
  user: userReducer,
  catalog: catalogReducer
});
