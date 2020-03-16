/*
在文件中做导航守卫
*/
import router from '@/router'
import store from '@/store'
// 前置守卫
// 每当路由发生变化时，前置守卫都会执行
router.beforeEach(function (to, from, next) {
// 需要判断你的请求地址和你的token
// 如果以user为起始，需要进行判断。否则放行，直接执行next的函数，直接放行
  if (to.path.startsWith('/user') && !store.state.user.token) {
    //   需要拦截请求，让其去登录
    next({
      path: '/login', // 要跳转的地址，
      query: {
        redirectURL: to.fullPath
      }
    })
  } else {
    next()
  }
})
