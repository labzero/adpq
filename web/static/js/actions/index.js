/* global fetch */
import { browserHistory } from 'react-router';
import includes from 'lodash/fp/includes';
import * as ActionTypes from '../constants/ActionTypes';
import * as RemoteDataStates from '../constants/RemoteDataStates';
import { setUserData, deleteUserData, getUserData } from '../lib/user';

export function fetchCart() {
  return (dispatch) => {
    dispatch(requestCart());
    const user = getUserData();
    return fetch(`/api/user/${user.id}/cart_items`, requestWithAuth({}))
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(json => dispatch(fetchCartSuccess(json)))
      .catch(error => dispatch(fetchCartError(error))); // TODO flash message
  };
}

export function fetchCartSuccess(json) {
  return { type: ActionTypes.FETCH_CART_SUCCESS, data: json };
}

export function fetchCartError(error) {
  return { type: ActionTypes.FETCH_CART_ERROR, error };
}

export function requestCart() {
  return { type: ActionTypes.REQUEST_CART };
}

export function addToCart(id, quantity) {
  const request = {
    method: 'post',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ catalog_item_id: id, quantity })
  };
  const user = getUserData();
  return (dispatch) => {
    dispatch(requestAddToCart(id, quantity));
    return fetch(`/api/user/${user.id}/cart_items`, requestWithAuth(request))
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(json => dispatch(addToCartSuccess(json)))
      .then(() => dispatch(fetchCart()))
      .catch(error => dispatch(addToCartError(error))); // TODO flash message
  };
}

export function requestAddToCart(id, quantity) {
  return { type: ActionTypes.ADD_TO_CART, id, quantity };
}

export function addToCartSuccess(json) {
  return { type: ActionTypes.ADD_TO_CART_SUCCESS, data: json };
}

export function addToCartError(error) {
  return { type: ActionTypes.ADD_TO_CART_ERROR, error };
}

export function removeFromCart(id) {
  const request = {
    method: 'delete',
    credentials: 'include'
  };
  const user = getUserData();
  return (dispatch) => {
    dispatch(requestRemoveFromCart(id));
    return fetch(`/api/user/${user.id}/cart_items/${id}`, requestWithAuth(request))
      .then(checkHttpStatus)
      .then(() => dispatch(removeFromCartSuccess()))
      .then(() => dispatch(fetchCart()))
      .catch(error => dispatch(removeFromCartError(error))); // TODO flash message
  };
}

export function requestRemoveFromCart(id) {
  return { type: ActionTypes.REMOVE_FROM_CART, id };
}

export function removeFromCartSuccess() {
  return { type: ActionTypes.REMOVE_FROM_CART_SUCCESS };
}

export function removeFromCartError(error) {
  return { type: ActionTypes.REMOVE_FROM_CART_ERROR, error };
}

// order actions
export function fetchOrders() {
  return (dispatch) => {
    dispatch(requestOrders());
    const user = getUserData();
    return fetch(`/api/user/${user.id}/orders`, requestWithAuth({}))
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(json => dispatch(fetchOrdersSuccess(json)))
      .catch(error => dispatch(fetchOrdersError(error))); // TODO flash message
  };
}

export function fetchOrdersSuccess(json) {
  return { type: ActionTypes.FETCH_ORDERS_SUCCESS, data: json };
}

export function fetchOrdersError(error) {
  return { type: ActionTypes.FETCH_ORDERS_ERROR, error };
}

export function requestOrders() {
  return { type: ActionTypes.REQUEST_ORDERS };
}

export function createOrder() {
  const request = {
    method: 'post',
    credentials: 'include'
  };
  const user = getUserData();
  return (dispatch) => {
    dispatch(requestCreateOrder());
    return fetch(`/api/user/${user.id}/orders`, requestWithAuth(request))
      .then(checkHttpStatus)
      .then(() => dispatch(createOrderSuccess()))
      .then(() => dispatch(alert(createOrderSuccess())))
      .then(() => dispatch(fetchCart()))
      .then(() => dispatch(fetchOrders()))
      .catch(error => dispatch(createOrderError(error))); // TODO flash message
  };
}

export function requestCreateOrder() {
  return { type: ActionTypes.CREATE_ORDER };
}

export function createOrderSuccess() {
  return { type: ActionTypes.CREATE_ORDER_SUCCESS };
}

export function createOrderError(error) {
  return { type: ActionTypes.CREATE_ORDER_ERROR, error };
}

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
        browserHistory.push(redirectOrDefault(redirect));
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

// catalog actions
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

// alerts actions
export function alert(action, willExpire = false) {
  return { type: ActionTypes.ALERT, alert: action, willExpire };
}

export function expireAlerts() {
  return { type: ActionTypes.EXPIRE_ALERTS };
}

// helpers
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

function redirectOrDefault(redirect) {
  if (getUserData().role === 'ADMIN' && redirect === '/') {
    return '/admin';
  }
  return redirect;
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
