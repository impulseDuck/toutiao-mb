// 专门处理频道的请求
import request from '@/utils/request'
// 引入store
import store from '@/store'
/*
获取我的频道
**/
const CACHE_CHANNEL_V = 'v'
const CACHE_CHANNEL_T = 't'

export function getMyChannels () {
  // 返回一个Promise  axios默认就是get类型
  // return request({
  //   url: '/user/channels'
  // })
  // 本地化，改造接口，因为python用户接口有问题
  return new Promise(function (resolve, reject) {
    // 如何区游客还是登陆用户，token
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const str = localStorage.getItem(key)
    if (str) {
      resolve({ channels: JSON.parse(str) })
    } else {
      request({
        url: '/user/channels'
      }).then(result => {
        localStorage.setItem(key, JSON.stringify(result.channels))
        resolve(result)
      })
    }
  })
}
// 获取全部频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
// 删除频道
export function delChannel (id) {
  return new Promise(function (resolve, reject) {
    // 有id可以直接从缓存中删除对应的id
    // 删除频道时，无论何时都会有数据
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const channels = JSON.parse(localStorage.getItem(key))
    // 两种方式
    // channels = channels.filter(item => item.id !== id)
    // localStorage.setItem(key, JSON.stringify(channels))
    const index = channels.findIndex(item => item.id === id)// 找到对应频道的索引
    if (index > -1) {
      channels.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(channels))
      // 如果执行成功，应该直接resolve
      resolve() // resolve可以传参或者不传参
    } else {
      // 如果没有找到对应的下标
      reject(new Error('没有找到对应的频道'))
    }
  })
}
// 添加频道的方法
export function addChannel (channel) {
  return new Promise(function (resolve, reject) {
    // 有id可以直接从缓存中删除对应的id
    // 删除频道时，无论何时都会有数据
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const channels = JSON.parse(localStorage.getItem(key))
    channels.push(channel)
    localStorage.setItem(key, JSON.stringify(channels))
    // 如果执行成功，应该直接resolve
    resolve() // resolve可以传参或者不传参
  }
  )
}
