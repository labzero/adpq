import { connect } from 'react-redux';
import ItemDetail from './ItemDetail'
import { fetchCatalogIfNeeded } from '../../actions'
import find from 'lodash/fp/find'

const mapStateToProps = (state, ownProps) => {
  return {
    item: find({'id': parseInt(ownProps.params.id)}, state.catalog.items),
    catalog: state.catalog
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
