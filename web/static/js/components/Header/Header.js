import React, { Component, PropTypes } from 'react';
import HeaderDefault from './HeaderDefault';
import HeaderAdmin from './HeaderAdmin';
import HeaderLogin from './HeaderLogin';


class Header extends Component {

  static propTypes = {
    section: PropTypes.string,
    headerMode: PropTypes.string.isRequired
  }

  render() {
    if (this.props.headerMode === 'admin') {
      return (<HeaderAdmin section={this.props.section} />);
    } else if (this.props.headerMode === 'login') {
      return (<HeaderLogin section={this.props.section} />);
    }
    return (<HeaderDefault section={this.props.section} />);
  }
}

export default Header;
