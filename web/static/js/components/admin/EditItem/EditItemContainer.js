import { connect } from 'react-redux';
import EditItem from './EditItem';
import { fetchAdminCatalogIfNeeded } from '../../../actions';

const mapStateToProps = (state, ownProps) => {
  const item = state.adminCatalog.items.find(it => `${it.manufacturer}-${it.sku}` === ownProps.params.manufacturer_sku);
  return {
    item,
    catalog: state.adminCatalog
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchAdminCatalogIfNeeded());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
