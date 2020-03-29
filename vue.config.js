/* 需要导出一个对象 */
module.exports = {
  // 需要更改less中的变量配置
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          blue: '#3296fa'
        }
      }
    }
  },
  configureWebpack: (config) => {
    // config参数，就是vue-cli项目中所有的webpack配置
    // 首先判断当前的打包环境是开发还是生产环境？
    if (process.env.NODE_ENV === 'production') {
      // 只需要在生产环境过程中把所有的console删除掉，在打包，这里删除不是源代码console，而是删除打包的console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  publicPath: './' // 打包后的引用地址
}
