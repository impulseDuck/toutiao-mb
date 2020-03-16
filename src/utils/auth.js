
/*
z专门处理token

 */
const USER_TOKEN = 'heima-toutiao-mobile-94'
export function setUser (user) {
  // 获取用户的token信息
  //   user应该是一个对象
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
export function getUser () {
  // 获取用户的token信息
  //   将user转化为对象
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')
  // 短路表达式，如果前面为true，后面不执行，若前面为false，后面执行
}
export function delUser () {
  // 删除用户的token信息
  localStorage.removeItem(USER_TOKEN)
}
