<template>

    <!-- 实现上拉加载 -->
    <!-- 阅读记忆，返回后依旧回到上次阅读的地方 -->
    <div class="scroll-wrapper">
      <!-- 下拉刷新 -->
      <van-pull-refresh @refresh='onRefresh' v-model="downloading" :success-text="successText">
       <!-- 上拉加载 -->
    <van-list v-model="uploading" @load="onLoad" :finished="finished" finished-text="当前数据加载完毕" >
      <!-- 循环内容 -->
      <van-cell-group >
      <van-cell title="可怕" :value="`排队${item}`" v-for="item in articles" :key="item" ></van-cell>
      </van-cell-group>
    </van-list>
      </van-pull-refresh>

    </div>

</template>

<script>
export default {
  data () {
    return {
      downloading: false,
      uploading: false, // 是否开启了上拉加载
      finished: false, // 是否已经完成所有数据的加载
      articles: [],
      successText: ''
    }
  },
  methods: {
    onLoad () {
      console.log('开始加载数据')
      //   如果有数据，加载在list中
      //   没有数据就关闭了
      // setTimeout(() => {
      //   this.finished = true
      // }, 1000)
      //
      if (this.articles.length > 50) {
        // 如果此时记录大于50，则关闭加载
        this.finished = true
      } else {
        const arr = Array.from(Array(15), (value, index) => this.articles.length + (index + 1))
        // 把数据追加到队列的最末端
        // 上拉加载不是覆盖数据
        this.articles.push(...arr)
        // 添加数据，需要手动关闭loading
        this.uploading = false
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

<style>

</style>
