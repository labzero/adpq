import React from 'react';

const Footer = () => (
  <footer className="usa-footer usa-footer-slim">
    <div className="usa-footer-primary-section">
      <div className="usa-grid-full">
        <div className="usa-footer-nav">
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
        </div>
      </div>
    </div>
    <div className="usa-footer-secondary_section">
      <div className="usa-grid">
        <div className="usa-footer-logo usa-width-one-half">
          <img className="usa-footer-slim-logo-img" />
          <h3 className="usa-footer-slim-logo-heading">California Department of Technology</h3>
        </div>
        <div className="footer-contact-links usa-footer-contact-links usa-width-one-half">
          <a href="mailto:cdt-help@state.ca.gov">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
