import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';

class OrderTable extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
    orderLink: PropTypes.func.isRequired
  };

  render() {
    const { orders, orderLink } = this.props;

    return (
      <div>
        <h3>All Orders</h3>
        <div className="order-table-stats">
          <div>
            {orders.length} order{orders.length === 1 ? '' : 's'}
          </div>
          <div>
            {currencyFormatter.format(orders.reduce((acc, order) => acc.concat(order.items), []).reduce((acc, item) => acc + (item.price * item.quantity), 0) / 100, { code: 'USD' })} spent
          </div>
        </div>
        <table className="usa-table-borderless">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Requester</th>
              <th>Status</th>
              <th>$ Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{orderLink(order)}</td>
                <td>{new Date(order.inserted_at * 1000).toLocaleDateString('en-us')}</td>
                <td>{order.user_id}</td>
                <td>{order.status}</td>
                <td>{currencyFormatter.format(order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) / 100, { code: 'USD' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;
