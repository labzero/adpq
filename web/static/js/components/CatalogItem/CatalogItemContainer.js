import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CatalogItem from './CatalogItem';
import { addToCart } from '../../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToCart: qty => dispatch(addToCart(ownProps.item.id, qty)),
  goToCart: () => dispatch(push('/cart'))
});

export default connect(null, mapDispatchToProps)(CatalogItem);
