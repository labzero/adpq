import * as ActionTypes from "../constants/ActionTypes"

// user actions
export function loginUser(user)  {
  return { type: ActionTypes.LOGIN_USER, user }
}

export function fetchCatalog() {
  return dispatch => {
    dispatch(requestCatalog())
    fetch('/api/catalog_items')
      .then(response => response.json()) // todo check response.ok
      .then(json => dispatch(fetchCatalogSuccess(json.data)))
      .catch(error => dispatch(fetchCatalogError(error)))
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
