import reduce from 'lodash/fp/reduce'
import orderBy from 'lodash/fp/orderBy'

export const DIRECTIONS = { 'ASC': 'asc', 'DESC': 'desc'}

export function sortBy(sortSpecs, collection) {
  return orderBy(...makeSorts(sortSpecs), collection)
}

// transform [[field1, order1], [field2, order2]] => [[field1, field2], [order1, order2]] for orderBy
const makeSorts = (sortSpecs) => (
  reduce(([fields, orders], [field, order]) => {
      fields.push(field)
      orders.push(order)
      return [fields, orders]
  }, [[],[]], sortSpecs)
)
