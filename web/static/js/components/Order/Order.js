import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import currencyFormatter from 'currency-formatter';
import Loading from '../Loading/Loading';
import { catalogItemPath } from '../../lib/paths';
import { shouldRender } from '../../lib/remote_data_states';

export default class Order extends Component {
  static propTypes = {
    fetchOrder: PropTypes.func.isRequired,
    orderReport: PropTypes.shape(
      {
        items: PropTypes.array.isRequired,
        remoteDataState: PropTypes.string.isRequired
      }),
    isAdmin: PropTypes.bool.isRequired,
    order: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchOrder();
  }

  render() {
    if (shouldRender(this.props.orderReport.remoteDataState)) {
      const { order, isAdmin } = this.props;

      return (
        <div className="usa-grid order">
          <div className="usa-section">

            <h2>Order Detail</h2>

            <div className="order-details">
              <h3>Order #{order.id}</h3>
              <table>
                <tbody>
                  <tr>
                    <th>Order Date</th>
                    <td>{new Date(order.inserted_at).toLocaleDateString('en-us')}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{order.status.toLowerCase()}</td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>{order.department}</td>
                  </tr>
                  <tr>
                    <th>Requester</th>
                    <td>User #{order.user_id}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="order-items">
              <h3 className="subsection">Order Items</h3>
              <table className="usa-table-borderless">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>CLIN</th>
                    <th className="order-column-amount">Qty</th>
                    <th className="order-column-amount">Unit Cost</th>
                    <th className="order-column-amount">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.length ?
                      order.items.map(item => (
                        <tr key={`${order.id}-${item.id}`}>
                          <td><Link to={catalogItemPath(item)}>{item.name}</Link></td>
                          {isAdmin ? <td><a href="#edit-item">{item.sku}</a></td> : <td>{item.sku}</td>}
                          <td>1006b</td>
                          <td className="order-column-amount">{item.quantity}</td>
                          <td className="order-column-amount">{currencyFormatter.format(item.price / 100, { code: 'USD' })}</td>
                          <td className="order-column-amount">{currencyFormatter.format((item.price * item.quantity) / 100, { code: 'USD' })}</td>
                        </tr>
                  )) : ''}
                </tbody>
              </table>
            </div>

            <div className="order-total">
              <h3>Order Total: {currencyFormatter.format(order.items.reduce((acc, orderItem) => acc + (orderItem.price * orderItem.quantity), 0) / 100, { code: 'USD' })}</h3>
              <button className="usa-button-outline button-secondary-outline">Cancel</button>
            </div>

          </div>
        </div>
      );
    }
    return <Loading />;
  }
}
