import * as ActionTypes from '../constants/ActionTypes';
import * as RemoteDataStates from '../constants/RemoteDataStates';

const initialState = {
  remoteDataState: RemoteDataStates.NOT_REQUESTED,
  items: [],
  error: null
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_CART: {
      const remoteDataState =
        state.remoteDataState === RemoteDataStates.LOADED ?
          RemoteDataStates.LOADING : RemoteDataStates.UPDATING;
      return {
        ...state,
        remoteDataState
      };
    }
    case ActionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED,
        items: action.data,
      };
    case ActionTypes.FETCH_CART_ERROR:
      return {
        ...state,
        remoteDataState: RemoteDataStates.ERROR,
        error: action.error,
      };
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        remoteDataState: RemoteDataStates.UPDATING,
      };
    case ActionTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED
      };
    case ActionTypes.ADD_TO_CART_ERROR:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED
      };
    default:
      return state;
  }
};

export default cart;
