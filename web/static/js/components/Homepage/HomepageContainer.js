import { connect } from 'react-redux';
import { fetchCatalogIfNeeded } from '../../actions';
import Homepage from './Homepage';

const mapStateToProps = (state, _ownProps) => {
  const item1 = state.catalog.items.find(item => (item.manufacturer === 'HP' && item.sku === 'W8E26UP'));
  const item2 = state.catalog.items.find(item => (item.manufacturer === 'DELL' && item.sku === '210-AFXL'));
  const item3 = state.catalog.items.find(item => (item.manufacturer === 'HP' && item.sku === 'X1U91UP'));
  const item4 = state.catalog.items.find(item => (item.manufacturer === 'DELL' && item.sku === '210-AFXK'));
  const item5 = state.catalog.items.find(item => (item.manufacturer === 'DELL' && item.sku === '210-AFTT'));
  const item6 = state.catalog.items.find(item => (item.manufacturer === 'HP' && item.sku === 'F5A53AA#ABA'));

  const recommendations = [];

  recommendations.push({
    key: 1,
    title: 'Everyday Computing',
    subtitle: 'Good all-around systems for most business tasks.',
    items: [item1, item2]
  });

  recommendations.push({
    key: 2,
    title: 'Powerhouse',
    subtitle: 'Performance systems that can handle intensive tasks.',
    items: [item3, item4]
  });

  recommendations.push({
    key: 3,
    title: 'Great for Travel',
    subtitle: 'Lightweight, secure, premium laptop with extended warranty.',
    items: [item5]
  });

  recommendations.push({
    key: 4,
    title: 'Thin Client',
    subtitle: 'An integrated solution combining security and easy management.',
    items: [item6]
  });

  return {
    catalog: state.catalog,
    recommendations
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCatalog() {
    dispatch(fetchCatalogIfNeeded());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
