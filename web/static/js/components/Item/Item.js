import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import { Link } from 'react-router';
import { catalogItemImage } from '../../lib/image_urls';

class Item extends Component {
  static propTypes = {
    addToCart: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    link: PropTypes.bool
  };

  state = {
    quantity: 1
  }

  maybeLink = (children) => {
    const { item, link } = this.props;

    if (link) {
      return <Link to={`/item/${item.id}`}>{children}</Link>;
    }
    return children;
  }

  addToCart = (event) => {
    event.preventDefault();
    this.props.addToCart(this.state.quantity);
  }

  changeQuantity = (event) => {
    this.setState({ quantity: Number(event.target.value) });
  }

  render() {
    const { item } = this.props;
    return (
      <div className="item usa-grid-full">
        <div className="usa-width-one-third item-image">{this.maybeLink(<img src={catalogItemImage(item)} alt={item.description} />)}</div>
        <div className="usa-width-five-twelfths item-details">
          <h4>{this.maybeLink(item.name)}</h4>
          <p>{this.maybeLink(`${item.manufacturer} SKU: ${item.sku}`)}</p>
          <ul>
            {item.description.split(',').length ?
              item.description.split(',').map(description => (
                description.length ? (
                  <li key={description}>{description}</li>
                ) : ''
              )) : ''
            }
          </ul>
        </div>
        <div className="usa-width-one-fourth item-cart">
          <h4>
            {currencyFormatter.format(item.list_price / 100, { code: 'USD' })}
          </h4>
          <form className="usa-form" onSubmit={this.addToCart}>
            <select name="options" id="options" value={this.state.quantity} onChange={this.changeQuantity}>
              <option value="1">Qty: 1</option>
            </select>
            <button onClick={this.addToCart}>Add to Cart</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Item;
