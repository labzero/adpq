import React, { Component, PropTypes } from 'react';

class OrderTable extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const { items } = this.props;

    return (
      <div>
        <h3>All Orders</h3>
        <div>
          <div>
            {items.length} order{items.length === 1 ? '' : 's'}
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
            {items.map(item => (
              <tr>
                <td>{item.id}</td>
                <td />
                <td>{item.user_id}</td>
                <td>{item.status}</td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;
