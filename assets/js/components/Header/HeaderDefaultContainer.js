import { connect } from 'react-redux';
import HeaderDefault from './HeaderDefault';

const mapStateToProps = (state, ownProps) => ({
  section: ownProps.section,
  cartCount: state.cart.items.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
});

export default connect(mapStateToProps)(HeaderDefault);
