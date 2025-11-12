<template>
  <section id="services" class="services">
    <div class="container">
      <h1>我们的服务</h1>
      <div class="services-gird">
        <div class="services-card">
          <img src="../assets/image.png" alt="">
          <h3>基因测序</h3>
          <p>提供全面的基因测序服务，支持科研和临床诊断</p>
          <a href="#products">了解详情</a>
        </div>
        <div class="services-card">
          <img src="../assets/image1.png" alt="">
          <h3>基因测序</h3>
          <p>提供全面的基因测序服务，支持科研和临床诊断</p>
          <a href="#">了解详情</a>
        </div>
        <div class="services-card">
          <img src="../assets/image2.png" alt="">
          <h3>基因测序</h3>
          <p>提供全面的基因测序服务，支持科研和临床诊断</p>
          <a href="#">了解详情</a>
        </div>
        <div class="services-card">
          <img src="../assets/image4.png" alt="">
          <h3>基因测序</h3>
          <p>提供全面的基因测序服务，支持科研和临床诊断</p>
          <a href="#">了解详情</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default{
  // eslint-disable-next-line vue/multi-word-component-names
  name:"Services"
}
</script>

<style scoped>
.services{
  padding: 5rem 2rem;
}
.services h1{
text-align: center;
font-size: 2.5rem;
color: #2c5530;
margin-bottom: 3rem;
margin-top: 30px;
}

.services-gird{
  display: flex;
  /* 最小250px：确保卡片有足够显示空间 等分剩余空间：1fr 让卡片平均分配宽度 */
  grid-template-columns: repeat(auto-fit,minmax(150px,1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
.services-card{
  background: white;
  border-radius: 10px;
  padding: 2rem;
  /* 阴影 */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  /* 悬浮动画 */
  transition: transform 0.3s;
}
.services-card:hover{
  /* 悬浮上浮效果 */
  transform: translateY(-10px);
}
.services-card h3{
  color: #2c5530;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
.services-card p{
  color: #666;
  line-height: 1.6;
  text-align: left;
}
.services-card a{
  text-decoration: none;
}
.services-card a:hover{
  color: #2c5530;
}
.services-card img{
  width: 250px;
  height: 200px;
}
</style>