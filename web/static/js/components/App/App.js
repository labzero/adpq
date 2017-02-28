import React, { Component, PropTypes } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

// main layout
export default class App extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    section: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  headerNavigationMode = (location) => {
    let mode = 'default';
    if (location.pathname === '/login') {
      mode = 'none';
    } else if (location.pathname === '/admin') {
      mode = 'admin';
    }
    return mode;
  }

  footerNavigationMode = (location) => {
    let mode = 'less';
    if (location.pathname === '/login' || location.pathname === '/admin') {
      mode = 'none';
    } else if (location.pathname === '/') {
      mode = 'more';
    }
    return mode;
  }

  render() {
    const { location, section } = this.props;

    return (
      <div className="container" id="top">
        <Header navigationMode={this.headerNavigationMode(location)} section={section} />
        <div className="content">
          {this.props.children}
        </div>
        <Footer navigationMode={this.footerNavigationMode(location)} />
      </div>
    );
  }
}
