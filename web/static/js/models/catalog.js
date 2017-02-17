import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import inRange from 'lodash/fp/inRange'
import reduce from 'lodash/fp/reduce'
import orderBy from 'lodash/fp/orderBy'

export const filterByValue = (field, value, collection) => (
  filter(item => canonicalize(map(item, field)) === canonicalize(value), collection)
)

export const filterByRange = (field, [lower, upper], collection) => (
  filter(item => inRange(lower, upper + 1), collection)
)

export const sortBy = (sortSpecs, collection) => {
  orderBy(makeSorts(sortSpecs), collection)
}

// transform [[field1, order1], [field2, order2]] => [[field1, field2], [order1, order2]] for orderBy
const makeSorts = (sortSpecs) => (
  reduce(([fields, orders], [field, order]) => {
      fields.push(field)
      orders.push(order)
      return [fields, orders]
  }, [[],[]], sorSpecs)
)

const canonicalize = value => value.toString().toUpperCase()
