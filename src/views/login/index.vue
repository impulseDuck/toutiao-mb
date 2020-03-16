<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left='$router.back()'></van-nav-bar>
    <van-cell-group>
<van-field placeholder='请输入手机号' label='手机号'></van-field>
<van-field placeholder='请输入验证码' label='验证码'>
  <van-button slot="button" type="primary" size="small">发送验证码</van-button>
</van-field>
    </van-cell-group>
  <div class="loginBox" style="padding:20px">
      <van-button type="info" size="small" round block>登录</van-button>
  </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
