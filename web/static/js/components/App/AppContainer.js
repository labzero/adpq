import { connect } from 'react-redux';
import App from './App';

const sections = {
  Hardware: [
    'Laptops',
    'Desktops',
    'Peripherals',
    'Components'
  ],
  Software: [
    'Software'
  ],
  Services: [
    'Services'
  ]
};

const findSection = category => Object.keys(sections).find(section => sections[section].indexOf(category) !== -1);

const mapStateToProps = (state, ownProps) => {
  let section;
  if (ownProps.params.id) {
    const item = state.catalog.items.find(item => item.id == ownProps.params.id);
    section = item && findSection(item.top_level_category);
  } else if (ownProps.params.name) {
    section = findSection(ownProps.params.name);
  }

  return { section, ...ownProps };
};

export default connect(
  mapStateToProps
)(App);
