<template>
  <div class="news-detail">
    <h2>新闻详情 #{{ newsid }}</h2>
    <!-- 这里可以根据 newsId 展示对应新闻的详细信息 -->
    <p>正在加载 ID 为 {{ newsid }} 的新闻数据...</p>
    <router-link to="/news">返回新闻列表</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'


// 获取路由参数中的 id（如 /news/2 中的 "2"）
const route = useRoute()
const newsid = route.params.id
</script>

<style scoped>
.news-detail {
  padding: 20px;
}
</style>
