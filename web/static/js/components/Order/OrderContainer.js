import { connect } from 'react-redux';
import { fetchAdminOrdersIfNeeded } from '../../actions';
import Order from './Order';

const isAdmin = location => (location.pathname.indexOf('/admin') !== -1);

const mapStateToProps = (state, ownProps) => {
  const order = state.orderReport.items.find(it => `${it.id}` === ownProps.params.id);
  return {
    orderReport: state.orderReport,
    order,
    isAdmin: isAdmin(ownProps.location),
    orderId: ownProps.params.id
  };
};

const mapDispatchToProps = dispatch => ({
  fetchOrder() {
    dispatch(fetchAdminOrdersIfNeeded());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);
