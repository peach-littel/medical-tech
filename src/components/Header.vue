<!-- Header.vue -->
<template>
  <!-- 网站头部组件 -->
  <header class="header">
    <!-- 导航栏容器 -->
    <nav class="nav">
      <!-- 网站logo区域 -->
      <div class="logo">
        <!-- 网站主标题 -->
        <h1>Med.Tech</h1>
      </div>
      
      <!-- 搜索框 -->
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索内容..." 
          v-model="searchQuery"
          @keyup.enter="performSearch"
          @input="handleSearchInput"
        >
        <button class="search-btn" @click="performSearch">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- 导航链接列表 -->
      <ul class="nav-link">
        <!-- 首页导航项 -->
        <li><router-link to="/">首页</router-link></li>
        <!-- 关于我们导航项 -->
        <li><router-link to="/about">关于我们</router-link></li>
        <!-- 服务中心导航项 -->
        <li><router-link to="/services">服务中心</router-link></li>
        <!-- 产品展示导航项 -->
        <li><router-link to="/products">产品展示</router-link></li>
        <!-- 新闻动态导航项 -->
        <li><router-link to="/news">新闻动态</router-link></li>
        <!-- 联系我们导航项 -->
        <li><router-link to="/contact">联系我们</router-link></li>
        <!-- 条件渲染：未登录时显示登录按钮 -->
        <li v-if="!isAuthenticated">
          <!-- 登录按钮，点击触发显示登录模态框 -->
          <button class="login-btn" @click="showLoginModal">用户登录</button>
        </li>
        <!-- 条件渲染：已登录时显示用户信息 -->
        <li v-else class="user-info">
          <!-- 欢迎用户信息 -->
          <span>欢迎，{{ user.name }}</span>
          <!-- 退出登录按钮 -->
          <button class="logout-btn" @click="logout">退出</button>
        </li>
      </ul>
    </nav>
    
    <!-- 搜索结果下拉框 -->
    <div v-if="showSearchResults && searchResults.length > 0" class="search-results-dropdown">
      <div class="search-results-content">
        <div v-for="result in searchResults" :key="result.id" class="search-result-item" @click="navigateToResult(result)">
          <div class="result-title">{{ result.title }}</div>
          <div class="result-type">{{ result.type }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// 导入Vue组合式API
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue'
// 导入Vuex store
import { useStore } from 'vuex'
// 导入路由
import { useRouter } from 'vue-router'

// 导出组件定义
export default{
  // 组件名称
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name:'Header',
  // 组合式API setup函数
  setup() {
    // 获取Vuex store实例
    const store = useStore()
    const router = useRouter()
    
    // 搜索相关状态
    const searchQuery = ref('')
    const showSearchResults = ref(false)
    const searchResults = ref([])
    
    // 模拟搜索数据
    const searchData = reactive([
      { id: 1, title: '基因测序服务', type: '服务', route: '/services', category: 'services' },
      { id: 2, title: '生物分析软件', type: '产品', route: '/products', category: 'products' },
      { id: 3, title: '新药研发突破', type: '新闻', route: '/news', category: 'news' },
      { id: 4, title: '公司发展历程', type: '关于我们', route: '/about', category: 'about' },
      { id: 5, title: '专业团队介绍', type: '关于我们', route: '/about', category: 'about' },
      { id: 6, title: '国际合作项目', type: '关于我们', route: '/about', category: 'about' },
      { id: 7, title: 'AI辅助诊断系统', type: '产品', route: '/products', category: 'products' },
      { id: 8, title: '核酸检测平台', type: '产品', route: '/products', category: 'products' },
      { id: 9, title: '技术论坛活动', type: '新闻', route: '/news', category: 'news' },
      { id: 10, title: '联系我们', type: '联系', route: '/contact', category: 'contact' }
    ])
    
    // 计算属性：检查用户是否已认证
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    // 计算属性：获取当前用户信息
    const user = computed(() => store.getters.currentUser)
    
    // 搜索处理函数
    const performSearch = () => {
      if (!searchQuery.value.trim()) {
        showSearchResults.value = false
        return
      }
      
      const query = searchQuery.value.toLowerCase().trim()
      const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.type.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      )
      
      searchResults.value = results.slice(0, 5) // 最多显示5条结果
      showSearchResults.value = true
    }
    
    // 搜索输入处理（实时搜索）
    const handleSearchInput = () => {
      if (searchQuery.value.length > 2) {
        performSearch()
      } else {
        showSearchResults.value = false
        searchResults.value = []
      }
    }
    
    // 导航到搜索结果
    const navigateToResult = (result) => {
      router.push(result.route)
      searchQuery.value = ''
      showSearchResults.value = false
      searchResults.value = []
    }
    
    // 显示登录模态框函数
    const showLoginModal = () => {
      // 使用Bootstrap创建并显示登录模态框
      const modal = document.getElementById('loginModal')
      if (modal) {
        modal.style.display = 'block'
        modal.classList.add('show')
      }
    }
    
    // 退出登录函数
    const logout = () => {
      // 调用Vuex action执行退出逻辑
      store.dispatch('logout')
    }
    
    // 点击页面其他地方关闭搜索结果
    const handleClickOutside = (event) => {
      const searchContainer = document.querySelector('.search-container')
      if (searchContainer && !searchContainer.contains(event.target)) {
        showSearchResults.value = false
      }
    }
    
    onMounted(() => {
      // 添加全局点击事件监听
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      // 移除事件监听
      document.removeEventListener('click', handleClickOutside)
    })
    
    // 返回模板中需要使用的数据和方法
    return {
      isAuthenticated,
      user,
      searchQuery,
      showSearchResults,
      searchResults,
      performSearch,
      handleSearchInput,
      navigateToResult,
      showLoginModal,
      logout
    }
  }
}
</script>

