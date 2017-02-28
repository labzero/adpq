import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import { Link } from 'react-router';
import { catalogItemImage } from '../../lib/image_urls';

class CartItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  state = {
    quantity: 1
  }

  changeQuantity = (event) => {
    this.setState({ quantity: Number(event.target.value) });
  }

  render() {
    const { item } = this.props;
    return (
      <div className="item usa-grid-full">
        <div className="usa-width-one-third item-image">
          <Link to={`/item/${item.id}`}><img src={catalogItemImage(item)} alt={item.description} /></Link>
        </div>
        <div className="usa-width-five-twelfths item-details">
          <h4><Link to={`/item/${item.id}`}>{item.name}</Link></h4>
          <p><Link to={`/item/${item.id}`}>{item.manufacturer} SKU: {item.sku}</Link></p>
        </div>
        <div className="usa-width-one-fourth item-cart">
          <h4>
            {currencyFormatter.format(item.price / 100, { code: 'USD' })}
          </h4>
          <form onSubmit={this.remove}>
            <select name="options" id="options" value={this.state.quantity} onChange={this.changeQuantity}>
              <option value="1">Qty: 1</option>
            </select>
            <button onClick={this.remove}>Remove</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CartItem;
