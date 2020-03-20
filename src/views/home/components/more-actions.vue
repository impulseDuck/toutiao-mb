<template>
  <div class="more-action">
      <!-- 如果前面满足，前面显示，前面不满足， 后面显示 -->
    <van-cell-group v-if="!isReport">
        <!-- 点击事件，实际上是调用父组件的接口 -->
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell v-for="item in reports" :key="item.value">{{item.label}}</van-cell>

    </van-cell-group>
  </div>
</template>

<script>
import { reports } from '@/api/constants' // 引入常量变量
export default {
  data () {
    return {
      isReport: false, // 表示是否举报
      reports // 来源是组件中，要遍历
    }
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
