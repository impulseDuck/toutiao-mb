<template>
  <div class="container">
    <van-tabs>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
      <!-- <van-tab :title="item.name" v-for="item in channels" :key="item.id"> -->
        <!-- <div class="scroll-wrapper" > -->
        <!-- <van-cell-group>
<van-cell title="标题" value="内容" v-for="item in 20" :key="item">
</van-cell>
        </van-cell-group>-->
        <!-- </div> -->
        <ArticleList :channel_id='item.id'></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 放置编辑频道的图片 -->
    <span class="bar_btn">
      <!-- 放入图标 -->
      <van-icon name="wap-nav"></van-icon>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleList from './components/article-list.vue'
import { getMyChannels } from '@/api/channels'

export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      channels: [] // 接收频道数据
    }
  },
  // 设置方法
  methods: {
    async getMyChannels () {
      // getMyChannels()
      const data = await getMyChannels()
      this.channels = data.channels
    }
  },
  // 渲染函数
  created () {
    this.getMyChannels()
  }
}
</script>
<style lang='less' scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
