import React, { Component, PropTypes } from 'react';

export default class Admin extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <div className="admin">
        {this.props.children}
      </div>
    );
  }
}
