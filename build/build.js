const webpack = require('webpack')
// const ora = require('ora')
const config = require('./webpack.prod')

// const spinner = ora(
//   'building for ' + process.env.env_config + ' environment...'
// )
// spinner.start()

webpack(config, function (err, stats) {
  // spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})