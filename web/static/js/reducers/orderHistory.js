import * as ActionTypes from '../constants/ActionTypes';
import * as RemoteDataStates from '../constants/RemoteDataStates';

const initialState = {
  remoteDataState: RemoteDataStates.NOT_REQUESTED,
  items: [],
  error: null
};

const orderHistory = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_ORDERS: {
      const remoteDataState =
        state.remoteDataState === RemoteDataStates.LOADED ?
          RemoteDataStates.LOADING : RemoteDataStates.UPDATING;
      return {
        ...state,
        remoteDataState
      };
    }
    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED,
        items: action.data,
      };
    case ActionTypes.FETCH_ORDERS_ERROR:
      return {
        ...state,
        remoteDataState: RemoteDataStates.ERROR,
        error: action.error,
      };
    case ActionTypes.CREATE_ORDER:
      return {
        ...state,
        remoteDataState: RemoteDataStates.UPDATING,
      };
    case ActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED
      };
    case ActionTypes.CREATE_ORDER_ERROR:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED,
        error: action.error
      };
    default:
      return state;
  }
};

export default orderHistory;
