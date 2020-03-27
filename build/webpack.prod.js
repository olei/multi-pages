const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// dll文件输出html，如果不适用此插件html模板不能引入dll
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const webpackConfig = require('./webpack.config')
const { build } = require('../config')

const env = require('../config/' + process.env.ENV_CONFIG + '.env')
// npm run build mudule=active
console.log(process.argv, env)

const prodConfig = {
  mode: 'production',
  devtool: build.productionSourceMap ? build.devtool : false,
  plugins: [
    new CleanWebpackPlugin({
      dry: true, // 启用删除文件
      verbose: true
    }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new HtmlWebpackPlugin({
      filename: `page.html`,
      template: path.resolve(__dirname, '../src/index.html'),
      hash: false, // 为静态资源生成hash值
      inject: true,
    }),
    // new AddAssetHtmlPlugin([{
    //   filepath: path.resolve(__dirname, '../dist/dll/vendors.dll.js'),
    //   outputPath: './js', // 输出地址
    //   publicPath: './js' // 引用地址
    // }]),
    // new webpack.DllReferencePlugin({
    //   // context: path.resolve(__dirname, '..'), // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
    //   manifest: require('../dist/dll/vendors-manifest.json'), // 指定manifest.json
    //   // name: 'vendors_lib',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    // })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        commons: {
          name: 'chunk-commons',
          test: path.resolve(__dirname, '../src/components'), // 可自定义拓展你的规则
          minChunks: 3, // 最小公用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single'
  }
}

const files = fs.readdirSync(path.resolve(__dirname, '../dist/dll'))
files.forEach(file => {
  if (/\.js$/.test(file)) {
    prodConfig.plugins.push(new AddAssetHtmlPlugin([{
      filepath: path.resolve(__dirname, '../dist/dll', file),
      outputPath: './js', // 输出地址
      publicPath: './js' // 引用地址
    }]))
  }
  if (/\.json$/.test(file)) {
    prodConfig.plugins.push(new webpack.DllReferencePlugin({
      manifest: require(`../dist/dll/${file}`), // 指定manifest.json
    }))
  }
})

module.exports = merge(webpackConfig, prodConfig)
