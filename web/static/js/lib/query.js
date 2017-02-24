import map from 'lodash/fp/map'
import includes from 'lodash/fp/includes'
import keys from 'lodash/fp/keys'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import { DIRECTIONS } from './sorts'

const FIELD_DELIMITER = ':'
const VALUE_DELIMITER = ','

const validSortFields = ['list_price', 'simple_category', 'manufacturer']
export const validFilterFields = ['simple_category', 'manufacturer']
const validRangeFields = ['list_price']

const validSort = ([field, direction]) => (
  includes(field, validSortFields) && includes(direction.toUpperCase(), keys(DIRECTIONS))
)

const validFilter = ([field, _values]) => includes(field, validFilterFields)

const validRangeFilter = ([field, [lower, upper]]) => (
  includes(field, validRangeFields) && parseInt(lower) && parseInt(upper)
)

export function parseSorts(param) {
  return flow(
    map(item => item.toLowerCase()),
    map(item => item.split(FIELD_DELIMITER)),
    filter(validSort)
  )(param)
}

export function parseFilters(param) {
  return flow(
    map(item => item.toLowerCase()),
    map(item => item.split(FIELD_DELIMITER)),
    map(([field, values]) => [field, values.split(VALUE_DELIMITER)]),
    filter(validFilter)
  )(param)
}

export function generateFilterQueries(filters) {
  return filters.map(([field, values]) => `filter=${field}${FIELD_DELIMITER}${values.join(VALUE_DELIMITER)}`)
}

export function generateSortQueries(sorts) {
  return sorts.map(([field, direction]) => `sort=${field}${FIELD_DELIMITER}${direction}`)
}

export function generateQuery(sorts, filters) {
  if (!sorts && !filters) {
    return '';
  }

  let queries = [];
  if (sorts && sorts.length) {
    queries = queries.concat(generateSortQueries(sort));
  }
  if (filters && filters.length) {
    queries = queries.concat(generateFilterQueries(filters));
  }
  return `?${queries.join('&')}`;
}
