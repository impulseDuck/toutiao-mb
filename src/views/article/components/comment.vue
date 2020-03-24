<template>
  <div class="comment">
      <!-- 列表评论上拉加载 -->
    <van-list @load="onload" v-model="loading" :finished="finished" finished-text="没有更多了">
        <!-- 评论列表 -->
      <div class="item van-hairline--bottom van-hairline--top" v-for="item in comments" :key="item.com_id.toString()">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="item.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{item.aut_name}}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{item.like_count}}</span>
            </span>
          </p>
          <p>{{item.content}}</p>
          <p>
            <span class="time">{{item.pubdate|relTime}}</span>&nbsp;
            <van-tag @load="openReply(comment.com_id)" plain  @click="openReply(item.com_id.toString())">{{item.reply_count}} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <!-- 底部输入框，用来输入评论 -->
    <div class="reply-container van-hairline--top">
        <!-- 绑定评论内容 -->
      <van-field v-model="value" placeholder="写评论...">
          <!-- 控制提交评率 submiting -->
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button">提交</span>
      </van-field>
    </div>
    <!-- 放置评论的评论 -->
     <!-- 回复 -->
    <van-action-sheet v-model="showReply" :round="false" class="reply_dialog" title="回复评论">
      <van-list @load="getReply" :immediate-check="false" v-model="reply.loading" :finished="reply.finished" finished-text="没有更多了">
        <div class="item van-hairline--bottom van-hairline--top" v-for="item in reply.comments" :key="item.com_id.toString()">
          <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
          <div class="info">
            <p><span class="name">{{item.aut_name}}</span></p>
            <p>{{item.content}}</p>
            <p><span class="time">{{item.pubdate|relTime}}</span></p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
  </div>

  <!-- 都不输入框 -->
</template>

<script>
import { getComments } from '@/api/articles'
export default {
  data () {
    return {
      // 上拉加载中
      loading: false,
      // 全部加载完毕
      finished: false,
      // 输入的内容
      value: '',
      // 控制提交中状态数据
      submiting: false,
      // 用来存放列表数据
      comments: [],
      // 表示分页依据，如果为空，则从第一个开始
      offset: null,
      // 控制评论的评论面板是否显示
      showReply: false,
      reply: {
        loading: false,
        finished: false,
        // 用来存放列表数据
        comments: [],
        // 表示分页依据，如果为空，则从第一个开始
        offset: null,
        commentId: null// 用来存放当前的评论id
      }
    }
  },
  methods: {
    // 打开回复面板
    openReply (commentId) {
      this.showReply = true // 弹出面板
      this.reply.commentId = commentId // 存储当前的commentId
      this.reply.comments = []
      this.reply.offset = null
      this.reply.finished = false
      this.reply.loading = true
      this.getReply()
    },
    // 评论的评论回复列表组件
    async   getReply () {
      // 加载逻辑
      const data = await getComments({
        type: 'c',
        source: this.reply.commentId,
        offset: this.reply.offset
      })
      // 拿到的data只是请求第一页的数据
      this.reply.comments.push(...data.results)
      this.reply.loading = false
      this.reply.finished = data.end_id === data.last_id
      if (!this.reply.finished) {
        this.reply.offset = data.last_id
      }
    },
    // 评论列表
    async onload () {
      const { artId } = this.$route.query
      const data = await getComments({
        type: 'a', // a(文章评论) c（评论的评论）
        source: artId,
        offset: this.offset
      })
      this.comments.push(...data.results)
      this.loading = false
      this.finished = data.end_id === data.last_id// 如果两个id相等
      if (!this.finished) {
        this.offset = data.last_id
      }
    }

  }

}
</script>

<style lang='less' scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
.reply_dialog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content{
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>
