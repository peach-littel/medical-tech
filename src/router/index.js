// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// 导入各个功能组件
import Hero from '../components/Hero.vue'
import AboutUs from '../components/AboutUs.vue'
import Services from '../components/Services.vue'
import ProDucts from '../components/ProDucts.vue'
import News from '../components/News.vue'
import Contact from '../components/Contact.vue'

import SearchResults from '../components/SearchResults.vue'


// 定义路由规则
const routes = [
  { path: '/', name: 'HeRo', component: Hero }, // 首页对应 Hero 组件
  { path: '/about', name: 'AboutUs', component: AboutUs }, // 关于我们页面
  { path: '/services', name: 'SerVices', component: Services }, // 服务页面
  { path: '/products', name: 'ProDucts', component: ProDucts } ,// 产品页面
  { path: '/news', name: 'NewS', component: News }, // 新闻页面
  { path: '/contact', name: 'ConTact', component: Contact }, // 联系页面
  {path: '/search',name: 'SearchResults',component: SearchResults},//搜索
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router