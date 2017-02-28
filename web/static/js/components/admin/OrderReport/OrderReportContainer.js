import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchAdminOrders } from '../../../actions';
import OrderReport from './OrderReport';

const mapStateToProps = (state, ownProps) => {
  return {
    orderReport: state.orderReport,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchOrders() {
    dispatch(fetchAdminOrders());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderReport);
