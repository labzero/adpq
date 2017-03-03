import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import { Link } from 'react-router';
import { catalogItemImage } from '../../lib/image_urls';
import { catalogItemPath } from '../../lib/paths';

class CartItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      quantity: props.item.quantity
    };
  }

  changeQuantity = (event) => {
    this.setState({ quantity: Number(event.target.value) || 0 });
  }

  updateQuantity = () => {
    if (this.state.quantity) {
      this.props.updateQuantity(this.state.quantity);
    } else {
      this.props.remove();
    }
  }

  remove = (event) => {
    event.preventDefault();
    this.props.remove();
  }

  render() {
    const { item } = this.props;
    return (
      <div className="item usa-grid-full">
        <div className="usa-width-one-third item-image">
          <Link to={catalogItemPath(item)}>
            <img src={catalogItemImage(item)} alt={item.description} />
          </Link>
        </div>
        <div className="usa-width-five-twelfths item-details">
          <h4><Link to={catalogItemPath(item)}>{item.name}</Link></h4>
          <p><Link to={catalogItemPath(item)}>{item.manufacturer} SKU: {item.sku}</Link></p>
        </div>
        <div className="usa-width-one-fourth item-cart">
          <h4>
            {currencyFormatter.format(item.price / 100, { code: 'USD' })}
          </h4>
          <div className="usa-grid-full">
            <label className="item-quantity-label" htmlFor={`category_item_${item.manufacturer}-${item.sku}_quantity`}>Qty:</label>
            <input className="item-quantity" id={`category_item_${item.manufacturer}-${item.sku}_quantity`} value={this.state.quantity} onChange={this.changeQuantity} onBlur={this.updateQuantity} required />
          </div>
          <button className="usa-button-outline" onClick={this.remove}>Remove</button>
        </div>
      </div>
    );
  }
}

export default CartItem;
