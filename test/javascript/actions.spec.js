import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
import * as ActionTypes from 'constants/ActionTypes'
import * as RemoteDataStates from 'constants/RemoteDataStates'

import fetchMock from 'fetch-mock'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Auth Actions', () => {
  afterEach(fetchMock.restore)

  it('loginRequest creates a LOGIN_REQUEST action', () => {
    expect(actions.loginRequest().type).toEqual(ActionTypes.LOGIN_REQUEST)
  })

  it('loginUser does nothing if auth request is already in-flight', () => {
    const store = mockStore({auth: {remoteDataState: RemoteDataStates.LOADING}})
    store.dispatch(actions.loginUser())
    expect(store.getActions()).toEqual([])
  })

  it('loginUser does nothing if auth data is already present', () => {
    const store = mockStore({auth: {remoteDataState: RemoteDataStates.LOADED}})
    store.dispatch(actions.loginUser())
    expect(store.getActions()).toEqual([])
  })

  it('loginUser dispatches a login request and handles the response data', () => {
    const store = mockStore({auth: {remoteDataState: RemoteDataStates.NOT_REQUESTED}})
    const mockResponse = {id: 0, name: 'Joe', role: 'ADMIN'}
    const expectedActions = [
      { type: ActionTypes.LOGIN_REQUEST },
      { type: ActionTypes.LOGIN_SUCCESS, auth: mockResponse }
    ]
    fetchMock.mock('/api/auth', mockResponse, {method: "POST"})

    store.dispatch(actions.loginUser()).then(() => {
      expect(fetchMock.called('/api/auth')).toBe(true)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('loginUser dispatches a login request and handles any error', () => {
    const store = mockStore({auth: {remoteDataState: RemoteDataStates.NOT_REQUESTED}})
    const expectedActions = [
      { type: ActionTypes.LOGIN_REQUEST },
      { type: ActionTypes.LOGIN_ERROR, error: 409 }
    ]
    fetchMock.mock('/api/auth', 409, {method: "POST"})

    store.dispatch(actions.loginUser()).then(() => {
      expect(fetchMock.called('/api/auth')).toBe(true)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
