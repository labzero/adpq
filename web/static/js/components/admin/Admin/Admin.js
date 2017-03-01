import React, { Component, PropTypes } from 'react';

export default class Admin extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <div className="usa-grid admin">
        <div className="usa-section">
          <h2>Orders Report</h2>
          {this.props.children}
        </div>
      </div>
    );
  }
}
