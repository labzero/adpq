import React, { Component } from "react";
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

// main layout
export default class App extends Component {
  render() {
    const { location } = this.props;

    return <div className="container" id="top">
      <Header />
      <div className="content">
        {this.props.children}
      </div>
      <Footer isHomepage={location.pathname === '/'} />
    </div>;
  }
};
