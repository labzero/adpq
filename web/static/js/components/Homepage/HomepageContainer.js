import { connect } from 'react-redux';
import { fetchCatalogIfNeeded } from '../../actions';
import Homepage from './Homepage';

const mapStateToProps = (state, _ownProps) => ({
  catalog: state.catalog
});

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
