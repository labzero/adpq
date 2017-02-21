import { connect } from 'react-redux';
import { fetchCatalogIfNeeded } from '../../actions'
import Category from './Category';
import { parseSorts, parseFilters } from '../../lib/query'
import flatten from 'lodash/fp/flatten'

const mapStateToProps = (state, ownProps) => {
  const query = ownProps.location.query
  console.log("param " + ownProps.params.name)
  return {
    catalog: state.catalog,
    sorts: parseSorts(asArray(query.sort)),
    filters: parseFilters(asArray(query.filter)),
    rangeFilters: parseFilters(asArray(query.rangeFilter)),
    category: ownProps.params.name
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
)(Category);
