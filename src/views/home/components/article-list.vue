<template>
<div>
    <!-- 实现上拉加载 -->
    <!-- 阅读记忆，返回后依旧回到上次阅读的地方 -->
    <div class="scrollWapper">

    <van-list v-model="uploading" @load="onLoad" :finished="finished"></van-list>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      uploading: false, // 是否开启了上拉加载
      finished: false// 是否已经完成所有数据的加载
    }
  },
  methods: {
    onLoad () {
      console.log('开始加载数据')
      //   如果有数据，加载在list中
      //   没有数据就关闭了
      setTimeout(() => {
        this.finished = true
      }, 1000)
    }
  }
}
</script>

<style>

</style>
