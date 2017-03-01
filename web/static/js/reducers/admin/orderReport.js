import * as ActionTypes from '../../constants/ActionTypes';
import * as RemoteDataStates from '../../constants/RemoteDataStates';

const initialState = {
  remoteDataState: RemoteDataStates.NOT_REQUESTED,
  items: [],
  error: null
};

const orderReport = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_ADMIN_ORDERS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADING,
      };
    case ActionTypes.FETCH_ADMIN_ORDERS_SUCCESS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED,
        items: action.data,
      };
    case ActionTypes.FETCH_ADMIN_ORDERS_ERROR:
      return {
        ...state,
        remoteDataState: RemoteDataStates.ERROR,
        error: action.error,
      };
    default:
      return state;
  }
};

export default orderReport;
