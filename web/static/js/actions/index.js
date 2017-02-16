import * as ActionTypes from "../constants/ActionTypes"

// user actions
export function loginUser(user)  {
  return { type: ActionTypes.LOGIN_USER, user }
}

export function fetchCatalog() {
  return dispatch => {
    dispatch(requestCatalog())
    fetch("https://api.citybik.es/v2/networks") // todo replace placeholder data source
      .then(response => response.json()) // todo check response.ok
      .then(json => dispatch(fetchCatalogSuccess(json)))
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
