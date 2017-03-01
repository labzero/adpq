import React, { Component, PropTypes } from 'react';

export default class Account extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <div className="usa-grid account">
        <div className="usa-section">
          <h2>Account Orders</h2>
          {this.props.children}
        </div>
      </div>
    );
  }
}