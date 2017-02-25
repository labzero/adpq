import * as ActionTypes from "../constants/ActionTypes";
import { validFilterFields } from '../lib/query';

const initialState = {
  items: {}
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CATALOG_SUCCESS:
      const topLevelCategories = {};
      action.data.forEach((item) => {
        const topLevelCategory = topLevelCategories[item['top_level_category']] || {
          name: item['top_level_category'],
          fields: validFilterFields.reduce((acc, curr) => Object.assign({}, acc, {[curr]: []}), {})
        };

        validFilterFields.forEach((filterField) => {
          if (topLevelCategory.fields[filterField].indexOf(item[filterField]) === -1) {
            topLevelCategory.fields[filterField].push(item[filterField]);
          }
        });

        topLevelCategories[item['top_level_category']] = topLevelCategory;
      });

      return {
        ...state,
        items: topLevelCategories,
      }
    default:
      return state
  }
};

export default categories;
