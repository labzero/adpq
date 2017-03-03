import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
import * as ActionTypes from 'constants/ActionTypes'
import * as RemoteDataStates from 'constants/RemoteDataStates'
import * as reactRouter from 'react-router';
import fetchMock from 'fetch-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Auth Actions', () => {
  beforeEach(function() {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction().mockReturnValue(JSON.stringify({id: 1}));
    reactRouter.browserHistory = {
      push: jest.genMockFunction()
    };
  })

  afterEach(fetchMock.restore)

  it('loginRequest creates a LOGIN_REQUEST action', () => {
    expect(actions.loginRequest().type).toEqual(ActionTypes.LOGIN_REQUEST)
  })

  describe('loginUser', () => {
    it('does nothing if auth request is already in-flight', () => {
      const store = mockStore({auth: {remoteDataState: RemoteDataStates.LOADING}})
      store.dispatch(actions.loginUser())
      expect(store.getActions()).toEqual([])
    })

    it('does nothing if auth data is already present', () => {
      const store = mockStore({auth: {remoteDataState: RemoteDataStates.LOADED}})
      store.dispatch(actions.loginUser())
      expect(store.getActions()).toEqual([])
    })

    it('dispatches a login request and handles the response data', (done) => {
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
        done();
      })
    })

    it('dispatches a login request and handles any error', (done) => {
      const store = mockStore({auth: {remoteDataState: RemoteDataStates.NOT_REQUESTED}})
      const expectedActions = [
        { type: ActionTypes.LOGIN_REQUEST },
        { type: ActionTypes.LOGIN_ERROR, error: 'something' },
        { type: ActionTypes.ALERT, alert: { type: ActionTypes.LOGIN_ERROR, error: 'something' }, willExpire: true }
      ]
      fetchMock.mock('/api/auth', 409, {method: "POST"})

      store.dispatch(actions.loginUser()).then(() => {
        expect(fetchMock.called('/api/auth')).toBe(true)
        expect(store.getActions()[0]).toEqual(expectedActions[0])
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        expect(store.getActions()[2].type).toEqual(expectedActions[2].type)
        expect(store.getActions()[2].alert.type).toEqual(expectedActions[2].alert.type)
        expect(store.getActions()[2].willExpire).toEqual(expectedActions[2].willExpire)
        done();
      })
    })
  })

  describe('fetchCart', () => {
    let store;
    let mockResponse
    beforeEach(() => {
      store = mockStore({})
      mockResponse = [{id: 0, name: 'Computer'}]
      fetchMock.mock('/api/user/1/cart_items', mockResponse, {method: "GET"})
    })

    it('dispatches requestCart', (done) => {
      const expectedActions = [
        { type: ActionTypes.REQUEST_CART }
      ]

      store.dispatch(actions.fetchCart()).then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0])
        done();
      })
    })

    it('fetches cart items', (done) => {
      store.dispatch(actions.fetchCart()).then(() => {
        expect(fetchMock.called('/api/user/1/cart_items')).toBe(true)
        done();
      })
    })

    it('dispatches success', (done) => {
      const expectedActions = [
        { type: ActionTypes.REQUEST_CART },
        { type: ActionTypes.FETCH_CART_SUCCESS, data: mockResponse }
      ]

      fetchMock.mock('/api/user/1/cart_items', mockResponse, {method: "GET"})

      store.dispatch(actions.fetchCart()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done();
      })
    })

    it('dispatches failure', (done) => {
      const expectedActions = [
        { type: ActionTypes.REQUEST_CART },
        { type: ActionTypes.FETCH_CART_ERROR, error: 409 }
      ]

      fetchMock.mock('/api/user/1/cart_items', 409, {method: "GET"})

      store.dispatch(actions.fetchCart()).then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
        done();
      })
    })
  })

  describe('addToCart', () => {
    let store, id, quantity, mockResponse

    beforeEach(() => {
      id = 1
      quantity = 2
      store = mockStore({})
      fetchMock.mock('/api/user/1/cart_items', {}, {method: "GET"})
      mockResponse = {id: 0, name: 'Computer'}
    })

    describe('success', () => {
      let expectedActions;
      beforeEach((done) => {
        expectedActions = [
          { type: ActionTypes.ADD_TO_CART, id, quantity },
          { type: ActionTypes.ADD_TO_CART_SUCCESS, data: mockResponse },
          { type: ActionTypes.REQUEST_CART }
        ]
        fetchMock.mock('/api/user/1/cart_items', mockResponse, {method: "POST"})
        store.dispatch(actions.addToCart(id, quantity)).then(done);
      })

      it('dispatches requestAddToCart', () => {
        expect(store.getActions()[0]).toEqual(expectedActions[0])
      })

      it('dispatches success', () => {
        expect(store.getActions()[1]).toEqual(expectedActions[1])
      })

      it('dispatches fetchCart', () => {
        expect(store.getActions()[2]).toEqual(expectedActions[2])
      })
    })

    it('dispatches error', (done) => {
      const expectedActions = [
        { type: ActionTypes.ADD_TO_CART, id, quantity },
        { type: ActionTypes.ADD_TO_CART_ERROR, error: 'something' }
      ]

      fetchMock.mock('/api/user/1/cart_items', 409, {method: "POST"})
      
      store.dispatch(actions.addToCart(id, quantity)).then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        done();
      })
    })
  })

  describe('updateCartItem', () => {
    let store, id, data, mockResponse

    beforeEach(() => {
      id = 1
      data = {
        quantity: 2
      };
      store = mockStore({})
      fetchMock.mock('/api/user/1/cart_items', {}, {method: "GET"})
      mockResponse = {id: 1, name: 'Computer', quantity: 2}
    })

    describe('success', () => {
      let expectedActions;
      beforeEach((done) => {
        expectedActions = [
          { type: ActionTypes.UPDATE_CART_ITEM, id, data },
          { type: ActionTypes.UPDATE_CART_ITEM_SUCCESS, data: mockResponse },
          { type: ActionTypes.REQUEST_CART }
        ]
        fetchMock.mock('/api/user/1/cart_items/1', mockResponse, {method: "PUT"})
        store.dispatch(actions.updateCartItem(id, data)).then(done);
      })

      it('dispatches requestUpdateCartItem', () => {
        expect(store.getActions()[0]).toEqual(expectedActions[0])
      })

      it('dispatches success', () => {
        expect(store.getActions()[1]).toEqual(expectedActions[1])
      })

      it('dispatches fetchCart', () => {
        expect(store.getActions()[2]).toEqual(expectedActions[2])
      })
    })

    it('dispatches error', (done) => {
      const expectedActions = [
        { type: ActionTypes.UPDATE_CART_ITEM, id, data },
        { type: ActionTypes.UPDATE_CART_ITEM_ERROR, error: 'something' }
      ]

      fetchMock.mock('/api/user/1/cart_items/1', 409, {method: "PUT"})
      
      store.dispatch(actions.updateCartItem(id, data)).then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        done();
      })
    })
  })

  describe('removeFromCart', () => {
    let id, mockResponse, store;
    
    beforeEach(() => {
      id = 123;
      mockResponse = {}
      store = mockStore({})
    })

    describe('success', () => {
      let expectedActions;

      beforeEach((done) => {
        expectedActions = [
          { type: ActionTypes.REMOVE_FROM_CART, id },
          { type: ActionTypes.REMOVE_FROM_CART_SUCCESS },
          { type: ActionTypes.REQUEST_CART }
        ]

        fetchMock.mock('/api/user/1/cart_items/123', {}, {method: "DELETE"})
        fetchMock.mock('/api/user/1/cart_items', {}, {method: "GET"})

        store.dispatch(actions.removeFromCart(id)).then(done);
      })

      it('dispatches requestRemoveFromCart', () => {
        expect(store.getActions()[0]).toEqual(expectedActions[0])
      })

      it('dispatches removeFromCartSuccess', () => {
        expect(store.getActions()[1]).toEqual(expectedActions[1])
      })

      it('dispatches fetchCart', () => {
        expect(store.getActions()[2]).toEqual(expectedActions[2])
      })
    })

    it('dispatches removeFromCartError', (done) => {
      const expectedActions = [
        { type: ActionTypes.REMOVE_FROM_CART, id },
        { type: ActionTypes.REMOVE_FROM_CART_ERROR, error: 'something' }
      ]

      fetchMock.mock('/api/user/1/cart_items/123', 409, {method: "DELETE"})
      
      store.dispatch(actions.removeFromCart(id)).then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        done();
      })
    })

  })

  describe('createOrder', () => {
    let store, mockResponse

    beforeEach(() => {
      store = mockStore({})
      fetchMock.mock('/api/user/1/cart_items', {}, {method: "GET"})
      fetchMock.mock('/api/user/1/orders', {}, {method: "GET"})
    })

    describe('success', () => {
      let expectedActions;

      beforeEach((done) => {
        mockResponse = [{id: 0, name: 'Computer'}]
        fetchMock.mock('/api/user/1/orders', mockResponse, {method: "POST"})
        expectedActions = [
          { type: ActionTypes.CREATE_ORDER },
          { type: ActionTypes.CREATE_ORDER_SUCCESS },
          { type: ActionTypes.ALERT, alert: { type: ActionTypes.CREATE_ORDER_SUCCESS }, willExpire: false },
          { type: ActionTypes.REQUEST_CART },
          { type: ActionTypes.FETCH_CART_SUCCESS, data: {} },
          { type: ActionTypes.REQUEST_ORDERS },
          { type: ActionTypes.FETCH_ORDERS_SUCCESS, data: {} },

        ]
        store.dispatch(actions.createOrder()).then(done);
      })

      it('dispatches requestCreateOrder', () => {
        expect(store.getActions()[0]).toEqual(expectedActions[0])
      })

      it('dispatches success', () => {
        expect(store.getActions()[1]).toEqual(expectedActions[1])
      })

      it('dispatches alert', () => {
        expect(store.getActions()[2]).toEqual(expectedActions[2])
      })

      it('dispatches fetchCart', () => {
        expect(store.getActions()[3]).toEqual(expectedActions[3])
      })

      it('dispatches fetchOrders', () => {
        expect(store.getActions()[5]).toEqual(expectedActions[5])
      })
    })

    it('dispatches error', (done) => {
      const expectedActions = [
        { type: ActionTypes.CREATE_ORDER },
        { type: ActionTypes.CREATE_ORDER_ERROR, error: 'something' }
      ]

      fetchMock.mock('/api/user/1/orders', 409, {method: "POST"})
      
      store.dispatch(actions.createOrder()).then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        done();
      })
    })
  })

  describe('alert', () => {
    let store, action

    beforeEach(() => {
      action = { type: 'WOO_HOO' }
      store = mockStore({})
    })

    it('dispatches alert with action', () => {
      store.dispatch(actions.alert(action))
      expect(store.getActions()).toEqual([
        { 
          type: 'ALERT',
          alert: action,
          willExpire: false
        }
      ])
    })

    it('dispatches immediately expiring alert', () => {
      store.dispatch(actions.alert(action, true))
      expect(store.getActions()).toEqual([
        { 
          type: 'ALERT',
          alert: action,
          willExpire: true
        }
      ])
    })
  })
})
