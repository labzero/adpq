import React, { Component, PropTypes } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

// main layout
export default class App extends Component {

  static propTypes = {
    location: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }
  render() {
    const { location, section } = this.props;

    return (<div className="container" id="top">
      <Header section={section} />
      <div className="content">
        {this.props.children}
      </div>
      <Footer isHomepage={location.pathname === '/'} />
    </div>);
  }
}
