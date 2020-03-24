<template>
  <!-- 实现上拉加载 -->
  <!-- 阅读记忆，返回后依旧回到上次阅读的地方 -->
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh @refresh="onRefresh" v-model="downloading" :success-text="successText">
      <!-- 上拉加载 -->
      <van-list v-model="uploading" @load="onLoad" :finished="finished" finished-text="当前数据加载完毕">
        <!-- 循环内容 -->
        <van-cell-group>
          <van-cell :to="`/article?artId=${item.art_id.toString()}`" v-for="item in articles" :key="item.art_id.toString()">
            <div class="article_item">
              <!-- 标题 -->
               <h3 class="van-ellipsis">{{item.title}}</h3>
          <!-- 三图 -->
              <div class="img_box" v-if="item.cover.type===3">
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <!-- 单图 -->
                <div class="img_box"  v-if="item.cover.type===1">
                  <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]" />
                </div>
                <!-- 作者信息 -->
                <div class="info_box">
                  <span>{{item.aut_name}}</span>
                  <span>{{item.comm_count}}评论</span>
                  <span>{{item.pubdate | relTime}}</span>
                  <!-- 是否显示叉号，根据当前登录状态来判断。登录则显示，否则不显示 -->
                  <!-- 点击触发返款，显示碳层 -->
                  <span class="close" v-if="user.token" @click.stop="$emit('showAction',item.art_id.toString())">
                    <van-icon name="cross"></van-icon>
                  </span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 引入获取文章模块
import { getArticles } from '@/api/articles'
// 引入辅助函数模块
import { mapState } from 'vuex'
import eventBus from '@/utils/eventBus'

export default {
  created () {
    eventBus.$on('delArticle', (artId, channelId) => {
      // 判断传递来的id，是否等于自身id
      if (channelId === this.channel_id) {
        const index = this.articles.findIndex(item => item.art_id.toString() === artId)
        // 通过id查询对应文章id所在的下标
        if (index > -1) {
          // 因为下标从0开始，所以大于-1
          this.articles.splice(index, 1)
        }
        // 但是一直删除，就会将列表全删光
        if (this.articles.length === 0) {
          // 说明把数据删光了
          this.onLoad() // 给页面加数据
        }
      }
    })
  },
  computed: {
    ...mapState(['user']) // 将user对象映射到函数中
  },
  data () {
    return {
      downloading: false,
      uploading: false, // 是否开启了上拉加载
      finished: false, // 是否已经完成所有数据的加载
      articles: [],
      successText: '',
      timestamp: '' // 存储历史时间戳
    }
  },
  props: {
    channel_id: {
      require: true, // 必填项
      type: Number, // 传入的属性类型
      default: null // 默认值null
    }
  },
  methods: {
    async  onLoad () {
      console.log('开始加载数据')
      //   如果有数据，加载在list中
      //   没有数据就关闭了
      // setTimeout(() => {
      //   this.finished = true
      // }, 1000)
      //
      // if (this.articles.length > 50) {
      //   // 如果此时记录大于50，则关闭加载
      //   this.finished = true
      // } else {
      //   const arr = Array.from(
      //     Array(15),
      //     (value, index) => this.articles.length + (index + 1)
      //   )
      //   // 把数据追加到队列的最末端
      //   // 上拉加载不是覆盖数据
      //   this.articles.push(...arr)
      //   // 添加数据，需要手动关闭loading
      //   this.uploading = false
      // }
      // 获取文章
      await this.$sleep()
      const data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      // 追加到文章的后面
      this.articles.push(...data.results)
      // 添加数据，需要手动关闭
      this.uploading = false
      // 如果将历史时间戳给timestamp，赋值前判断是否为0，若为0，则没有数据，宣布结束，若有继续加载
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      await this.$sleep()
      // setTimeout(() => {
      //   const arr = Array.from(Array(2), (value, index) => 111 + index + 1)
      //   this.articles.unshift(...arr)
      //   this.downloading = false
      //   this.successText = `更新了${arr.length}条数据`
      // }, 1000)
      const data = await getArticles({
      // 获取最新的数据
        channel_id: this.channel_id,
        timestamp: Date.now()
      })
      // 手动关闭下拉刷新的状态
      this.downloading = false
      // 需要判断当前时间戳能否换来最新的数据 如果能换来，把整个旧数据替换，不能就告诉暂时没有更新
      if (data.results.length) {
        this.articles = data.results // 全部覆盖
        if (data.pre_timestamp) {
          // 因为下拉刷新换取了新数据，里面又有时间戳
          this.finished = false // 重新换取列表
          this.timestamp = data.pre_timestamp // 记录历史时间戳给变量
        }
        this.successText = `更新了${data.results.length}条数据`
      } else {
        // 不能换取
        this.successText = '已经是最新状态'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
