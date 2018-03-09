import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class HeaderDefault extends Component {
  static propTypes = {
    section: PropTypes.string,
    cartCount: PropTypes.number
  };

  render() {
    const { section, cartCount } = this.props;
    return (
      <header className={'header header-default usa-header usa-header-extended'} role="banner">
        <div className="usa-navbar">
          <button className="menu-btn  usa-menu-btn">Menu</button>
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
        <nav role="navigation" className="nav usa-nav">
          <div className="usa-nav-inner">
            <button className="usa-nav-close">
              <img src="/images/close.svg" alt="close" />
            </button>
            <ul className="nav-primary usa-nav-primary usa-accordion">
              <li>
                <button className={`usa-accordion-button usa-nav-link ${section === 'Hardware' ? 'nav-link-current' : ''}`} aria-controls="side-nav-1">
                  <span>Hardware</span>
                </button>
                <ul id="side-nav-1" className="nav-submenu usa-nav-submenu usa-unstyled-list">
                  <li><Link to="/category/Laptops">Laptops</Link>
                    <ul>
                      <li><Link to="/category/Laptops?filter=simple_category:Ultralight">Ultralight</Link></li>
                      <li><Link to="/category/Laptops?filter=simple_category:Standard">Standard</Link></li>
                      <li><Link to="/category/Laptops?filter=simple_category:Performance">Performance</Link></li>
                      <li><Link to="/category/Laptops?filter=simple_category:Workstation">Workstation</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/category/Desktops">Desktops</Link>
                    <ul>
                      <li><Link to="/category/Desktops?filter=simple_category:Thin Client">Thin Client</Link></li>
                      <li><Link to="/category/Desktops?filter=simple_category:Standard">Standard</Link></li>
                      <li><Link to="/category/Desktops?filter=simple_category:Performance">Performance</Link></li>
                      <li><Link to="/category/Desktops?filter=simple_category:Workstation">Workstation</Link></li>
                      <li><Link to="/category/Desktops?filter=simple_category:All-in-One">All-in-One</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/category/Peripherals">Peripherals</Link>
                    <ul>
                      <li><Link to="/category/Peripherals?filter=simple_category:Displays">Displays</Link></li>
                      <li><Link to="/category/Peripherals?filter=simple_category:Headsets Microphones %26 Speakers">Headsets, Microphones, &amp; Speakers</Link></li>
                      <li><Link to="/category/Peripherals?filter=simple_category:Keyboards %26 Mice">Keyboards &amp; Mice</Link></li>
                      <li><Link to="/category/Peripherals?filter=simple_category:Cables %26 Adapters">Cables &amp; Adapters</Link></li>
                      <li><Link to="/category/Peripherals?filter=simple_category:Cases %26 Bags">Cases &amp; Bags</Link></li>
                      <li><Link to="/category/Peripherals?filter=simple_category:Docking Stations">Docking Stations</Link></li>
                      <li><Link to="/category/Peripherals?filter=simple_category:Mounting">Mounting</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/category/Components">Components</Link>
                    <ul>
                      <li><Link to="/category/Components?filter=simple_category:Processors">Processors</Link></li>
                      <li><Link to="/category/Components?filter=simple_category:Memory">Memory</Link></li>
                      <li><Link to="/category/Components?filter=simple_category:Video Cards">Video Cards</Link></li>
                      <li><Link to="/category/Components?filter=simple_category:Storage Devices">Storage Devices</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <button className={`usa-accordion-button usa-nav-link ${section === 'Software' ? 'nav-link-current' : ''}`} aria-controls="side-nav-2">
                  <span>Software</span>
                </button>
                <ul id="side-nav-2" className="nav-submenu usa-nav-submenu">
                  <li>
                    <Link to="/category/Software?filter=simple_category:Design">Design</Link>
                  </li>
                  <li>
                    <Link to="/category/Software?filter=simple_category:Productivity">Productivity</Link>
                  </li>
                </ul>
              </li>
              <li>
                <button className={`usa-accordion-button usa-nav-link ${section === 'Services' ? 'nav-link-current' : ''}`} aria-controls="side-nav-3">
                  <span>Services</span>
                </button>
                <ul id="side-nav-3" className="nav-submenu usa-nav-submenu">
                  <li>
                    <Link to="/category/Services?filter=simple_category:Support">Support</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="usa-nav-secondary">
              <ul className="nav-secondary-links usa-unstyled-list usa-nav-secondary-links">
                <li>
                  <Link to="/cart" className="header-cart-button" aria-label="Cart">
                    <span>Cart</span> &nbsp;
                    {cartCount !== 0 ? (
                      <span
                        className="count usa-label"
                        title={`${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart`}
                      >
                        {cartCount}</span>
                      ) : ''}
                  </Link>
                </li>
                <li>
                  <Link to="/account">Account</Link>
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
