import { connect } from 'react-redux';
import { fetchCatalogIfNeeded } from '../../actions'
import Category from './Category';
import { parseSorts, parseFilters } from '../../lib/query'
import flatten from 'lodash/fp/flatten'
import { push } from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
  const query = ownProps.location.query
  return {
    catalog: state.catalog,
    sorts: parseSorts(asArray(query.sort)),
    filters: parseFilters(asArray(query.filter)),
    rangeFilters: parseFilters(asArray(query.rangeFilter)),
    category: state.categories.items[ownProps.params.name]
  }
};

const asArray = (val) => val === undefined ? [] : flatten([val])

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  },
  push(path) {
    dispatch(push(path));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
