import React, { Component, PropTypes } from 'react';

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
                <a href="/" title="Home" aria-label="Home">Tech Shop</a>
              </em>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderLogin;
