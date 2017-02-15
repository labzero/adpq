import React from "react";

// main layout
export default class App extends React.Component {
  render() {
    return <div className="container">
      <header className="header">
        Header
      </header>
      {this.props.children}
    </div>;
  }
};
