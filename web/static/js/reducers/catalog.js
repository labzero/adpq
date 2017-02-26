import * as ActionTypes from '../constants/ActionTypes';
import * as RemoteDataStates from '../constants/RemoteDataStates';

const initialState = {
  remoteDataState: RemoteDataStates.NOT_REQUESTED,
  items: [],
  currentItem: {},
  error: null
};

const catalog = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_CATALOG:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADING,
      };
    case ActionTypes.FETCH_CATALOG_SUCCESS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED,
        items: action.data,
      };
    case ActionTypes.FETCH_CATALOG_ERROR:
      return {
        ...state,
        remoteDataState: RemoteDataStates.ERROR,
        error: action.error,
      };
    default:
      return state;
  }
};

export default catalog;
