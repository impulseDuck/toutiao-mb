<template>
<!-- 顶部组件 -->
  <div>
    <div class="container"></div>
    <!-- 内容视图 -->
<van-nav-bar @click-right="$router.push('/search')" title="小黄鸭" fixted right-text="搜索" v-if="$route.path!=='/user'"></van-nav-bar>
<div class="my-wrapper" :class="{noTop:$route.path==='/user'}">
  <router-view></router-view>
</div>
<div>
  <!-- 底部组件 -->
 <!-- route表示开启路由模式 -->
  <van-tabbar route >
    <van-tabbar-item icon='wap-home-o' to='/'>首页</van-tabbar-item>
    <van-tabbar-item icon='chat-o' to='/question'>问答</van-tabbar-item>
    <van-tabbar-item icon='tv-o' to='/video'>视频</van-tabbar-item>
    <van-tabbar-item icon='user-o' to='/user'>我的</van-tabbar-item>
  </van-tabbar>
</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
