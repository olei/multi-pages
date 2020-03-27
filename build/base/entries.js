/** 
 * 入口文件控制器
*/
const path = require('path')
const glob = require('glob')

const options = {
  cwd: path.relative(__dirname, '../../src'), // 在pages目录内文件
  sync: true, // 这里不能异步，只能同步
}

// 考虑到多个页面共用HTML等资源的情况，跳过以'_'开头的目录
const globInstance = new glob.Glob('!(_)*/!(_)*', options)
// 数组，形如['index/index', 'index/login', 'alert/index']
const found = globInstance.found
const configEntry = {}

/** 
 * TODO 待开发
 * 这里可以根据不同模块单独生成入口文件, 目前是所有项目目录全部构建
*/
found.forEach(page => {
  configEntry[page] = path.resolve(__dirname, '..', `${page}/page`)
})

module.exports = { found, configEntry }
