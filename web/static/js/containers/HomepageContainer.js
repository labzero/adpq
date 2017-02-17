import { connect } from 'react-redux';
import { fetchCatalogIfNeeded } from '../actions'
import { Homepage } from '../components';
import { parseSorts, parseFilters } from '../lib/query'
import flatten from 'lodash/fp/flatten'

const mapStateToProps = (state, ownProps) => {
  const query = ownProps.location.query
  return {
    catalog: state.catalog,
    sorts: parseSorts(asArray(query.sort)),
    filters: parseFilters(asArray(query.filter)),
    rangeFilters: parseFilters(asArray(query.rangeFilter))
  }
};

const asArray = (val) => val === undefined ? [] : flatten([val])

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
