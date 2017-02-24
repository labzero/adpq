import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer from './user'
import catalogReducer from './catalog'
import categoriesReducer from './categories'

export default combineReducers({
  routing: routerReducer,
  user: userReducer,
  catalog: catalogReducer,
  categories: categoriesReducer
});
