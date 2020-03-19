/*
request.js 请求管理工具
create by gooly 2020/03/16
*/
import axios from 'axios'
import JSONBig from 'json-bigint' // 引入大数字插件
import store from '@/store'// 引入vuex中的store实例对象 相当于组件中的this.$store
import router from '@/router' // 引入router对象
// axios.defaults 是对你们原有的默认值进行修改

// axios create() //相当于new 了一个新的axios
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 基础的请求地址
  //  后台响应回来。但是还没进入到axios
  transformResponse: [function (data) {
    // data就是后端响应回来的字符串
    return data ? JSONBig.parse(data) : {}
  }]
}) // 创建一个axios的新实例，
instance.interceptors.request.use(function (config) {
  // 成功的时候处理
//   读取配置信息，给配置信息注入token
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}` // 将token通体注入到header中
  }
  //   简写
  //   config.headers.Authorization && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config// 返回配置
}, function (error) {
  return Promise.reject(error) // 直接进入到axios的catch中
})
// 用响应拦截器处理返回结果的数据，将多嵌套的结构解构出来
instance.interceptors.response.use(function (response) {
  // 几乎所有的返回数据都有date
//   axios默认包了一层data
  try {
    return response.data.data // 如果成功则返回2层
  } catch (error) {
    return response.data // 如果失败则返回一层
  }
}, async function (error) {
  // err中三个参数 config ：出现错误请求的配置文件
  //   request ：请求对象 response：响应对象 （state）状态码
  if (error.response && error.response.status === 401) {
    const path = {
      path: '/login',
      // 路由传参的两种写法 动态路由，query传参
      query: {
        // 需要传递的query参数
        redirectURL: router.currentRoute.fullPath // 需要跳回来的地址
      }
    }
    if (store.state.user.refresh_token) {
      try {
        const result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: { Authorization: `Bearer ${store.state.user.refresh_token}` }
        })
        //   result.data.data.token // 新token
        store.commit('updateUser', {
          //   传入载荷的数据
          user: {
            token: result.data.data.token, // 最新的token
            refresh_token: store.state.user.refresh_token // 还是原来的refresh_token
          }
        }) // 提交mutations 更新vuex数据
        return instance(error.config)// 相当于执行前出现401错误的请求，解决之前的问题
      } catch (error) {
        // 尝试去续命，但还是失败
        store.commit('delUser')
        router.push(path)
      }
    } else {
      // 如果没有refresh_token直接跳到登录
    //   router.push('/login')// 直接跳转到登录
      //   在A页面发请求，但是结果失效了，没有token，也没有refresn—_token ，会回到登录页面，但你有希望登录后回到失效的页面
      // 需要在跳到登录页的过程中，把当前页面你的地址传给登录页面，登录页面判断登录成功之后，先判断有无需要跳转的地址，若有，回来
      //   router.currentRoute.fullPath()
      store.commit('delUser')
      router.push(path)
    }
  }
  return Promise.reject(error)// 返回执行链的失败
})
export default instance
