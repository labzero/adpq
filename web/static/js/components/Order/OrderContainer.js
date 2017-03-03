import { connect } from 'react-redux';
import { fetchRequiredOrders, cancelOrder } from '../../actions';
import Order from './Order';

const isAdmin = location => (location.pathname.indexOf('/admin') !== -1);

const mapStateToProps = (state, ownProps) => {
  const admin = isAdmin(ownProps.location);
  const orders = getOrders(admin, state);
  const order = findOrder(orders, ownProps.params.id);
  return {
    orders,
    order,
    isAdmin: admin,
    orderId: ownProps.params.id
  };
};

const getOrders = (admin, state) => (admin ? state.orderReport : state.orderHistory);
const findOrder = (orders, id) => orders.items.find(it => `${it.id}` === id);

const mapDispatchToProps = dispatch => ({
  fetchOrder: (admin) => {
    dispatch(fetchRequiredOrders(admin));
  },
  cancelOrder: (order, admin) => {
    dispatch(cancelOrder(order, admin));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);
