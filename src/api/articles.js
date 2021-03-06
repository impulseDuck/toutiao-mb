import request from '@/utils/request'
// 获取频道新闻推荐
export function getArticles (params) {
  // 需要传入时间戳，channel_id

  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
// 不敢兴趣 的文章接口

export function dislikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
// 举报文章接口
export function reportArticle (data) {
  return request({
    url: '/article/reports',
    method: 'post',
    data
  })
}
// 获取联想搜索建议

export function getSuggestion (params) {
  return request({
    url: '/suggestion',
    params
  })
}
// 搜索方法
export function searchArticle (params) {
  return request({
    url: '/search',
    params
  })
}
// 获取文章详情
export function getArticlesDetails (artId) {
  return request({
    url: `/articles/${artId}`
  })
}
// 获取评论的方法
export function getComments (params) {
  return request({
    url: '/comments',
    params// type(是文章的的回复还是回复的回复)  source(来源id)  offset(偏移量 分页依据) 查第二页的数据 传第一页的最后一个id 查第三页的数据  传第二页最后一个id ....
  })
}
// 回复文章评论，回复文章评论的评论
export function commonetOrReply (data) {
  return request({
    url: '/comments',
    method: 'post',
    data
  })
}
