import React from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// main layout
export default class App extends React.Component {
  render() {
    return <div className="container">
      <Header />
      <div className="usa-grid usa-section">
        {this.props.children}
      </div>
      <Footer />
    </div>;
  }
};
