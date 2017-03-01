import React, { PropTypes } from 'react';

const Footer = ({ isAuthorized, isHomepage }) => {
  let nav;
  if (isHomepage && isAuthorized) {
    nav = (
      <div className="footer-primary usa-footer-primary-section">
        <div className="usa-grid-full footer-grid">
          <nav className="usa-footer-nav">
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <a className="footer-primary-link usa-footer-primary-link" href="/category/Laptops">Laptops</a>
              </li>
              <li><a href="/category/Laptops?filter=simple_category:Ultralight">Ultralight</a></li>
              <li><a href="/category/Laptops?filter=simple_category:Standard">Standard</a></li>
              <li><a href="/category/Laptops?filter=simple_category:Performance">Performance</a></li>
              <li><a href="/category/Laptops?filter=simple_category:Workstation">Workstation</a></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <a className="footer-primary-link usa-footer-primary-link" href="/category/Desktops">Desktops</a>
              </li>
              <li><a href="/category/Desktops?filter=simple_category:Thin Client">Thin Client</a></li>
              <li><a href="/category/Desktops?filter=simple_category:Standard">Standard</a></li>
              <li><a href="/category/Desktops?filter=simple_category:Performance">Performance</a></li>
              <li><a href="/category/Desktops?filter=simple_category:Workstation">Workstation</a></li>
              <li><a href="/category/Desktops?filter=simple_category:All-in-One">All-in-One</a></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <a className="footer-primary-link usa-footer-primary-link" href="/category/Peripherals">Peripherals</a>
              </li>
              <li><a href="/category/Peripherals?filter=simple_category:Displays">Displays</a></li>
              <li><a href="/category/Peripherals?filter=simple_category:Headsets Microphones %26 Speakers">Headsets, Microphones, &amp; Speakers</a></li>
              <li><a href="/category/Peripherals?filter=simple_category:Keyboards %26 Mice">Keyboards &amp; Mice</a></li>
              <li><a href="/category/Peripherals?filter=simple_category:Cables %26 Adapters">Cables &amp; Adapters</a></li>
              <li><a href="/category/Peripherals?filter=simple_category:Cases %26 Bags">Cases &amp; Bags</a></li>
              <li><a href="/category/Peripherals?filter=simple_category:Docking Stations">Docking Stations</a></li>
              <li><a href="/category/Peripherals?filter=simple_category:Mounting">Mounting</a></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <a className="footer-primary-link usa-footer-primary-link" href="/category/Components">Components</a>
              </li>
              <li><a href="/category/Components?filter=simple_category:Processors">Processors</a></li>
              <li><a href="/category/Components?filter=simple_category:Memory">Memory</a></li>
              <li><a href="/category/Components?filter=simple_category:Video Cards">Video Cards</a></li>
              <li><a href="/category/Components?filter=simple_category:Storage Devices">Storage Devices</a></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <a className="footer-primary-link usa-footer-primary-link" href="/category/Software">Software</a>
              </li>
              <li><a href="/category/Software?filter=simple_category:Design">Design</a></li>
              <li><a href="/category/Software?filter=simple_category:Productivity">Productivity</a></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <a className="footer-primary-link usa-footer-primary-link" href="/category/Services">Services</a>
              </li>
              <li><a href="/category/Services?filter=simple_category:Support">Support</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else if (isAuthorized) {
    nav = (
      <div className="footer-primary usa-footer-primary-section">
        <div className="usa-grid footer-grid">
          <nav className="usa-footer-nav">
            <ul className="usa-unstyled-list">
              <li className="usa-width-one-third">
                <a className="usa-footer-primary-link" href="/category/Laptops">Laptops</a>
              </li>
              <li className="usa-width-one-third">
                <a className="usa-footer-primary-link" href="/category/Desktops">Desktops</a>
              </li>
              <li className="usa-width-one-third">
                <a className="usa-footer-primary-link" href="/category/Peripherals">Peripherals</a>
              </li>
              <li className="usa-width-one-third">
                <a className="usa-footer-primary-link" href="/category/Components">Components</a>
              </li>
              <li className="usa-width-one-third">
                <a className="usa-footer-primary-link" href="/category/Software">Software</a>
              </li>
              <li className="usa-width-one-third">
                <a className="usa-footer-primary-link" href="/category/Services">Services</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <footer className={`footer usa-footer ${isHomepage ? 'usa-footer-big' : 'footer-slim usa-footer-slim'}`}>
      {nav}
      <div className="footer-secondary usa-footer-secondary_section">
        <div className="usa-grid">
          <div className="footer-logo usa-footer-logo usa-width-two-thirds">
            <img className="usa-footer-slim-logo-img" src="/images/california-technology-agency.jpg" alt="" />
            <h3 className="footer-heading usa-footer-slim-logo-heading">California Department of Technology</h3>
          </div>
          <div className="footer-contact-links usa-footer-contact-links usa-width-one-third">
            <a href="mailto:cdt-help@state.ca.gov">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  isHomepage: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

export default Footer;
