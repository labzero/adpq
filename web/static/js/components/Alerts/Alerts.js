import React, { PropTypes } from 'react';
import * as ActionTypes from '../../constants/ActionTypes';
import CreateOrderSuccess from './AlertContents/CreateOrderSuccess';
import LoginError from './AlertContents/LoginError';

const contentMap = {
  [ActionTypes.CREATE_ORDER_SUCCESS]: CreateOrderSuccess,
  [ActionTypes.LOGIN_ERROR]: LoginError
};

const renderAlert = (alert) => {
  const Content = contentMap[alert.type];
  return (
    <div key={alert.type} className={`alerts-alert usa-alert ${alert.error ? 'usa-alert-info' : 'usa-alert-success'}`} role={alert.error ? 'alert' : undefined}>
      <div className="usa-alert-body">
        <Content alert={alert} />
      </div>
    </div>
  );
};

const Alerts = ({ alerts }) => (
  <div className="alerts">
    {alerts.map(renderAlert)}
  </div>
);

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

export default Alerts;