<style scoped>
/* 头部容器样式 */
.header{
  /* 白色背景 */
  background-color: #fff;
  /* 底部阴影效果 */
  box-shadow: 0 2px 10px rgb(0, 0, 0,0.1);
  /* 固定定位在页面顶部 */
  position: fixed;
  /* 宽度100%占据整个视口 */
  width: 100%;
  /* 距离顶部0像素 */
  top: 0;
  /* 设置高z-index确保在最上层 */
  z-index: 1000;
}

/* 导航栏样式 */
.nav{
  /* 使用flex布局 */
  display: flex;
  /* 子元素在主轴两端对齐 */
  justify-content: space-between;
  /* 子元素在交叉轴居中对齐 */
  align-items: center;
  /* 内边距：上下1rem，左右2rem */
  padding: 1rem 2rem;
  /* 最大宽度限制 */
  max-width: 1200px;
  /* 水平居中 */
  margin:0 auto;
  position: relative;
}

/* logo标题样式 */
.logo h1{
  /* 主题绿色 */
  color: #2c5332;
  /* 移除默认外边距 */
  margin-left: -100px;
  font-size: 30px;
  font-weight: bolder;
}

/* 搜索容器样式 */
.search-container {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 25px;
  padding: 0.5rem;
  margin: 0 2rem;
  flex: 0 1 300px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.search-container:focus-within {
  border-color: #2c5530;
  background: white;
}

.search-input {
  border: none;
  background: transparent;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  width: 100%;
  outline: none;
}

.search-btn {
  background: #2c5530;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background 0.3s;
  flex-shrink: 0;
}

.search-btn:hover {
  background: #4a7c59;
}

/* 导航链接列表样式 */
.nav-link{
  /* flex布局 */
  display: flex;
  /* 移除列表默认样式 */
  list-style: none;
  /* 子元素间距2rem */
  gap: 2rem;
  /* 移除默认外边距 */
  margin: 0;
  /* 垂直居中对齐 */
  align-items: center;
}

/* 导航链接样式 */
.nav-link a{
  /* 移除下划线 */
  text-decoration: none;
  /* 深灰色文字 */
  color: #333;
  /* 中等字重 */
  font-weight: 500;
  /* 颜色过渡动画，0.3秒持续时间 */
  transition: color 0.3s;
}

/* 激活状态的路由链接样式 */
.nav-link .router-link-exact-active{
  /* 激活状态使用主题绿色 */
  color: #2c5530;
  /* 加粗显示 */
  font-weight: bold;
}

/* 登录按钮样式 */
.login-btn, .logout-btn {
  /* 主题绿色背景 */
  background: #2c5530;
  /* 白色文字 */
  color: white;
  /* 无边框 */
  border: none;
  /* 内边距：上下0.5rem，左右1rem */
  padding: 0.5rem 1rem;
  /* 圆角5像素 */
  border-radius: 5px;
  /* 鼠标指针变为手型 */
  cursor: pointer;
  /* 中等字重 */
  font-weight: 500;
  /* 背景色过渡动画 */
  transition: background 0.3s;
}

/* 按钮悬停状态 */
.login-btn:hover, .logout-btn:hover {
  /* 悬停时使用稍亮的绿色 */
  background: #4a7c59;
}

/* 用户信息容器样式 */
.user-info {
  /* flex布局 */
  display: flex;
  /* 垂直居中对齐 */
  align-items: center;
  /* 子元素间距1rem */
  gap: 1rem;
}

/* 用户信息文字样式 */
.user-info span {
  /* 深灰色文字 */
  color: #45824d;
  /* 中等字重 */
  font-weight: 500;
}

/* 搜索结果下拉框样式 */
.search-results-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  background: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  z-index: 1001;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-top: none;
}

.search-results-content {
  padding: 0.5rem;
}

.search-result-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-result-item:hover {
  background: #f8f9fa;
}

.search-result-item:last-child {
  border-bottom: none;
}

.result-title {
  font-weight: 500;
  color: #333;
  flex: 1;
}

.result-type {
  font-size: 0.8rem;
  color: #666;
  background: #e9ecef;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav {
    flex-wrap: wrap;
    padding: 1rem;
  }
  
  .search-container {
    order: 3;
    flex: 1 1 100%;
    margin: 1rem 0 0 0;
    max-width: 100%;
  }
  
  .search-results-dropdown {
    width: calc(100% - 2rem);
    left: 1rem;
    transform: none;
  }
  
  .nav-link {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-container {
    order: 0;
    margin: 0;
    width: 100%;
  }
  
  .nav-link {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
[file content end]