<template>
   <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell @click="showName=true" is-link title="名称" :value="user.name" />
      <van-cell is-link title="性别" value='男'/>
      <van-cell is-link title="生日" value="2019-08-08" />
    </van-cell-group>
    <!-- 放置头像弹层 -->
     <!-- 弹层组件 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
       <van-cell is-link title="本地相册选择图片"></van-cell>
       <van-cell is-link title="拍照"></van-cell>
    </van-popup>
     <!-- 弹昵称 -->
    <van-popup  v-model="showName" style="width:80%" :close-on-click-overlay='false'>
       <!-- 编辑用户昵称  双向绑定用户的昵称-->
       <van-field :error-message="nameMsg" v-model.trim="user.name" type='textarea'  rows="4"></van-field>
       <van-button block size="normal" type="info" @click="closeName">修改</van-button>
    </van-popup>
    <van-action-sheet :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>
    <!-- 生日弹层 -->
    <van-popup v-model="showBirthDay" position="bottom">
      <!-- 选择出生日期  出生日期应该小于现在时间-->
      <!-- type表示 当前的日期类型 年月日 -->
      <van-datetime-picker
           v-model="currentDate"
           type="date"
          :min-date="minDate"
          :max-date="maxDate"
         />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 显示头像弹层
      showPhoto: false,
      showName: false,
      showGender: false,
      actions: [{ name: '男' }, { name: '女' }],
      showBirthDay: false,
      minDate: new Date(1900, 1, 1),
      currentDate: new Date(),
      maxDate: new Date(), // 当前时间
      nameMsg: '',
      user: {
        name: '',
        gender: 1,
        birthday: '',
        photo: ''
      }
    }
  },
  methods: {
    closeName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.nameMsg = '用户名称应该在1-7位'
        return
      }
      this.nameMsg = ''
      this.showName = false
    }
  }
}
</script>

<style>

</style>
