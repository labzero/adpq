import currencyFormatter from 'currency-formatter';

export default {
  axis: {
    rotated: true,
    x: {
      type: 'category',
    },
    y: {
      tick: {
        format: d => currencyFormatter.format(d / 100, { code: 'USD', precision: 0 })
      }
    }
  },
  color: {
    pattern: ['#e31c3d', '#4aa564', '#02bfe7', '#f9c642']
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
