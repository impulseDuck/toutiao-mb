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