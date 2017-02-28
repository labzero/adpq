import { connect } from 'react-redux';
import { fetchAdminOrders } from '../../../actions';
import OrderReport from './OrderReport';
import salesByCategoryDepartment from '../../../lib/order_report';

const mapStateToProps = (state, _ownProps) => (
  {
    orderReport: state.orderReport,
    byCategoryDepartment: salesByCategoryDepartment(state.orderReport.items)
  }
);

const mapDispatchToProps = dispatch => ({
  fetchOrders() {
    dispatch(fetchAdminOrders());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderReport);
