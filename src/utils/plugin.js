/*
专门存放小函数，过滤器等方法
*/
export default {
  install (Vue) {
    Vue.prototype.$znotify = (parmars) => Vue.prototype.$notify({ duration: 800, ...parmars })
  }
}
