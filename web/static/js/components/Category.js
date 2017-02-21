import React from "react";
import { IndexLink } from "react-router"
import * as RemoteDataStates from '../constants/RemoteDataStates'
import { CatalogListItem } from './CatalogListItem'
import { applyFilters, applyRangeFilters } from '../lib/filters'
import { sortBy } from '../lib/sorts'
import map from 'lodash/fp/map'
import concat from 'lodash/fp/concat'
import uniq from 'lodash/fp/uniq'


export default class Category extends React.Component {

  componentDidMount() {
    this.props.fetchCatalog();
  }

  sortedAndFilteredData() {
    const items = this.props.catalog.items
    const filters = concat([['category', [this.props.category]]], this.props.filters)
    return sortBy(
      this.props.sorts,
      applyRangeFilters(
        this.props.rangeFilters,
        applyFilters(
          filters, items)))
  }

  render() {
    const items = this.sortedAndFilteredData()
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      return (
        <div>
          <IndexLink to="/?sort=list_price:desc">Price Desc</IndexLink>
          <IndexLink to="/?sort=list_price:asc">Price Asc</IndexLink>
          <IndexLink to="/?filter=manufacturer:dell">Dell</IndexLink>
          <IndexLink to="/?filter=manufacturer:hp">HP</IndexLink>
          <ul>
            {map(item => (<li key={item.id}><CatalogListItem item={item}/></li>), items)}
          </ul>
        </div>
      )
    } else {
      return <div>Loading..</div>
    }
  }
};
