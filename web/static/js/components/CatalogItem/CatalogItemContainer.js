import { connect } from 'react-redux';
import CatalogItem from './CatalogItem';
import { addToCart } from '../../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToCart: qty => dispatch(addToCart(ownProps.item.id, qty))
});

export default connect(null, mapDispatchToProps)(CatalogItem);
