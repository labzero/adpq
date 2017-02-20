import * as ActionTypes from "../constants/ActionTypes"
import * as RemoteDataStates from "../constants/RemoteDataStates"
import includes from 'lodash/fp/includes'


// user actions
export function loginUser(user)  {
  return { type: ActionTypes.LOGIN_USER, user }
}

export function fetchCatalogIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCatalog(getState())) {
      return dispatch(fetchCatalog());
    }

    // Let the calling code know there's nothing to wait for.
    return Promise.resolve();
  };
}

export function fetchCatalog() {
  return dispatch => {
    dispatch(requestCatalog())
    fetch('/api/catalog_items')
      .then(response => response.json()) // TODO check response.ok
      .then(json => dispatch(fetchCatalogSuccess(json.data)))
      .catch(error => dispatch(fetchCatalogError(error))) // TODO flash message
  }
}

export function fetchCatalogSuccess(json) {
  return { type: ActionTypes.FETCH_CATALOG_SUCCESS, data: json }
}

export function fetchCatalogError(error) {
  return { type: ActionTypes.FETCH_CATALOG_ERROR, error: error }
}

export function requestCatalog() {
  return { type: ActionTypes.REQUEST_CATALOG }
}

function shouldFetchCatalog(state) {
  const catalog = state.catalog;
  return !includes(catalog.remoteDataState, [RemoteDataStates.LOADING, RemoteDataStates.LOADED])
}
