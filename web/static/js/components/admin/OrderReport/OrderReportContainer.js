import { connect } from 'react-redux';
import { fetchAdminOrdersIfNeeded } from '../../../actions';
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
    dispatch(fetchAdminOrdersIfNeeded());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderReport);
