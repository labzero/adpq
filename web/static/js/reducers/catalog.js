import * as ActionTypes from "../constants/ActionTypes"
import * as RemoteDataStates from "../constants/RemoteDataStates"

const initialState = {
  remoteDataState : RemoteDataStates.NOT_REQUESTED,
  items: {},
  currentItem: {},
  error: null
}

const catalog = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_CATALOG:
      return {
        remoteDataState: RemoteDataStates.LOADING,
        state
      }
    case ActionTypes.FETCH_CATALOG_SUCCESS:
      return {
        remoteDataState: RemoteDataStates.LOADED,
        items: action.data,
        state
      }
    case ActionTypes.FETCH_CATALOG_ERROR:
      return {
        remoteDataState: RemoteDataStates.ERROR,
        error: action.error,
        state
      }
    default:
      return state
  }
}

export default catalog
