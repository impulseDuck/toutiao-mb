import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'
import Vant from 'vant'// 引入vant组件库
import 'vant/lib/index.less'// 引入vant组件的样式
import 'amfe-flexible'
import styles from './styles/index.css'// 引入自定的全局样式
import plugin from '@/utils/plugin'// 杂货铺 小组件
Vue.use(Vant) // 注册vant的组件库
Vue.use(plugin) // 需要放在vant之后，因为用plugin中vant的配置函数，必须等到vant注册完毕
Vue.use(styles)
// 以上做法完整导入
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
