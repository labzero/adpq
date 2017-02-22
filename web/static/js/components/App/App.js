import React from "react";
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

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
