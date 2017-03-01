import { match } from 'react-router'
import { default as getRoutes } from 'routes'

let routes;

beforeEach(function() {
  global.sessionStorage = jest.genMockFunction();
  global.sessionStorage.setItem = jest.genMockFunction();
  global.sessionStorage.getItem = jest.genMockFunction().mockReturnValue(null);
  routes = getRoutes(null)
})

describe("routes", () => {
  it("/ base route is defined", (cb) => {
    match(route("/"), exists(cb))
  })
  it("/category route without param is not defined", (cb) => {
    match(route("/category"), doesNotExist(cb))
  })
  it("/category/:id route is defined", (cb) => {
    match(route("/category/laptops"), exists(cb))
  })
  it("/item route without param is not defined", (cb) => {
    match(route("/item"), doesNotExist(cb))
  })
  it("/item/:id route is defined", (cb) => {
    match(route("/item/dell|a-345"), exists(cb))
  })
  it("/account route is defined", (cb) => {
    match(route("/account"), exists(cb))
  })
  it("/cart route is defined", (cb) => {
    match(route("/cart"), exists(cb))
  })
  it("/login route is defined", (cb) => {
    match(route("/login"), exists(cb))
  })
  it("/logout route is defined", (cb) => {
    match(route("/logout"), exists(cb))
  })
})

const route = (location) => ({history: null, routes: routes, location: location})

const exists = (cb) => {
  return (_, match) => {
    expect(match).toBeDefined()
    cb()
  }
}

const doesNotExist = (cb) => {
  return (_, match) => {
    expect(match).toBeUndefined()
    cb()
  }
}
