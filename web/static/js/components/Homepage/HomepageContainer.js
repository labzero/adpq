import { connect } from 'react-redux';
import { fetchCatalogIfNeeded } from '../../actions';
import Homepage from './Homepage';
import { parseSorts, parseFilters } from '../../lib/query';
import flatten from 'lodash/fp/flatten';

const mapStateToProps = (state, ownProps) => ({
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
