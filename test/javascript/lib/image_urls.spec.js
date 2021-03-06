import { catalogItemImage } from "lib/image_urls"

test("it returns a specific item match", () => {
  expect(catalogItemImage({manufacturer: 'HP', sku: 'F5A53AA#ABA'})).toEqual('/images/products/thin-client-hp.jpg')
})

test("it returns a category match", () => {
  expect(catalogItemImage({manufacturer: 'HP', top_level_category: 'Components', simple_category: 'Video Cards'})).toEqual('/images/products/Components-Video%20Cards.jpg')
})

test("it returns a manufacturer top level category match", () => {
  expect(catalogItemImage({manufacturer: 'HP', top_level_category: 'Laptops', })).toEqual('/images/products/everyday-computing-hp-laptop.jpg')
})

test("it returns a default image when no match is found", () => {
  expect(catalogItemImage({})).toEqual('/images/products/Components-Storage%20Devices.jpg')
})