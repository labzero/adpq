import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
import inRange from 'lodash/fp/inRange';
import includes from 'lodash/fp/includes';

export function filterByValue(field, values, collection) {
  const matchAny = item => includes(canonicalize(item[field]), map(canonicalize, values));
  return filter(matchAny, collection);
}

export function filterByRange(field, [lower, upper], collection) {
  return filter(item => inRange(lower, upper + 1, item[field]), collection);
}

export function applyFilters(filters, data) {
  return reduce((result, filter) => filterByValue(...filter, result), data, filters);
}

export function applyRangeFilters(filters, data) {
  return reduce((result, filter) => filterByRange(...filter, result), data, filters);
}

const canonicalize = value => value.toString().toUpperCase();
