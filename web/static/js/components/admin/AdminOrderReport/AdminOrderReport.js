import React, { Component, PropTypes } from 'react';
import { shouldRender } from '../../../lib/remote_data_states';
import OrderTable from '../../OrderTable/OrderTable';
import Loading from '../../Loading/Loading';

export default class AdminOrderReport extends Component {
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
      return (
        <div className="usa-grid">
          <div className="usa-section">
            <h2>Orders Report</h2>
            <OrderTable orders={this.props.orderReport.items} />
          </div>
        </div>
      );
    }
    return <Loading />;
  }
}
