import React from 'react';
import { Link } from 'react-router';

const CreateOrderSuccess = () => (
  <div>
    <h3 className="usa-alert-heading">We have received your order.</h3>
    <p className="usa-alert-text">
      Your order request has been sent to your purchasing manager for approval.
      <br />
      You can check the status of your order by visiting your <Link to="/account">Account</Link> page.
    </p>
  </div>
);

export default CreateOrderSuccess;
