import { sortBy } from "lib/sorts"

const data = [
  {a: 1, b: "a", c: "A"},
  {a: 1, b: "b", c: "B"},
  {a: 2, b: "c", c: "C"}
]

test("it sorts by a single field", () => {
  const expected = [
    {a: 2, b: "c", c: "C"},
    {a: 1, b: "a", c: "A"},
    {a: 1, b: "b", c: "B"}
  ]
  expect(sortBy([['a', 'desc']], data)).toEqual(expected)
})

test("it sorts by multiple fields", () => {
  const expected = [
    {a: 1, b: "b", c: "B"},
    {a: 1, b: "a", c: "A"},
    {a: 2, b: "c", c: "C"}
  ]
  expect(sortBy([['a', 'asc'], ['b', 'desc']], data)).toEqual(expected)
})
