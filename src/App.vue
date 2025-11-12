<!-- App.vue -->
<template>
  <!-- 应用根容器 -->
  <div id="app">
    <!-- 头部导航组件 -->
    <Header />
    <!-- 主要内容区域 -->
    <main>
      <!-- Vue Router 路由视图 -->
      <router-view />
    </main>
    <!-- 底部组件 -->
    <Footer />
    <!-- 登录模态框组件 -->
    <LoginModal />
    <!-- 注册模态框组件 -->
    <RegisterModal />
  </div>
</template>

<script>
// 导入头部组件
import Header from './components/Header.vue'
// 导入底部组件
import Footer from './components/Footer.vue'
// 导入登录模态框组件
import LoginModal from './components/LoginModal.vue'
// 导入注册模态框组件
import RegisterModal from './components/RegisterModal.vue'
// 导入Vue生命周期函数
import { onMounted } from 'vue'
// 导入Vuex store
import { useStore } from 'vuex'

// 导出应用根组件
export default {
  // 组件名称
  name: 'App',
  // 注册子组件
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,           // 头部导航
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,           // 底部信息
    LoginModal,       // 登录模态框
    RegisterModal     // 注册模态框
  },
  // 组合式API setup函数
  setup() {
    // 获取Vuex store实例
    const store = useStore()
    
    // 组件挂载完成后执行
    onMounted(() => {
      // 初始化认证状态（检查localStorage中的用户信息）
      store.dispatch('initializeAuth')
    })
  }
}
</script>