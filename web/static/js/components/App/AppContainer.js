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
  ],
  Orders: [
    '/admin'
  ],
  Catalog: [
    '/admin/catalog'
  ]
};

const findSection = category => (
  Object.keys(sections).find(section => sections[section].indexOf(category) !== -1)
);

const findHeaderMode = (location) => {
  let mode = 'default';
  if (location.pathname === '/login') {
    mode = 'login';
  } else if (location.pathname.match(/^\/admin/)) {
    mode = 'admin';
  }
  return mode;
};

const findFooterMode = (location) => {
  let mode = 'less';
  if (location.pathname === '/login' || location.pathname.match(/^\/admin/)) {
    mode = 'login';
  } else if (location.pathname === '/') {
    mode = 'more';
  }
  return mode;
};

const mapStateToProps = (state, ownProps) => {
  const location = ownProps.location;
  let section;
  if (ownProps.params.id) {
    const item = state.catalog.items.find(it => `${it.id}` === ownProps.params.id);
    section = item && findSection(item.top_level_category);
  } else if (ownProps.params.name) {
    section = findSection(ownProps.params.name);
  } else { // try to find sections by pathname
    section = findSection(ownProps.location.pathname);
  }
  const headerMode = findHeaderMode(location);
  const footerMode = findFooterMode(location);
  return { location, section, headerMode, footerMode, ...ownProps };
};

export default connect(
  mapStateToProps
)(App);
