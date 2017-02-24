import React from "react"
import currencyFormatter from 'currency-formatter'
import * as RemoteDataStates from '../../constants/RemoteDataStates'
import { applyFilters, filterByValue } from '../../lib/filters'

export default class ItemDetail extends React.Component {

  componentDidMount() {
    this.props.fetchCatalog();
  }

  findItem() {
    // mock item here because even when we pass in the right filters it never show anything but "Loading..."
    const item = {
      name: ' Dell Optiplex 3040 MT',
      manufacturer: 'DELL',
      sku: '210-AFXL',
      list_price: 10000,
      image: '/images/products/everyday-computing-dell-desktop.jpg',
      description: "4GB 1DIMM 1600MHz DDR3L, Windows 7 Pro (32/64 bit), integrated Intel HD Graphics, DVD+/- RW, 500GB SATA 7200rpm, USB Optical Wheel Mouse, USB Keyboard, 3-Year Next Business Day On-Site Warranty",
    }

    // let item
    // [item] = applyFilters([["manufacturer", [this.props.manufacturer]],["sku", [this.props.sku]]], this.props.catalog.items)
    return item
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      const item = this.findItem()
      if (item) {
        return (
          <div className="usa-grid item-detail">
            <div className="usa-section">
              <h2>Product Detail</h2>
            </div>
            <div className="item-detail-grid">
              <div className="usa-width-one-third item-detail-image"><img src={item.image} alt={item.description}/></div>
              <div className="usa-width-five-twelfths item-detail-details">
                <h4>{item.name}</h4>
                <p>{item.manufacturer} SKU: {item.sku}</p>
                <ul>
                  {item.description.split(',').length ?
                      item.description.split(',').map((description, i) => (
                        <li key={i}>{description}</li>
                          )
                      ) : ''
                  }
                </ul>
              </div>
              <div className="usa-width-one-fourth item-detail-cart">
                <h4>
                  {currencyFormatter.format(item.list_price / 100, { code: 'USD' })}
                </h4>
                <form className="usa-form">
                  <select name="options" id="options">
                    <option value="value1">Qty: 1</option>
                  </select>
                  <button>Add to Cart</button>
                </form>
              </div>
            </div>

            <div className="return-to-top"><a href="#top">Return to top</a></div>
          </div>
      )} else {
        return <div> No such item </div>
      }
    } else {
      return <div className="loading">Loading..</div> // TODO replace with loading indicator component
    }
  }
}
