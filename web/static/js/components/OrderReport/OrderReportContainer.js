import { connect } from 'react-redux';
import { fetchOrdersIfNeeded } from '../../actions';
import OrderReport from './OrderReport';
import salesByCategoryDepartment from '../../lib/order_report';

const mapStateToProps = (state, _ownProps) => (
  {
    orderReport: state.orderHistory,
    byCategoryDepartment: salesByCategoryDepartment(state.orderHistory.items)
  }
);

const mapDispatchToProps = dispatch => ({
  fetchOrders() {
    dispatch(fetchOrdersIfNeeded());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderReport);
