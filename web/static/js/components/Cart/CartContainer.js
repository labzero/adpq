import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createOrder } from '../../actions';
import Cart from './Cart';

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  placeOrder: () => dispatch(createOrder()),
  goToThanks: () => dispatch(push('/orders/thanks'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
