<template>
  <div class="container">
    <van-tabs v-model="activeIndex" :activeIndex='activeIndex'>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- <van-tab :title="item.name" v-for="item in channels" :key="item.id"> -->
        <!-- <div class="scroll-wrapper" > -->
        <!-- <van-cell-group>
<van-cell title="标题" value="内容" v-for="item in 20" :key="item">
</van-cell>
        </van-cell-group>-->
        <!-- </div> -->
        <ArticleList :channel_id="item.id" @showAction="openActinos"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 放置编辑频道的图片 -->
    <span class="bar_btn">
      <!-- 放入图标 -->
      <van-icon name="wap-nav" @click="showChannelEdit=true"></van-icon>
    </span>
    <!-- 放置一个弹层组件 -->
    <van-popup v-model="showMoreAction" style="width:80%">
      <!-- 监听举报事件 -->
      <moreAction @dislike='dislikeOrReport("dislike")'  @report='dislikeOrReport("report",$event)'></moreAction>
    </van-popup>
    <!-- 频道编辑组件 -->
    <van-action-sheet v-model="showChannelEdit" :round="false" title="编辑频道">
     <channelEdit @delChannel='delChannel'  @addChannel="addChannel" :channels="channels" @selectChannel='selectChannel' :activeIndex="activeIndex"></channelEdit>
    </van-action-sheet>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleList from './components/article-list.vue'
import { getMyChannels, delChannel, addChannel } from '@/api/channels'
import moreAction from './components/more-actions'
// 引入不感兴趣
import { dislikeArticle, reportArticle } from '@/api/articles'
// 引入eventBus
import eventBus from '@/utils/eventBus'
import ChannelEdit from './components/channel-edit'

export default {
  name: 'Home',
  components: {
    ArticleList,
    moreAction,
    ChannelEdit
    // delChannel
  },

  data () {
    return {
      channels: [], // 接收频道数据
      showMoreAction: false, // 是否显示弹层
      articleId: null, // 用来接收点击的id
      activeIndex: 0, // 默认激活第一个
      showChannelEdit: false // 是否显示频道编辑组件
    }
  },
  // 设置方法
  methods: {
    // 增加频道的方法
    async   addChannel (channel) {
      await addChannel(channel)// 传入参数，写入缓存
      this.channels.push(channel)// 将添加的channel添加到 data中的channels中
    },
    // 删除频道的方法
    async  delChannel (id) {
      // 应该先调用api
      try {
        await delChannel(id)
        // 如果此时成功的resolve，我们应该移除当前data的数据
        const index = this.channels.findIndex(item => item.id === id)
        if (index <= this.activeIndex) {
          this.activeIndex = this.activeIndex - 1
        }
        this.channels.splice(index, 1)
      } catch (error) {
        this.$znotify({ message: '删除频道失败' })
      }
    },
    // 当子组件触发selectChannel事件时候，触发该方法
    selectChannel (id) {
      // alert(id)
      // 找到id对应的频道索引
      const index = this.channels.findIndex(item => item.id === id)
      this.activeIndex = index // 获取所有
      this.showChannelEdit = false
    },
    // 传索引
    // selectChannel (index) {
    //   // alert(id)
    //   // 找到id对应的频道索引
    //   this.activeIndex = index // 获取所有
    //   this.showChannelEdit = false
    // },
    async getMyChannels () {
      // getMyChannels()
      const data = await getMyChannels()
      this.channels = data.channels
    },
    openActinos (artId) {
      // 此方法会在article-list中触发
      this.showMoreAction = true
      // 把id存储起来
      this.articleId = artId
    },
    // 对文章不感兴趣
    async dislikeOrReport (operateType, type) {
      try {
        operateType === 'dislike'
          ? await dislikeArticle({
            target: this.articleId
          })
          : await reportArticle({ target: this.articleId, type })

        this.$znotify({ type: 'success', message: '操作成功' })
        // 利用事件广播的机制，
        // this.channels[this.activeIndex].id
        // 传入文章id和频道id
        eventBus.$emit(
          'delArticle',
          this.articleId,
          this.channels[this.activeIndex].id
        )
        // 根据id来删除
        this.showMoreAction = false
      } catch (error) {
        this.$znotify({
          message: '操作失败'
        })
      }
    }
    // async reportArticle (type) {
    //   // 调用举报文章接口
    //   try {
    //     await reportArticle({ target: this.articleId, type })
    //     // 当成功的时候，提示
    //     this.$znotify({ type: 'success', message: '操作成功' })
    //     eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
    //     this.showMoreAction = false
    //   } catch (error) {
    //     this.$znotify({
    //       message: '操作失败'
    //     })
    //   }
    // }
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
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
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
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
