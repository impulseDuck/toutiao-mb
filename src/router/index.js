import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Layout = () => import('@/views/layout')
const home = () => import('@/views/home')
const question = () => import('@/views/question')
const user = () => import('@/views/user')
const video = () => import('@/views/video')
// 一级路由
const chat = () => import('@/views/user/chat')
const login = () => import('@/views/login')
const profile = () => import('@/views/user/profile')
const search = () => import('@/views/search')
const searchResult = () => import('@/views/search/result')
const article = () => import('@/views/article')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '', // 如果什么都不写，代表默认的2级组件
        component: home,
        // 如果一级路由存在默认的二级路由，应该写在二级路由上
        meta: { isAlive: true }
      },
      {
        path: '/question',
        component: question // 问答组件
      },
      {
        path: '/user',
        component: user // 用户组件
      },
      {
        path: '/video',
        component: video // 视频组件
      }
    ]
  }, {
    path: '/user/chat',
    component: chat // 聊天组件
  },
  {
    path: '/login',
    component: login // 登录组件
  },
  {
    path: '/user/profile',
    component: profile // 编辑资料组件
  },
  {
    path: '/search',
    component: search // 搜索组件
  },
  {
    path: '/search/result',
    component: searchResult // 搜索结果组件
  },
  {
    path: '/article',
    component: article // 文章组件
  }

]

const router = new VueRouter({
  routes
})

export default router
