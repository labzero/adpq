import { connect } from 'react-redux';
import { fetchAdminCatalogIfNeeded } from '../../../actions';
import Catalog from './Catalog';

const mapStateToProps = (state, _ownProps) => (
  { catalog: state.adminCatalog }
);

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchAdminCatalogIfNeeded());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);
