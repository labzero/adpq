/* global fetch */
import { browserHistory } from 'react-router';
import includes from 'lodash/fp/includes';
import omit from 'lodash/fp/omit';
import * as ActionTypes from '../constants/ActionTypes';
import * as RemoteDataStates from '../constants/RemoteDataStates';
import { setUserData, deleteUserData, getUserData } from '../lib/user';
import { scrollToTop } from '../lib/scroll';

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
  scrollToTop();
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

export function updateCartItem(id, data) {
  const request = {
    method: 'put',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const user = getUserData();
  return (dispatch) => {
    dispatch(requestUpdateCartItem(id, data));
    return fetch(`/api/user/${user.id}/cart_items/${id}`, requestWithAuth(request))
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(json => dispatch(updateCartItemSuccess(json)))
      .then(() => dispatch(fetchCart()))
      .catch(error => dispatch(updateCartItemError(error))); // TODO flash message
  };
}

export function requestUpdateCartItem(id, data) {
  return { type: ActionTypes.UPDATE_CART_ITEM, id, data };
}

export function updateCartItemSuccess(json) {
  return { type: ActionTypes.UPDATE_CART_ITEM_SUCCESS, data: json };
}

export function updateCartItemError(error) {
  return { type: ActionTypes.UPDATE_CART_ITEM_ERROR, error };
}

// order actions
export function fetchRequiredOrders(admin = false) {
  return (admin ? fetchAdminOrdersIfNeeded() : fetchOrdersIfNeeded());
}

export function fetchOrdersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchOrders(getState())) {
      return dispatch(fetchOrders());
    }
    return Promise.resolve();
  };
}

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
      .catch((error) => {
        dispatch(loginError(error));
        dispatch(alert(loginError(error), true));
      });
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
      .then(checkHttpStatus)
      .then(response => response.json())
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

// admin orders
export function fetchAdminOrdersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAdminOrders(getState())) {
      return dispatch(fetchAdminOrders());
    }
    return Promise.resolve();
  };
}

export function fetchAdminOrders() {
  return (dispatch) => {
    dispatch(requestAdminOrders());
    return fetch('/api/admin/orders', requestWithAuth({}))
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(json => dispatch(fetchAdminOrdersSuccess(json)))
      .catch(error => dispatch(fetchAdminOrdersError(error)));
  };
}

export function requestAdminOrders() {
  return { type: ActionTypes.REQUEST_ADMIN_ORDERS };
}

export function fetchAdminOrdersSuccess(json) {
  return { type: ActionTypes.FETCH_ADMIN_ORDERS_SUCCESS, data: json };
}

export function fetchAdminOrdersError(error) {
  return { type: ActionTypes.FETCH_ADMIN_ORDERS_ERROR, data: error };
}

export function fetchAdminCatalogIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAdminCatalog(getState())) {
      return dispatch(fetchAdminCatalog());
    }
    return Promise.resolve();
  };
}
export function fetchAdminCatalog() {
  return (dispatch) => {
    dispatch(requestAdminCatalog());
    return fetch('/api/admin/catalog_items', requestWithAuth({}))
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(json => dispatch(fetchAdminCatalogSuccess(json)))
      .catch(error => dispatch(fetchAdminCatalogError(error)));
  };
}

export function requestAdminCatalog() {
  return { type: ActionTypes.REQUEST_ADMIN_CATALOG };
}

export function fetchAdminCatalogSuccess(json) {
  return { type: ActionTypes.FETCH_ADMIN_CATALOG_SUCCESS, data: json };
}

export function fetchAdminCatalogError(error) {
  return { type: ActionTypes.FETCH_ADMIN_CATALOG_ERROR, data: error };
}

export function createItem(item) {
  const values = {
    ...item,
    list_price: item.list_price * 100,
    contract_unit_price: item.contract_unit_price * 100
  };
  const request = {
    method: 'post',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  };
  return dispatch => fetch('/api/admin/catalog_items', requestWithAuth(request))
      .then(checkHttpStatus)
      .then(() => dispatch(createItemSuccess()))
      .then(() => dispatch(alert(createItemSuccess())))
      .then(() => dispatch(fetchAdminCatalog()))
      .then(() => dispatch(fetchCatalog()))
      .catch(error => dispatch(createItemError(error))); // TODO flash message
}

export function createItemSuccess() {
  return { type: ActionTypes.CREATE_ITEM_SUCCESS };
}

export function createItemError(error) {
  return { type: ActionTypes.CREATE_ITEM_SUCCESS, data: error };
}

export function updateItem(item) {
  const values = {
    ...item,
    list_price: item.list_price * 100,
    contract_unit_price: item.contract_unit_price * 100
  };
  const request = {
    method: 'put',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(omit('id', values))
  };
  return dispatch => fetch(`/api/admin/catalog_items/${item.id}`, requestWithAuth(request))
      .then(checkHttpStatus)
      .then(() => dispatch(updateItemSuccess()))
      .then(() => dispatch(alert(updateItemSuccess())))
      .then(() => dispatch(fetchAdminCatalog()))
      .then(() => dispatch(fetchCatalog()))
      .catch(error => dispatch(updateItemError(error))); // TODO flash message
}

export function updateItemSuccess() {
  return { type: ActionTypes.UPDATE_ITEM_SUCCESS };
}

export function updateItemError(error) {
  return { type: ActionTypes.UPDATE_ITEM_ERROR, data: error };
}

export function cancelOrder(order, admin = false) {
  const request = {
    method: 'put',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 'CANCELLED' })
  };
  const url = admin ? `/api/admin/orders/${order.id}` : `/api/user/${getUserData().id}/orders/${order.id}`;
  const refresh = admin ? fetchAdminOrders : fetchOrders;
  return dispatch => fetch(url, requestWithAuth(request))
      .then(checkHttpStatus)
      .then(() => dispatch(cancelOrderSuccess(admin)))
      .then(() => dispatch(alert(cancelOrderSuccess(admin))))
      .then(() => dispatch(refresh()))
      .catch(error => dispatch(cancelOrderError(admin, error))); // TODO flash message
}

export function cancelOrderSuccess(admin = false) {
  const type = admin ? ActionTypes.ADMIN_CANCEL_ORDER_SUCCESS : ActionTypes.CANCEL_ORDER_SUCCESS;
  return { type };
}

export function cancelOrderError(admin = false, error) {
  const type = admin ? ActionTypes.ADMIN_CANCEL_ORDER_ERROR : ActionTypes.CANCEL_ORDER_ERROR;
  return { type, error };
}

function shouldFetchAdminOrders(state) {
  return shouldFetch(state.orderReport);
}

function shouldFetchAdminCatalog(state) {
  return shouldFetch(state.adminCatalog);
}

function shouldFetchCatalog(state) {
  return shouldFetch(state.catalog);
}

function shouldFetchOrders(state) {
  return shouldFetch(state.orderHistory);
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
