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
          <van-cell v-for="item in articles" :key="item.art_id">
            <div class="article_item">
              <!-- 标题 -->
               <h3 class="van-ellipsis">魔幻年</h3>
          <!-- 三图 -->
              <div class="img_box">
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <!-- 单图 -->
                <!-- <div class="img_box">
                  <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                </div> -->
                <!-- 作者信息 -->
                <div class="info_box">
                  <span>你像一阵风</span>
                  <span>8评论</span>
                  <span>10分钟前</span>
                  <span class="close">
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

export default {
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
      const data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      // 追加到文章的后面
      this.articles.push(data.results)
      // 添加数据，需要手动关闭
      this.uploading = false
      // 如果将历史时间戳给timestamp，赋值前判断是否为0，若为0，则没有数据，宣布结束，若有继续加载
      if (data.pre_timestamp) {
        this.pre_timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    onRefresh () {
      setTimeout(() => {
        const arr = Array.from(Array(2), (value, index) => 111 + index + 1)
        this.articles.unshift(...arr)
        this.downloading = false
        this.successText = `更新了${arr.length}条数据`
      }, 1000)
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
