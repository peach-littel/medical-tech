<template>
  <div class="product-detail">
    <h2>产品详情 #{{ productid }}</h2>
    <!-- 这里可以根据 productId 展示对应产品的详细信息 -->
    <p>正在加载 ID 为 {{ productid }} 的产品数据...</p>
    <router-link to="/products">返回产品列表</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

// 获取路由参数中的 id（如 /products/1 中的 "1"）
const route = useRoute()
const productid = route.params.id // 类型为字符串，如需数字可转换：Number(route.params.id)
</script>

<style scoped>
.product-detail {
  padding: 20px;
}
</style>
