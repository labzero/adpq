import React from "react"
import { default as formatCurrency } from "format-currency"
import * as RemoteDataStates from '../../constants/RemoteDataStates'

export default class ItemDetail extends React.Component {

  componentDidMount() {
    this.props.fetchCatalog();
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      const item = this.props.item
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
