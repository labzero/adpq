import { connect } from 'react-redux';
import Item from './Item';
import { addToCart } from '../../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToCart: qty => dispatch(addToCart(ownProps.item.id, qty))
});

export default connect(null, mapDispatchToProps)(Item);
