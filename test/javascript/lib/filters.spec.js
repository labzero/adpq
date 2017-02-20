import {
  filterByValue, filterByRange,
  applyFilters,
  applyRangeFilters
} from "lib/filters"

import sortBy from 'lodash/fp/sortBy'
const data = [
  {a: 10, b: 20, c: "bar"},
  {a: 10, b: 100, c: "baz"},
  {a: 20, b: 20, c: "foo"},
  {a: 100, b: 30, c: "FOO"}
]

describe("applyFilters", () => {

  test("it applies multiple exact value filters correctly", () => {
    const filters = [
      ["a", [10, 20]],
      ["b", [20]]
    ]
    const expected = [
      {a: 10, b: 20, c: "bar"},
      {a: 20, b: 20, c: "foo"}
    ]
    expect(applyFilters(filters, data)).toEqual(expected)
  })

  test("it leaves the data untouched if given no filters", () => {
    expect(applyFilters([], data)).toEqual(data)
  })
})

describe("applyRangeFilters", () => {

  test("it applies multiple range filters correctly", () => {
    const filters = [
      ["a", [20, 100]],
      ["b", [20, 50]]
    ]
    const expected = [
      {a: 20, b: 20, c: "foo"},
      {a: 100, b: 30, c: "FOO"}
    ]
    expect(applyRangeFilters(filters, data)).toEqual(expected)
  })

  test("it leaves the data untouched if given no filters", () => {
    expect(applyRangeFilters([], data)).toEqual(data)
  })
})

describe("filterByValue", () => {

  test("it filters by a single numbers", () => {
    const expected = [
      {a: 10, b: 20, c: "bar"},
      {a: 10, b: 100, c: "baz"}
    ]
    expect(filterByValue('a', [10], data)).toEqual(expected)
  })

  test("it filters by a multiple numbers", () => {
    const expected = [
      {a: 10, b: 20, c: "bar"},
      {a: 10, b: 100, c: "baz"},
      {a: 100, b: 30, c: "FOO"}
    ]
    expect(filterByValue('a', [10, 100], data)).toEqual(expected)
  })

  test("it filters by a single string (case insensitive)", () => {
    const expected = [
      {a: 20, b: 20, c: "foo"},
      {a: 100, b: 30, c: "FOO"}
    ]
    expect(filterByValue('c', ['foo'], data)).toEqual(expected)
    expect(filterByValue('c', ['FOO'], data)).toEqual(expected)
  })

  test("it filters by multiple strings", () => {
    const expected = sortBy('a', [
      {a: 20, b: 20, c: "foo"},
      {a: 100, b: 30, c: "FOO"},
      {a: 10, b: 100, c: "baz"}
    ])
    expect(sortBy('a', filterByValue('c', ['foo', 'BAZ'], data))).toEqual(expected)
  })
})

describe("filterByRange", () => {

  test("it filters by range", () => {
    const expected = [
      {a: 10, b: 20, c: "bar"},
      {a: 10, b: 100, c: "baz"},
      {a: 20, b: 20, c: "foo"}
    ]
    expect(filterByRange('a', [10, 50], data)).toEqual(expected)
  })
})
