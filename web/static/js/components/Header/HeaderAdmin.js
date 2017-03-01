import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class HeaderAdmin extends Component {

  static propTypes = {
    section: PropTypes.string,

  }

  render() {
    return (
      <header className={'header header-admin usa-header usa-header-extended'} role="banner">
        <div className="usa-navbar">
          <button className="menu-btn  usa-menu-btn">Menu</button>
          <div className="logo-container">
            <div className="logo-department">
              California Department of Technology
            </div>
            <div className="logo usa-logo" id="logo">
              <em className="logo-text usa-logo-text">
                <a href="/admin" title="Admin" aria-label="Home">Tech Shop Admin</a>
              </em>
            </div>
          </div>
        </div>
        <nav role="navigation" className="nav usa-nav">
          <div className="usa-nav-inner">
            <button className="usa-nav-close">
              <img src="/images/close.svg" alt="close" />
            </button>
            <ul className="nav-primary usa-nav-primary usa-accordion">
              <li>
                <Link to={'orders'} className={`usa-nav-link ${this.props.section === 'Orders' ? 'nav-link-current' : ''}`}>
                  <span>Orders</span>
                </Link>
              </li>
              <li>
                <Link to={'catalog'} className={`usa-nav-link ${this.props.section === 'Catalog' ? 'nav-link-current' : ''}`}>
                  <span>Catalog</span>
                </Link>
              </li>
            </ul>
            <div className="usa-nav-secondary">
              <ul className="nav-secondary-links usa-unstyled-list usa-nav-secondary-links">
                <li>
                  <a href="/">Tech Shop Site</a>
                </li>
                <li>
                  <Link to={'logout'}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default HeaderAdmin;
