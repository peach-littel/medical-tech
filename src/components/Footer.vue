<template>
  <footer>
    <div class="footer">
      <div class="footer-content">
        <!-- 左侧 品牌信息 -->
        <div class="footer-section">
          <h3>Medical.Tech</h3>
          <span>创新医疗技术，创造健康未来</span>
        </div>
        <!-- 中间 快速导航 -->
         <div class="footer-section">
          <ul>
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
          </ul>
         </div>
        <!-- 右侧 联系信息 -->
        <div class="footer-section">
          <h4>联系我们</h4>
          <p>电话: +86 10 1234 5678</p>
          <p>邮箱: info#medicaltech.cn</p>
        </div>
      </div>
      <!-- 底部版权信息 -->
      <div class="footer-bottom">
        <p>&copy; 2025 Medical.Tech 版权所有</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default{
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name:'Footer'
}
</script>

<style scoped>
.footer{
  background: #2a482d;
  color: white;
  padding: 1.5rem 5rem 1rem;
}
.footer-content{
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-section h3{
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.footer-section h4{
  margin-bottom: 1rem;
  padding: 0rem 6rem 0rem;
}
.footer-section p{
  margin-bottom: 1rem;
  padding: 0rem 6rem 0rem;
}

.footer-section ul{
  list-style: none;
  padding: 0rem 9rem 0rem;
}
.footer-section ul li{
  margin-bottom: 0.5rem;
}
.footer-section a{
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}
.footer-section a:hover{
  color: white;
}
.footer-bottom{
  padding-top: 1rem;
  border-top:1px solid #4a7c59 ;
  text-align: center;
  color: #ccc;
  height: 30px;
}
</style>