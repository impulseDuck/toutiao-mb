<template>
    <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list" ref="myList">
      <!-- <div class="chat-item left"> -->
      <div v-for="(item,index) in list" :key="index" class="chat-item" :class="{left:item.name==='xx',right:item.name!=='xx'}">
        <van-image v-if="item.name==='xx'" fit="cover" round :src="img" />
        <div class="chat-pao">{{item.msg}}</div>
        <van-image v-if="item.name!=='xx'" fit="cover" round :src="photo" />
      </div>
      <!-- <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
        <van-image  fit="cover" round :src="photo" />
      </div> -->
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import img from '@/assets/timg1.jpg'
import { mapState } from 'vuex'
import io from 'socket.io-client'
export default {
  data () {
    return {
      value: '',
      loading: false,
      img, // 引入1张图片，将图片地址赋值data中的变量
      list: []// 聊天记录
    }
  },
  methods: {
    // 滚动条
    scrollBottom () {
      // 表示此函数会在上一次数据更新并且完成页面渲染之后执行
      this.$nextTick(() => {
        // 在这个回调函数中，上一次数据的更新结果已经反映到了视图上，视图已经更新了
        this.$refs.myList.scrollTop = this.$refs.myList.scrollHeight// 将滚动条滚到视图最低端
      })
    },
    async send () {
      // 如果字符串为空直接返回
      if (!this.value) return false
      // 开启加载状态，防止多次提交
      this.loading = true
      await this.$sleep(500)
      const obj = {
        msg: this.value, // 消息内容
        timestamp: Date.now()// 聊天发送的时间戳
      }
      // 发送这条消息
      this.socket.emit('message', obj)// 发送消息
      // 发送消息之后，渲染到页面上
      this.list.push(obj)
      this.value = ''// 清空
      this.loading = false// 关闭加载
      this.scrollBottom()
    }
  },
  // 实例销毁前
  beforeDestroy () {
    // 关掉websocket
    this.socket.close()// 直接关闭连接
  },
  created () {
    // 建立连接
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.user.token // vuex中的 token
      }
    })
    this.socket.on('connect', () => {
      this.list.push({ msg: '你睡了吗？', name: 'xx' })// 加name是为了区分谁说的
    })
    this.socket.on('message', data => {
      this.list.push({ ...data, name: 'xx' })
      this.scrollBottom()
    })
  },
  computed: {
    ...mapState(['photo', 'user'])// 映射vuex中的公共变量
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
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
}
</style>
