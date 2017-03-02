import { connect } from 'react-redux';
import HeaderDefault from './HeaderDefault';

const mapStateToProps = (state, ownProps) => ({
  section: ownProps.section,
  cartCount: state.cart.items.length
});

export default connect(mapStateToProps)(HeaderDefault);
