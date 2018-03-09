import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class HeaderLogin extends Component {
  static propTypes = {
    section: PropTypes.string
  }

  render() {
    return (
      <header className={'header header-login usa-header usa-header-extended'} role="banner">
        <div className="usa-navbar">
          <div className="logo-container">
            <div className="logo-department">
              California Department of Technology
            </div>
            <div className="logo usa-logo" id="logo">
              <em className="logo-text usa-logo-text">
                <Link to="/" title="Home" aria-label="Home">Tech Shop</Link>
              </em>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderLogin;
