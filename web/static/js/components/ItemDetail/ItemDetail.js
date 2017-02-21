import React from "react"
import { default as formatCurrency } from "format-currency"
import * as RemoteDataStates from '../../constants/RemoteDataStates'
import { applyFilters, filterByValue } from '../../lib/filters'

export default class ItemDetail extends React.Component {

  componentDidMount() {
    this.props.fetchCatalog();
  }

  findItem() {
    let item
    [item] = applyFilters([["manufacturer", [this.props.manufacturer]],["sku", [this.props.sku]]], this.props.catalog.items)
    return item
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      const item = this.findItem()
      if (item) {
        return (<div>
              <ul>
                <li>{item.description}</li>
                <li>{item.manufacturer}</li>
                <li>{formatCurrency(item.list_price / 100, { format: '%s%v', symbol: '$' })}</li>
              </ul>
            </div>
      )} else {
        return <div> No such item </div>
      }
    } else {
      return <div>Loading...</div> // TODO replace with loading indicator component
    }
  }
}
