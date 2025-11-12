// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// 导入各个功能组件
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Services from '../components/Services.vue'
import Products from '../components/Products.vue'
import News from '../components/News.vue'
import Contact from '../components/Contact.vue'

// 定义路由规则
const routes = [
  { path: '/', name: 'Home', component: Hero }, // 首页对应 Hero 组件
  { path: '/about', name: 'About', component: About }, // 关于我们页面
  { path: '/services', name: 'Services', component: Services }, // 服务页面
  { path: '/products', name: 'Products', component: Products } ,// 产品页面
  { path: '/news', name: 'News', component: News }, // 新闻页面
  { path: '/contact', name: 'Contact', component: Contact }, // 联系页面

]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router