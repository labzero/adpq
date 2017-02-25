import React, { Component } from "react";
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

// main layout
export default class App extends Component {
  render() {
    const { location, section } = this.props;

    return <div className="container" id="top">
      <Header section={section}  />
      <div className="content">
        {this.props.children}
      </div>
      <Footer isHomepage={location.pathname === '/'} />
    </div>;
  }
};
