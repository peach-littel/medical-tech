// main.js
// 导入Vue的createApp函数
import { createApp } from 'vue'
// 导入根组件
import App from './App.vue'
// 导入路由配置
import router from './router'
// 导入Vuex store配置
import store from './store'



// 引入 Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 创建Vue应用实例
const app = createApp(App)

// 使用Vuex store
app.use(store)
// 使用Vue Router
app.use(router)
// 将应用挂载到DOM元素#app上
app.mount('#app')

