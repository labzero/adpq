import React, { Component, PropTypes } from 'react';
import { shouldRender } from '../../lib/remote_data_states';
import OrderTable from '../OrderTable/OrderTable';

export default class OrderReport extends Component {
  static propTypes = {
    fetchOrders: PropTypes.func.isRequired,
    orderReport: PropTypes.shape({
      items: PropTypes.array.isRequired,
      remoteDataState: PropTypes.string.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    if (shouldRender(this.props.orderReport.remoteDataState)) {
      return <OrderTable orders={this.props.orderReport.items} />;
    }
    return <div>Loading..</div>;
  }
}
