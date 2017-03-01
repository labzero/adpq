import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';

class OrderTable extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired
  };

  render() {
    const { orders } = this.props;

    return (
      <div>
        <h3>All Orders</h3>
        <div>
          <div>
            {orders.length} order{orders.length === 1 ? '' : 's'}
          </div>
        </div>
        <table>
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
              <tr>
                <td>{order.id}</td>
                <td>{order.inserted_at}</td>
                <td>{order.user_id}</td>
                <td>{order.status}</td>
                <td>{currencyFormatter.format(order.items.reduce((acc, order_item) => acc + (order_item.price * order_item.quantity), 0) / 100, { code: 'USD' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;
