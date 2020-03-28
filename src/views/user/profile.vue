<template>
  <div class="container">
    <van-nav-bar
      @click-right="saveInfo"
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          @click="showPhoto=true"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell @click="showName=true" is-link title="名称" :value="user.name" />
      <van-cell @click="showGender=true" is-link title="性别" :value='user.gender === 0 ? "男" : "女"' />
      <van-cell @click="showDate" is-link title="生日" :value="user.birthday" />
    </van-cell-group>
    <!-- 放置头像弹层 -->
    <!-- 弹层组件 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
      <van-cell @click="openPhoto" is-link title="本地相册选择图片"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 弹昵称 -->
    <van-popup v-model="showName" style="width:80%" :close-on-click-overlay="false">
      <!-- 编辑用户昵称  双向绑定用户的昵称-->
      <van-field :error-message="nameMsg" v-model.trim="user.name" type="textarea" rows="4"></van-field>
      <van-button block size="normal" type="info" @click="closeName">修改</van-button>
    </van-popup>
    <van-action-sheet @select="selectItem" :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>
    <!-- 生日弹层 -->
    <van-popup v-model="showBirthDay" position="bottom">
      <!-- 选择出生日期  出生日期应该小于现在时间-->
      <!-- type表示 当前的日期类型 年月日 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate"
        @cancel="showBirthDay=false"
      />
    </van-popup>
    <!-- 在vue中。通过ref获取对象 -->
    <input @change="upload" ref="myFile" type="file" style="display:none" name id />
  </div>
</template>

<script>
import { changPhoto, getInfo, saveInfo } from '@/api/user'
import dayjs from 'dayjs'
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
        birthday: '2002-01-01',
        photo: ''
      }
    }
  },
  methods: {
    //   保存用户信息
    async saveInfo () {
      try {
        await saveInfo(this.user)
        this.$znotify({ type: 'success', message: '保存信息成功' })
      } catch (error) {
        this.$znotify({ message: '保存信息失败' })
      }
    },
    //   获取用户信息
    async getInfo () {
      this.user = await getInfo()
    },
    //  确定选择日期选择
    showDate () {
      this.showBirthDay = true
      this.currentDate = new Date(this.user.birthday)
    },
    confirmDate () {
      this.user.birthday = dayjs(this.currentDate).format('YYYY-MM-DD') // 格式化当前日期
      this.showBirthDay = false
    },
    //   选择菜单
    selectItem (item) {
      this.user.gender = item.name === '男' ? 0 : 1 // 根据判断得到当前的性别
      this.showGender = false // 关闭当前的弹层
    },
    //   打开用户头像
    openPhoto () {
      this.$refs.myFile.click() // 触发input filed的事件
    },
    async upload () {
      const data = new FormData()
      data.append('photo', this.$refs.myFile.files[0])
      //
      //   console.dir(this.$refs.myFile)

      // 当选择完图像，就可以修改图像
      const result = await changPhoto(data)
      this.user.photo = result.photo
      this.updatePhoto({ photo: result.photo })
      this.showPhoto = false
    },
    // 用户名
    closeName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.nameMsg = '用户名称应该在1-7位'
        return
      }
      this.nameMsg = ''
      this.showName = false
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style>
</style>
