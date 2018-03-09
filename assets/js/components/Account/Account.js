import React, { Component, PropTypes } from 'react';

export default class Account extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <div className="usa-grid account">
        {this.props.children}
      </div>
    );
  }
}
