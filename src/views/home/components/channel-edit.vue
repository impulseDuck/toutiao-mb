<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      <!-- 我的频道 -->
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(item,index) in channels" :key="item.id">
          <span class="f12" :class="{red:index===activeIndex}" @click="$emit('selectChannel',item.id)">频道{{item.name}}</span>
          <van-icon @click="$emit('delChannel',item.id)" class="btn" name="cross" v-if="index!==0 && editing"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
      <!-- 可选频道=全部的频道-我的频道 -->
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="item in optionChannels" :key="item.id">
          <span class="f12">{{item.name}}</span>
          <van-icon @click="$emit('addChannel',item)" class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  data () {
    return {
      editing: false, // 是否显示删除频道
      allChannels: []
    }
  },
  props: {
    channels: {
      // required 必传  type 类型 default  默认值
      required: true, // 表示必须传递channels
      type: Array, // 数组类型
      default: () => [] // 默认值给一格空数组 表示 此函数默认返回一个空数组
    },
    activeIndex: {
      required: true,
      type: Number, // 指定type是number类型
      default: 0
    }
  },
  methods: {
    async getAllChannels () {
      const data = await getAllChannels()
      this.allChannels = data.channels
    }
  },
  // 计算属性，可选频道是一个动态的结果，全部数据（data）在变化，我的频道（props） 重新计算缓存
  computed: {
    optionChannels () {
      // 全部频道-当前频道
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
