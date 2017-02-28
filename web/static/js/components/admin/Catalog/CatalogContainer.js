import { connect } from 'react-redux';
import { fetchAdminCatalogIfNeeded } from '../../../actions';
import Catalog from './Catalog';
import { parseSorts } from '../../lib/query';

const mapStateToProps = (state, ownProps) => {
  const query = ownProps.location.query;
  return {
    catalog: state.adminCatalog,
    sorts: parseSorts(asArray(query.sort))
  };
};

const asArray = val => (val === undefined ? [] : flatten([val]));

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchAdminCatalogIfNeeded());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);
