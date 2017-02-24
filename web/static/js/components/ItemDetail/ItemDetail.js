import React from "react"
import * as RemoteDataStates from '../../constants/RemoteDataStates'
import { applyFilters, filterByValue } from '../../lib/filters'
import Item from '../Item/Item';

export default class ItemDetail extends React.Component {

  componentDidMount() {
    this.props.fetchCatalog();
  }

  render() {
    const { item } = this.props;

    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      if (item) {
        return (
          <div className="usa-grid item-detail">
            <div className="usa-section">
              <h2>Product Detail</h2>
            </div>
            <Item item={item} />

            <div className="return-to-top"><a href="#top">Return to top</a></div>
          </div>
      )} else {
        return <div>No such item</div>
      }
    } else {
      return <div className="loading">Loading..</div> // TODO replace with loading indicator component
    }
  }
}
