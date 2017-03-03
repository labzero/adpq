import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { shouldRender } from '../../lib/remote_data_states';
import OrderChart from '../OrderChart/OrderChart';
import OrderTable from '../OrderTable/OrderTable';
import Loading from '../Loading/Loading';

export default class OrderReport extends Component {
  static propTypes = {
    fetchOrders: PropTypes.func.isRequired,
    orderReport: PropTypes.shape({
      items: PropTypes.array.isRequired,
      remoteDataState: PropTypes.string.isRequired
    }).isRequired,
    byCategoryDepartment: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchOrders();
  }

  orderLink = order => <Link to={`/orders/${order.id}`}>{order.id}</Link>

  render() {
    if (shouldRender(this.props.orderReport.remoteDataState)) {
      return (
        <div className="usa-section">
          <h2>Account Orders</h2>
          <OrderChart orders={this.props.byCategoryDepartment} />
          <OrderTable orders={this.props.orderReport.items} orderLink={this.orderLink} />
        </div>
      );
    }
    return <Loading />;
  }
}
