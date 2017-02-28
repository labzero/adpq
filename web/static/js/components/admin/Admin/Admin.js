import React, { PropTypes } from 'react';

export default class Admin extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

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
