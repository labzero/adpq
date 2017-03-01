import React, { Component, PropTypes } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

// main layout
export default class App extends Component {

  static propTypes = {
    section: PropTypes.string,
    children: PropTypes.node.isRequired,
    footerMode: PropTypes.string.isRequired,
    headerMode: PropTypes.string.isRequired,
  }


  render() {
    const { headerMode, footerMode, section } = this.props;
    return (
      <div className="container" id="top">
        <Header headerMode={headerMode} section={section} />
        <div className="content">
          {this.props.children}
        </div>
        <Footer footerMode={footerMode} />
      </div>
    );
  }
}
