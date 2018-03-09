import React, { PropTypes } from 'react';
import C3Chart from 'react-c3js';
import chartBase from '../../lib/chart_base';

const OrderChart = ({ orders }) => {
  const keys = Object.keys(orders);

  const chartProps = chartBase;
  chartProps.axis.x.categories = keys;
  chartProps.data.columns = keys.map((key, i) => [
    key,
    ...keys.map((subkey, j) => (i === j ? orders[subkey] : 0))
  ]);
  chartProps.data.groups = [keys];
  chartProps.legend = {
    show: false
  };

  return (
    <div>
      <h3>Year-to-Date: Spending by Category</h3>
      <div className="order-chart">
        <C3Chart {...chartProps} />
      </div>
    </div>
  );
};

OrderChart.propTypes = {
  orders: PropTypes.object.isRequired
};

export default OrderChart;
