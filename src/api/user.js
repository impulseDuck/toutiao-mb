/*
专门处理用户相关的请求
*/
import request from '@/utils/request'
// /request相当于axios 的实例，和axios的效果相同
// 导出登录的方法
export function login (data) {
  return request({
    //   配置选项
    url: '/authorizations',
    method: 'post',
    data
  })
//   返回一个promise对象
}
// 关注
export function followUser (data) {
  return request({
    url: '/user/followings',
    method: 'post',
    data

  })
}

// 取消关注
export function unFollowUser (autid) {
  return request({
    url: `/user/followings/${autid}`,
    method: 'delete'

  })
}
// 获取用户个人资料

export function getInfo () {
  return request({
    url: '/user/profile'
  })
}
// 编辑用户头像
export function changPhoto (data) {
  return request({
    url: '/user/photo',
    method: 'patch',
    data
  })
}
// 保存用户信息
export function saveInfo (data) {
  return request({
    url: '/user/profile',
    method: 'patch',
    data: { ...data, photo: null }
  })
}
