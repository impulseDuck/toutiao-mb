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
