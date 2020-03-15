// 此文件专门处理postcss插件
module.exports = {
  // 所有的postcss的插件
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 基准值 以iphone6为例 iphone6的10分之一
      propList: ['*']// 所有文件都转化rem
    }
  }
}
