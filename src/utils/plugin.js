/*
专门存放小函数，过滤器等方法
*/
export default {
  install (Vue) {
    Vue.prototype.$znotify = (parmars) => Vue.prototype.$notify({ duration: 800, ...parmars })
    Vue.prototype.$sleep = sleep
  }
}

// 休眠函数
// time  = 500 如果你传入了time 用你的 如果说你没传 time 用 500
function sleep (time = 500) {
  // 返回一个promise
  return new Promise(function (resolve, reject) {
    // 肯定是成功执行 但是有一个延迟
    setTimeout(() => resolve(), time)
  })
}
