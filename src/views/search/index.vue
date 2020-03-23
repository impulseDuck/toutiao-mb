<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search @search="onSearch" v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
    <!-- 联想内容 -->
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell @click="toResult(item)" icon="search" v-for="(item,index) in suggestionList" :key="index">
        <span>{{item}}</span>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <div class="history-box" v-else>
      <div class="head" v-if="historyList.length">
        <span>历史记录</span>
        <van-icon name="delete" @click="clear"></van-icon>
      </div>
      <van-cell-group>
        <!-- 把位置变成动态的 -->
        <van-cell @click="toResult(item)" v-for="(item,index) in historyList" :key="index">
          <a class="word_btn">{{item}}</a>
          <van-icon @click="delHistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/articles'
const key = 'toutiao-hitory' // 此key用来历史记录在本地缓存中的key
export default {
  name: 'search',
  data () {
    return {
      q: '', // 搜索
      historyList: JSON.parse(localStorage.getItem(key) || '[]'), // 作为一个数据变量接收搜索历史记录
      suggestionList: []
    }
  },
  watch: {
    // 防抖写法
    // q () {
    //   clearTimeout(this.timer)// 先清除定时器
    //   this.timer = setTimeout(async () => {
    //     if (!this.q) {
    //       this.suggestionList = []
    //       return
    //     }
    //     // 此函数请求联想搜索建议
    //     const data = await getSuggestion({ q: this.q })
    //     this.suggestionList = data.options
    //   }, 500)
    // }
    // 函数节流
    q () {
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null
          if (!this.q) {
            this.suggestionList = []
            return
          }
          const data = await getSuggestion({ q: this.q })
          this.suggestionList = data.options
        }, 500)
      }
    }
  },
  methods: {

    async  delHistory (index) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '您确定要清空历史记录吗？'
        })
        this.historyList.splice(index, 1)
        // 删除对应的历史记录同步到本地缓存
        localStorage.setItem(key, JSON.stringify(this.historyList))
      } catch (error) {
        // 失败不需要操作
      }
    },
    // 点击历史记录跳到搜索结果
    // toSearchResult (text) {
    //   this.$router.push({ path: '/search/result', query: { q: text } }) // 直接跳到搜索结果
    // },
    clear () {
      this.historyList = []
      localStorage.setItem(key, '[]')
    },
    // 搜索回车/虚拟操作键盘搜索
    onSearch () {
      if (!this.q) return // 如果q为空，没必要往下走
      this.historyList.push(this.q)
      this.historyList = Array.from(new Set(this.historyList)) // 去重
      localStorage.setItem(key, JSON.stringify(this.historyList))

      this.$router.push({ path: '/search/result', query: { q: this.q } })
    },
    // 联想搜索后跳到相对页面
    toResult (text) {
      this.historyList.push(text)// 加到搜索记录
      this.historyList = Array.from(new Set(this.historyList))
      localStorage.setItem(key, JSON.stringify(this.historyList))
      this.$router.push({ path: '/search/result', query: { q: text } })
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head {
    line-height: 36px;
    color: #999;
    .van-icon {
      font-size: 16px;
      float: right;
      margin-top: 10px;
    }
  }
  .van-cell {
    padding: 10px 0;
  }
  .word_btn {
    color: #3296fa;
  }
  .close_btn {
    margin-top: 5px;
    color: #999;
  }
}
.suggest-box {
  /deep/ .van-cell {
    padding: 10px 20px;
    color: #999;
    p {
      span {
        color: red;
      }
    }
  }
}
</style>
