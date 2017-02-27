import { singleCategory } from "lib/category_item"

test("it returns correct matches", () => {
  expect(singleCategory('Desktops')).toEqual('Desktop')
  expect(singleCategory('Laptops')).toEqual('Laptop')
})

test("it returns input if no match is found", () => {
  expect(singleCategory('Fooz')).toEqual('Fooz')
})
