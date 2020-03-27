const path = require('path')
const webpack = require('webpack')
const { resolve } = require('./utils/index')
const { configEntry } = require('./base/entries')

console.log(configEntry)

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
          loader: 'babel-loader?cacheDirectory', // 开启转换结果缓存
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
