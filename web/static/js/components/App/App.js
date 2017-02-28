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
  render() {
    const { location, section } = this.props;

    return (
      <div className="container" id="top">
        <Header isAuthorized={location.pathname !== '/login'} section={section} />
        <div className="content">
          {this.props.children}
        </div>
        <Footer isAuthorized={location.pathname !== '/login'} isHomepage={location.pathname === '/'} />
      </div>
    );
  }
}
