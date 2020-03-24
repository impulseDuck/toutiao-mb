<template>
  <div class="container">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate|relTime}}</p>
        </div>
        <van-button
        :loading="followLoading"
          @click="follow"
          round
          size="small"
          type="info"
        >{{article.is_followed ? '已关注' : '+ 关注'}}</van-button>
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <van-button round size="small" :class="{active:article.attitude===1}" plain icon="like-o">点赞</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          :class="{active:article.attitude===0}"
          plain
          icon="delete"
        >不喜欢</van-button>
      </div>
          <!-- 放置comment组件 -->
    <comment />
    </div>

    <!-- 放置遮罩层 -->
    <van-overlay :show="loading">
      <div class="loading-container">
        <van-loading />
        </div>
    </van-overlay>
  </div>
</template>

<script>
import { getArticlesDetails } from '@/api/articles'
import { followUser, unFollowUser } from '@/api/user'
import comment from './components/comment' // 引入评论组件
export default {
  components: {
    comment
  },
  data () {
    return {
      article: {},
      followLoading: false,
      loading: false
    }
  },
  methods: {
    async getArticlesDetails () {
      this.loading = true// 打开遮罩层
      const { artId } = this.$route.query// 获取query参数
      this.article = await getArticlesDetails(artId)// 得到文章结果
      this.loading = false// 关闭遮罩弹层
    },
    // 关注或者取消关注，当关注的时候再点击为取消关注
    async follow () {
      this.followLoading = true
      try {
        if (this.article.is_followed) {
        // 取消关注
          await unFollowUser(this.article.aut_id)
        } else {
        // 关注
          await followUser({ target: this.article.aut_id })
        }
        this.article.is_followed = !this.article.is_followed
        this.$znotify({ type: 'success', message: '关注成功' })
      } catch (error) {
        this.$znotify({ message: '操作失败' })
      } finally {
      // 不论执行成功与否，都会执行
        this.followLoading = false
      }
    }
  },

  created () {
    this.getArticlesDetails()
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.loading-container{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.van-overlay {
  background: none;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 10px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position: sticky;
    background-color: #fff;
    top: 46px;
    z-index:2 ;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
