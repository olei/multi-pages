const path = require('path')

module.exports = {
  build: {
    productionSourceMap: false,
    devtool: '#source-map'
  },
  dev: {
    devtool: 'cheap-module-eval-source-map'
  }
}