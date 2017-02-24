import { connect } from 'react-redux';
import ItemDetail from './ItemDetail'
import { fetchCatalogIfNeeded } from '../../actions'
import { applyFilters, filterByValue } from '../../lib/filters'
import find from 'lodash/fp/find'

const mapStateToProps = (state, ownProps) => {
  let item = state.catalog.items.find(item => item.id == ownProps.params.id);
  return {
    item,
    catalog: state.catalog
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
