import { connect } from 'react-redux';
import CartItem from './CartItem';
import { removeFromCart } from '../../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(removeFromCart(ownProps.item.id))
});

export default connect(null, mapDispatchToProps)(CartItem);
