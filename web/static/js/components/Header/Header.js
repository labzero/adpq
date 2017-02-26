import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {

  static propTypes = {
    section: PropTypes.string.isRequired
  }

  state = {
    openSubmenu: null
  };

  toggleSubmenu = id => _event => (
    this.setState(prevState => (
      prevState.openSubmenu === id ? { openSubmenu: null } : { openSubmenu: id }
    ))
  )

  render() {
    const { openSubmenu } = this.state;

    return (
      <header className="header usa-header usa-header-extended" role="banner">
        <div className="usa-navbar">
          <button className="usa-menu-btn">Menu</button>
          <div className="logo-container">
            <div className="logo-department">
                California Department of Technology
              </div>
            <div className="logo usa-logo" id="logo">
              <em className="logo-text usa-logo-text">
                <a href="/" accessKey="1" title="Home" aria-label="Home">Tech Shop</a>
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
                <button className={`usa-accordion-button usa-nav-link ${this.props.section === 'Hardware' ? 'nav-link-current' : ''}`} aria-expanded={openSubmenu === 'side-nav-1'} aria-controls="side-nav-1" onClick={this.toggleSubmenu('side-nav-1')} >
                  <span>Hardware</span>
                </button>
                <ul id="side-nav-1" className="nav-submenu usa-nav-submenu" aria-hidden={openSubmenu !== 'side-nav-1'}>
                  <li><a href="/category/Laptops">Laptops</a>
                    <ul>
                      <li><a href="/category/Laptops?filter=simple_category:Ultralight">Ultralight</a></li>
                      <li><a href="/category/Laptops?filter=simple_category:Standard">Standard</a></li>
                      <li><a href="/category/Laptops?filter=simple_category:Performance">Performance</a></li>
                      <li><a href="/category/Laptops?filter=simple_category:Workstation">Workstation</a></li>
                    </ul>
                  </li>
                  <li><a href="/category/Desktops">Desktops</a>
                    <ul>
                      <li><a href="/category/Desktops?filter=simple_category:Thin Client">Thin Client</a></li>
                      <li><a href="/category/Desktops?filter=simple_category:Standard">Standard</a></li>
                      <li><a href="/category/Desktops?filter=simple_category:Performance">Performance</a></li>
                      <li><a href="/category/Desktops?filter=simple_category:Workstation">Workstation</a></li>
                      <li><a href="/category/Desktops?filter=simple_category:All-in-One">All-in-One</a></li>
                    </ul>
                  </li>
                  <li><a href="/category/Peripherals">Peripherals</a>
                    <ul>
                      <li><a href="/category/Peripherals?filter=simple_category:Displays">Displays</a></li>
                      <li><a href="/category/Peripherals?filter=simple_category:Headsets Microphones %26 Speakers">Headsets, Microphones, &amp; Speakers</a></li>
                      <li><a href="/category/Peripherals?filter=simple_category:Keyboards %26 Mice">Keyboards &amp; Mice</a></li>
                      <li><a href="/category/Peripherals?filter=simple_category:Cables %26 Adapters">Cables &amp; Adapters</a></li>
                      <li><a href="/category/Peripherals?filter=simple_category:Cases %26 Bags">Cases &amp; Bags</a></li>
                      <li><a href="/category/Peripherals?filter=simple_category:Docking Stations">Docking Stations</a></li>
                      <li><a href="/category/Peripherals?filter=simple_category:Mounting">Mounting</a></li>
                    </ul>
                  </li>
                  <li><a href="/category/Components">Components</a>
                    <ul>
                      <li><a href="/category/Components?filter=simple_category:Processors">Processors</a></li>
                      <li><a href="/category/Components?filter=simple_category:Memory">Memory</a></li>
                      <li><a href="/category/Components?filter=simple_category:Video Cards">Video Cards</a></li>
                      <li><a href="/category/Components?filter=simple_category:Storage Devices">Storage Devices</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <button className={`usa-accordion-button usa-nav-link ${this.props.section === 'Software' ? 'nav-link-current' : ''}`} aria-expanded={openSubmenu === 'side-nav-2'} aria-controls="side-nav-2" onClick={this.toggleSubmenu('side-nav-2')}>
                  <span>Software</span>
                </button>
                <ul id="side-nav-2" className="nav-submenu usa-nav-submenu" aria-hidden={openSubmenu !== 'side-nav-2'}>
                  <li>
                    <a href="/category/Software?filter=simple_category:Design">Design</a>
                  </li>
                  <li>
                    <a href="/category/Software?filter=simple_category:Productivity">Productivity</a>
                  </li>
                </ul>
              </li>
              <li>
                <button className={`usa-accordion-button usa-nav-link ${this.props.section === 'Services' ? 'nav-link-current' : ''}`} aria-expanded={openSubmenu === 'side-nav-3'} aria-controls="side-nav-3" onClick={this.toggleSubmenu('side-nav-3')}>
                  <span>Services</span>
                </button>
                <ul id="side-nav-3" className="nav-submenu usa-nav-submenu" aria-hidden={openSubmenu !== 'side-nav-3'}>
                  <li>
                    <a href="/category/Services?filter=simple_category:Support">Support</a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="usa-nav-secondary">
              <ul className="nav-secondary-links usa-unstyled-list usa-nav-secondary-links">
                <li>
                  <a href="#" className="header-cart-button"><span>Cart</span>&nbsp;<span className="count" /></a>
                </li>
                <li>
                  <a href="/account">Account</a>
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

export default Header;
