import { connect } from 'react-redux';
import { fetchCatalogIfNeeded } from '../actions'
import { Homepage } from '../components';
import { parseSorts, parseFilters } from '../lib/query'
import flatten from 'lodash/fp/flatten'

const mapStateToProps = (state, ownProps) => {
  return {
    catalog: state.catalog
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
