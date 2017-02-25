import * as ActionTypes from '../constants/ActionTypes';
import * as RemoteDataStates from '../constants/RemoteDataStates';
import { browserHistory } from 'react-router';
import includes from 'lodash/fp/includes';
import { setUserData, deleteUserData, getUserData } from '../lib/user';


// user actions
export function loginRequest() {
  return { type: ActionTypes.LOGIN_REQUEST };
}

export function loginUser(name, password, redirect = '/') {
  return (dispatch, getState) => {
    if (shouldFetchAuth(getState())) {
      return dispatch(doLoginUser(name, password, redirect));
    }
    return Promise.resolve();
  };
}

const doLoginUser = (name, password, redirect) => {
  const request = {
    method: 'post',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password })
  };
  return (dispatch) => {
    dispatch(loginRequest());
    return fetch('/api/auth', request)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then((json) => {
        dispatch(loginSuccess(json));
        browserHistory.push(redirect); // hmm
      })
      .catch(error => dispatch(loginError(error)));
  };
};

export function loginSuccess(auth) {
  setUserData(auth);
  return { type: ActionTypes.LOGIN_SUCCESS, auth };
}

export function loginError(error) {
  return { type: ActionTypes.LOGIN_ERROR, error };
}

export function logoutUser() {
  deleteUserData();
  return { type: ActionTypes.LOGOUT };
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
  return (dispatch) => {
    dispatch(requestCatalog());
    return fetch('/api/catalog_items', requestWithAuth({}))
      .then(response => response.json()) // TODO check response.ok
      .then(json => dispatch(fetchCatalogSuccess(json)))
      .catch(error => dispatch(fetchCatalogError(error))); // TODO flash message
  };
}


export function fetchCatalogSuccess(json) {
  return { type: ActionTypes.FETCH_CATALOG_SUCCESS, data: json };
}

export function fetchCatalogError(error) {
  return { type: ActionTypes.FETCH_CATALOG_ERROR, error };
}

export function requestCatalog() {
  return { type: ActionTypes.REQUEST_CATALOG };
}

function shouldFetchCatalog(state) {
  return shouldFetch(state.catalog);
}

function shouldFetchAuth(state) {
  return shouldFetch(state.auth);
}

function shouldFetch(remoteData) {
  return !includes(remoteData.remoteDataState, [RemoteDataStates.LOADING, RemoteDataStates.LOADED]);
}

function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function requestWithAuth(request) {
  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization: getUserData().name
    }
  };
}
