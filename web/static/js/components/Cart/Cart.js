import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import CartItemContainer from '../CartItem/CartItemContainer';
import { shouldRender } from '../../lib/remote_data_states';

export default class Cart extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.array.isRequired,
      remoteDataState: PropTypes.string.isRequired
    }).isRequired
  };

  totalPrice = () => this.props.cart.items.reduce((acc, item) => acc + item.price, 0);

  render() {
    if (shouldRender(this.props.cart.remoteDataState)) {
      const items = this.props.cart.items;

      return (
        <div className="usa-grid">
          <div className="usa-section">
            <h2>Your Cart</h2>
          </div>
          <main className="usa-grid-full">
            <ul className="usa-unstyled-list">
              {items.map(item => <li className="cart-item" key={item.id}><CartItemContainer item={item} link /></li>)}
            </ul>
            <form className="cart-checkout-form">
              <h4>
                Total: {currencyFormatter.format(this.totalPrice() / 100, { code: 'USD' })}
              </h4>
              <button>Place Order</button>
            </form>
          </main>

          <div className="return-to-top"><a href="#top">Return to top</a></div>
        </div>
      );
    }
    return <div>Loading..</div>;
  }
}
