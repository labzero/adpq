import { connect } from 'react-redux';
import { ItemDetail } from '../components'
import { fetchCatalogIfNeeded } from '../actions'
import { applyFilters, filterByValue } from '../lib/filters'
import find from 'lodash/fp/find'

const mapStateToProps = (state, ownProps) => {
  let manufacturer, sku
  [manufacturer, sku] = ownProps.params.id.split("|")
  return {
    manufacturer: manufacturer,
    sku: sku,
    catalog: state.catalog
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
