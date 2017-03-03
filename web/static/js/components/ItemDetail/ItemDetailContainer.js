import { connect } from 'react-redux';
import ItemDetail from './ItemDetail';
import { fetchCatalogIfNeeded } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const item = state.catalog.items.find(it => `${it.manufacturer}-${it.sku}` === ownProps.params.manufacturer_sku);
  return {
    item,
    catalog: state.catalog
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
