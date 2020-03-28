import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  // 放置数据的地方，初始化时候直接将用户信息给我们的公共状态
  state: {
    // user中有两个值：token refreshtoken
    user: auth.getUser(), // 从缓存中
    photo: null// 用户头像
  },
  mutations: {
    updateUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setUser(payload.user) // 将数据同步设置到本地存储中
    },
    // 清空user
    clearUser (state) {
      state.user = {}
      auth.delUser()
    },
    // 更新图片
    updatePhoto (state, payload) {
      state.photo = payload.photo// 在载荷中传入头像
    }
  },
  actions: {

  },
  modules: {
  }
})
