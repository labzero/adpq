import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Footer = ({ footerMode }) => {
  let nav;
  if (footerMode === 'more') {
    nav = (
      <div className="footer-primary usa-footer-primary-section">
        <div className="usa-grid-full footer-grid">
          <nav className="usa-footer-nav">
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <Link className="footer-primary-link usa-footer-primary-link" to="/category/Laptops">Laptops</Link>
              </li>
              <li><Link to="/category/Laptops?filter=simple_category:Ultralight">Ultralight</Link></li>
              <li><Link to="/category/Laptops?filter=simple_category:Standard">Standard</Link></li>
              <li><Link to="/category/Laptops?filter=simple_category:Performance">Performance</Link></li>
              <li><Link to="/category/Laptops?filter=simple_category:Workstation">Workstation</Link></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <Link className="footer-primary-link usa-footer-primary-link" to="/category/Desktops">Desktops</Link>
              </li>
              <li><Link to="/category/Desktops?filter=simple_category:Thin Client">Thin Client</Link></li>
              <li><Link to="/category/Desktops?filter=simple_category:Standard">Standard</Link></li>
              <li><Link to="/category/Desktops?filter=simple_category:Performance">Performance</Link></li>
              <li><Link to="/category/Desktops?filter=simple_category:Workstation">Workstation</Link></li>
              <li><Link to="/category/Desktops?filter=simple_category:All-in-One">All-in-One</Link></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <Link className="footer-primary-link usa-footer-primary-link" to="/category/Peripherals">Peripherals</Link>
              </li>
              <li><Link to="/category/Peripherals?filter=simple_category:Displays">Displays</Link></li>
              <li><Link to="/category/Peripherals?filter=simple_category:Headsets Microphones %26 Speakers">Headsets, Microphones, &amp; Speakers</Link></li>
              <li><Link to="/category/Peripherals?filter=simple_category:Keyboards %26 Mice">Keyboards &amp; Mice</Link></li>
              <li><Link to="/category/Peripherals?filter=simple_category:Cables %26 Adapters">Cables &amp; Adapters</Link></li>
              <li><Link to="/category/Peripherals?filter=simple_category:Cases %26 Bags">Cases &amp; Bags</Link></li>
              <li><Link to="/category/Peripherals?filter=simple_category:Docking Stations">Docking Stations</Link></li>
              <li><Link to="/category/Peripherals?filter=simple_category:Mounting">Mounting</Link></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <Link className="footer-primary-link usa-footer-primary-link" to="/category/Components">Components</Link>
              </li>
              <li><Link to="/category/Components?filter=simple_category:Processors">Processors</Link></li>
              <li><Link to="/category/Components?filter=simple_category:Memory">Memory</Link></li>
              <li><Link to="/category/Components?filter=simple_category:Video Cards">Video Cards</Link></li>
              <li><Link to="/category/Components?filter=simple_category:Storage Devices">Storage Devices</Link></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <Link className="footer-primary-link usa-footer-primary-link" to="/category/Software">Software</Link>
              </li>
              <li><Link to="/category/Software?filter=simple_category:Design">Design</Link></li>
              <li><Link to="/category/Software?filter=simple_category:Productivity">Productivity</Link></li>
            </ul>
            <ul className="usa-unstyled-list usa-width-one-third usa-footer-primary-content">
              <li>
                <Link className="footer-primary-link usa-footer-primary-link" to="/category/Services">Services</Link>
              </li>
              <li><Link to="/category/Services?filter=simple_category:Support">Support</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else if (footerMode === 'less') {
    nav = (
      <div className="footer-primary usa-footer-primary-section">
        <div className="usa-grid footer-grid">
          <nav className="usa-footer-nav">
            <ul className="usa-unstyled-list">
              <li className="usa-width-one-third">
                <Link className="usa-footer-primary-link" to="/category/Laptops">Laptops</Link>
              </li>
              <li className="usa-width-one-third">
                <Link className="usa-footer-primary-link" to="/category/Desktops">Desktops</Link>
              </li>
              <li className="usa-width-one-third">
                <Link className="usa-footer-primary-link" to="/category/Peripherals">Peripherals</Link>
              </li>
              <li className="usa-width-one-third">
                <Link className="usa-footer-primary-link" to="/category/Components">Components</Link>
              </li>
              <li className="usa-width-one-third">
                <Link className="usa-footer-primary-link" to="/category/Software">Software</Link>
              </li>
              <li className="usa-width-one-third">
                <Link className="usa-footer-primary-link" to="/category/Services">Services</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <footer className={`footer usa-footer ${footerMode === 'more' ? 'usa-footer-big' : 'footer-slim usa-footer-slim'}`}>
      {nav}
      <div className="footer-secondary usa-footer-secondary_section">
        <div className="usa-grid">
          <div className="footer-logo usa-footer-logo usa-width-two-thirds">
            <img className="usa-footer-slim-logo-img" src="/images/california-technology-agency.jpg" alt="" />
            <h3 className="footer-heading usa-footer-slim-logo-heading">California Department of Technology</h3>
          </div>
          <div className="footer-contact-links usa-footer-contact-links usa-width-one-third">
            <Link to="mailto:cdt-help@state.ca.gov">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  footerMode: PropTypes.string.isRequired
};

export default Footer;
