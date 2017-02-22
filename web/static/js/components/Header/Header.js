import React from 'react';

const Header = () => (
  <header className="header usa-header usa-header-extended" role="banner">
    <div className="usa-navbar">
      <button className="usa-menu-btn">Menu</button>
      <div className="usa-logo" id="logo">
        <em className="usa-logo-text">
          <a href="/" accessKey="1" title="Home" aria-label="Home">CDT Tech Shop</a>
        </em>
      </div>
    </div>
    <nav role="navigation" className="nav usa-nav">
      <div className="usa-nav-inner">
        <button className="usa-nav-close">
          <img src="/images/close.svg" alt="close" />
        </button>
        <ul className="nav-primary usa-nav-primary usa-accordion">
          <li>
            <button className="usa-accordion-button usa-nav-link" aria-expanded="false" aria-controls="side-nav-1">
              <span>Hardware</span>
            </button>
            <ul id="side-nav-1" className="nav-submenu usa-nav-submenu">
              <li><a href="#">Laptops</a>
                <ul>
                  <li><a href="#">Page title 1</a></li>
                  <li><a href="#">Page title 2</a></li>
                </ul>
              </li>
              <li><a href="#">Desktops</a>
                <ul>
                  <li><a href="#">Page title 1</a></li>
                  <li><a href="#">Page title 2</a></li>
                </ul>
              </li>
              <li><a href="#">Peripherals</a>
                <ul>
                  <li><a href="#">Page title 1</a></li>
                  <li><a href="#">Page title 2</a></li>
                </ul>
              </li>
              <li><a href="#">Components</a>
                <ul>
                  <li><a href="#">Page title 1</a></li>
                  <li><a href="#">Page title 2</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <button className="usa-accordion-button usa-nav-link" aria-expanded="false" aria-controls="side-nav-2">
              <span>Software</span>
            </button>
            <ul id="side-nav-2" className="nav-submenu usa-nav-submenu">
              <li>
                <a href="#">Page title</a>
              </li>
              <li>
                <a href="#">Page title</a>
              </li>
              <li>
                <a href="#">Page title</a>
              </li>
            </ul>
          </li>
          <li>
            <button className="usa-accordion-button usa-nav-link" aria-expanded="false" aria-controls="side-nav-3">
              <span>Services</span>
            </button>
            <ul id="side-nav-3" className="nav-submenu usa-nav-submenu">
              <li>
                <a href="#">Page title</a>
              </li>
              <li>
                <a href="#">Page title</a>
              </li>
              <li>
                <a href="#">Page title</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="usa-nav-secondary">
          <form className="usa-search usa-search-small js-search-form">
            <div role="search">
              <label className="usa-sr-only" htmlFor="search-field-small">Search small</label>
              <input id="search-field-small" type="search" name="search"/>
              <button type="submit">
                <span className="usa-sr-only">Search</span>
              </button>
            </div>
          </form>
          <ul className="usa-unstyled-list usa-nav-secondary-links">
            <li className="js-search-button-container">
              <button className="usa-header-search-button js-search-button">Search</button>
            </li>
            <li>
              <a href="#" className="header-cart-button">Cart</a>
            </li>
            <li>
              <a href="#">Account</a>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
