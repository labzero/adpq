import { connect } from 'react-redux';
import { fetchCatalog } from '../actions'
import { Homepage } from '../components';

const mapStateToProps = state => ({
  catalog: state.catalog
});

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalog());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
