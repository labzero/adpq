import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import sumBy from 'lodash/fp/sumBy';
import flow from 'lodash/fp/flow';
import flatMap from 'lodash/fp/flatMap';

export function salesByCategoryDepartment(orders) {
  return flow(
    groupBy('department'),
    mapValues(x => flatMap('items', x)),
    mapValues(x => groupBy('category', x)),
    mapValues(mapValues(sumBy(x => x.price * x.quantity)))
  )(orders);
}

export function salesByCategory(orders) {
  return flow(
    flatMap('items'),
    groupBy('category'),
    mapValues(sumBy(x => x.price * x.quantity))
  )(orders);
}
