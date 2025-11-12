<template>
  <section class="search-results">
    <div class="container">
      <div class="search-header">
        <h1>搜索结果</h1>
        <p v-if="searchQuery">搜索关键词: "{{ searchQuery }}"</p>
        <p v-else>请输入搜索关键词</p>
      </div>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>搜索中...</p>
      </div>
      
      <div v-else-if="results.length > 0" class="results-container">
        <div class="results-count">
          找到 {{ results.length }} 个相关结果
        </div>
        
        <div class="results-grid">
          <div v-for="result in results" :key="result.id" class="result-card" @click="navigateToResult(result)">
            <div class="result-content">
              <h3 class="result-title">{{ result.title }}</h3>
              <div class="result-meta">
                <span class="result-type">{{ result.type }}</span>
                <span class="result-category">{{ result.category }}</span>
              </div>
              <p class="result-description">{{ result.description }}</p>
            </div>
            <div class="result-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="no-results">
        <div class="no-results-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>未找到相关结果</h3>
        <p>请尝试使用其他关键词搜索</p>
        <button class="back-btn" @click="$router.back()">返回上一页</button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'SearchResults',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const searchQuery = ref('')
    const results = ref([])
    const loading = ref(false)
    
    // 模拟搜索数据
    const searchData = [
      { 
        id: 1, 
        title: '基因测序服务', 
        type: '服务', 
        category: 'services',
        route: '/services',
        description: '提供全面的基因测序服务，支持科研和临床诊断，采用最新测序技术。'
      },
      { 
        id: 2, 
        title: '生物分析软件', 
        type: '产品', 
        category: 'products',
        route: '/products',
        description: '专业数据分析平台，提供强大的生物信息分析功能。'
      },
      { 
        id: 3, 
        title: '新药研发突破', 
        type: '新闻', 
        category: 'news',
        route: '/news',
        description: '我们在抗癌药物研发方面取得重大突破，相关成果已发表在国际顶级期刊。'
      },
      { 
        id: 4, 
        title: '公司发展历程', 
        type: '关于我们', 
        category: 'about',
        route: '/about',
        description: '了解公司从初创到成长为现代化医疗科技企业的发展历程。'
      },
      { 
        id: 5, 
        title: '专业团队介绍', 
        type: '关于我们', 
        category: 'about',
        route: '/about',
        description: '认识我们的顶尖人才团队，包括院士领衔的研发团队。'
      },
      { 
        id: 6, 
        title: '国际合作项目', 
        type: '关于我们', 
        category: 'about',
        route: '/about',
        description: '与全球顶尖医疗机构合作，共同推动医疗技术发展。'
      },
      { 
        id: 7, 
        title: 'AI辅助诊断系统', 
        type: '产品', 
        category: 'products',
        route: '/products',
        description: '搭载人工智能技术的影像诊断设备，提高诊断准确率。'
      },
      { 
        id: 8, 
        title: '核酸检测平台', 
        type: '产品', 
        category: 'products',
        route: '/products',
        description: '全自动高通量核酸检测平台，为疫情防控提供有力支持。'
      },
      { 
        id: 9, 
        title: '技术论坛活动', 
        type: '新闻', 
        category: 'news',
        route: '/news',
        description: '成功举办年度医疗科技技术创新论坛，分享最新研究成果。'
      },
      { 
        id: 10, 
        title: '联系我们', 
        type: '联系', 
        category: 'contact',
        route: '/contact',
        description: '获取我们的联系信息，随时为您提供专业服务。'
      }
    ]
    
    const performSearch = () => {
      if (!searchQuery.value.trim()) {
        results.value = []
        return
      }
      
      loading.value = true
      
      // 模拟搜索延迟
      setTimeout(() => {
        const query = searchQuery.value.toLowerCase().trim()
        const filteredResults = searchData.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.type.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        )
        
        results.value = filteredResults
        loading.value = false
      }, 500)
    }
    
    const navigateToResult = (result) => {
      router.push(result.route)
    }
    
    onMounted(() => {
      searchQuery.value = route.query.q || ''
      if (searchQuery.value) {
        performSearch()
      }
    })
    
    watch(() => route.query.q, (newQuery) => {
      searchQuery.value = newQuery || ''
      if (searchQuery.value) {
        performSearch()
      }
    })
    
    return {
      searchQuery,
      results,
      loading,
      navigateToResult
    }
  }
}
</script>

<style scoped>
.search-results {
  padding: 8rem 2rem 5rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.search-header {
  text-align: center;
  margin-bottom: 3rem;
}

.search-header h1 {
  font-size: 2.5rem;
  color: #2c5530;
  margin-bottom: 1rem;
}

.search-header p {
  font-size: 1.1rem;
  color: #666;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2c5530;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.results-count {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.results-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.result-content {
  flex: 1;
}

.result-title {
  color: #2c5530;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.result-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.result-type,
.result-category {
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.result-type {
  background: #e7f3e8;
  color: #2c5530;
}

.result-category {
  background: #f0f0f0;
  color: #666;
}

.result-description {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.result-arrow {
  color: #2c5530;
  margin-left: 1rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-icon {
  color: #ccc;
  margin-bottom: 2rem;
}

.no-results h3 {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.no-results p {
  color: #888;
  margin-bottom: 2rem;
}

.back-btn {
  background: #2c5530;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.back-btn:hover {
  background: #4a7c59;
}

@media (max-width: 768px) {
  .search-results {
    padding: 6rem 1rem 3rem;
  }
  
  .search-header h1 {
    font-size: 2rem;
  }
  
  .result-card {
    padding: 1rem;
  }
  
  .result-title {
    font-size: 1.1rem;
  }
  
  .result-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
[file content end]