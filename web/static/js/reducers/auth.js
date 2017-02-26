import * as ActionTypes from '../constants/ActionTypes';
import * as RemoteDataStates from '../constants/RemoteDataStates';


const initialState = {
  remoteDataState: RemoteDataStates.NOT_REQUESTED,
  error: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADING
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        remoteDataState: RemoteDataStates.LOADED,
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        remoteDataState: RemoteDataStates.ERROR,
        error: action.error
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        remoteDataState: RemoteDataStates.NOT_REQUESTED,
        error: null
      };
    default:
      return state;
  }
};

export default auth;
