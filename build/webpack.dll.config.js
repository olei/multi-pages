const webpack = require('webpack')
const path = require('path')
const library = '[name]_lib'

const dllConfig = {
  mode: 'production',
  entry: {
    vendors: ['jquery']
  },
  output: {
    // 输出动态链接库dll 文件
    filename: '[name].[hash].dll.js',
    path: path.resolve(__dirname, '../dist/dll'),
    library: library
  },
  plugins: [
    // 生成动态链接库dll manifest文件
    new webpack.DllPlugin({
      context: path.resolve(__dirname, '../'),
      path: path.join(__dirname, '../dist/dll/[name].[hash].manifest.json'),
      // 这里必须与 output.library 保持一致
      name: library
    }),
    // 全局库引入
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [
      {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			}
    ]
  }
}

webpack(dllConfig, (err, stats) => {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
