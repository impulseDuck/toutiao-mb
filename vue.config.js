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
  }

}
