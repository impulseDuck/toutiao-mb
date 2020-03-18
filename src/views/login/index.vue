<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left='$router.back()'></van-nav-bar>
    <van-cell-group>
<van-field placeholder='请输入手机号' label='手机号' v-model.trim="loginForm.mobile" :error-message="errorMessage.mobile" @blur="checkMobile" ></van-field>
<van-field placeholder='请输入验证码' label='验证码' v-model.trim="loginForm.code" :error-message="errorMessage.code" @blur="checkCode">
  <van-button slot="button" type="primary" size="small">发送验证码</van-button>
</van-field>
    </van-cell-group>
  <div class="loginBox" style="padding:20px">
      <van-button type="info" size="small" round block @click="login">登录</van-button>
  </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '13911111111', // 表单验证手机号
        code: '246810' // 表单验证验证码
      },
      errorMessage: {
        code: '', // 验证码错误消息
        mobile: '' // 手机号错误消息
      }

    }
  },
  methods: {
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errorMessage.mobile = '手机号不能为空'
        return false
      }
      // 验证手机号格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMessage.mobile = '手机号格式不正确'
        return false
      }
      // 当校验通过的时候
      this.errorMessage.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码错误'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    login () {
      if (this.checkMobile() && this.checkCode()) {
        console.log('校验通过')
      }
    }
  }
}
</script>

<style>

</style>
