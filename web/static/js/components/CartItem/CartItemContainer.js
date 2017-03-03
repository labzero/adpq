import { connect } from 'react-redux';
import CartItem from './CartItem';
import { removeFromCart, updateCartItem } from '../../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(removeFromCart(ownProps.item.id)),
  updateQuantity: quantity => dispatch(updateCartItem(ownProps.item.id, { quantity }))
});

export default connect(null, mapDispatchToProps)(CartItem);
