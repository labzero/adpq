import currencyFormatter from 'currency-formatter';

export default {
  axis: {
    rotated: true,
    x: {
      type: 'category',
    },
    y: {
      tick: {
        count: 6,
        format: d => currencyFormatter.format(d / 100, { code: 'USD', precision: 0 })
      }
    }
  },
  color: {
    pattern: ['#e31c3d', '#4aa564', '#02bfe7', '#f9c642', '#2e8540', '#205493', '#981b1e', '#4c2c92']
  },
  data: {
    type: 'bar'
  },
  grid: {
    x: {
      show: true
    },
    y: {
      show: true
    }
  },
  tooltip: {
    show: false
  }
};
