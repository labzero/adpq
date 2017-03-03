import { connect } from 'react-redux';
import { formatMoney } from 'accounting';
import EditItem from './EditItem';
import { fetchAdminCatalogIfNeeded } from '../../../actions';

const mapStateToProps = (state, ownProps) => {
  const rawItem = state.adminCatalog.items.find(it => `${it.manufacturer}-${it.sku}` === ownProps.params.manufacturer_sku);
  const item = {
    ...rawItem,
    list_price: rawItem ? formatMoney(rawItem.list_price / 100, '', 2, '', '.') : null,
    contract_unit_price: rawItem ? formatMoney(rawItem.contract_unit_price / 100, '', 2, '', '.') : null,
  };
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
