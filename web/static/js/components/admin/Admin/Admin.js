import React, { Component } from 'react';

export default class Admin extends Component {
  render() {
    return (
      <div className="usa-grid admin">
        <div className="usa-section">
          <h2>Admin</h2>
          <p className="subheading">Admin...</p>
          {this.props.children}
        </div>
      </div>
    );
  }
}
