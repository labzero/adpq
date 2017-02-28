import * as ActionTypes from '../../constants/ActionTypes';
import * as RemoteDataStates from '../../constants/RemoteDataStates';

const initialState = {
  remoteDataState: RemoteDataStates.NOT_REQUESTED,
  items: [],
};

const catalog = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_ADMIN_CATALOG:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADING,
      };
    case ActionTypes.FETCH_ADMIN_CATALOG_SUCCESS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED,
        items: action.data,
      };
    case ActionTypes.FETCH_ADMIN_CATALOG_ERROR:
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
