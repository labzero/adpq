import React, { PropTypes } from 'react';
import C3Chart from 'react-c3js';
import chartBase from '../../../lib/chart_base';

const OrderChart = ({ orders }) => {
  const departments = Object.keys(orders);
  const seen = {};
  const categories = departments
  .reduce((acc, department) => acc.concat(Object.keys(orders[department])), [])
  .filter(category => !(category in seen) && (seen[category] = 1));

  const chartProps = chartBase;
  chartProps.axis.x.categories = departments;
  chartProps.data.columns = categories.map(category => [
    category,
    ...departments.map(department => orders[department][category] || 0)
  ]);
  chartProps.data.groups = [categories];

  return (
    <div>
      <h3>Year-to-Date: Spending by Department</h3>
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
