<template>
  <section id="products" class="products">
    <div class="container">
      <h1>产品展示</h1>
      <div class="products-gird">
        <div class="products-card">
          <img src="../assets/product1.png" alt="">
          <h3>生物分析软件</h3>
          <p>专业数据分析平台</p>
        </div>
        <div class="products-card">
          <img src="../assets/product2.png" alt="">
          <h3>生物分析软件</h3>
          <p>专业数据分析平台</p>
        </div>
        <div class="products-card">
          <img src="../assets/product3.png" alt="">
          <h3>生物分析软件</h3>
          <p>专业数据分析平台</p>
        </div>
        <div class="products-card">
          <img src="../assets/product4.png" alt="">
          <h3>生物分析软件</h3>
          <p>专业数据分析平台</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default{
  // eslint-disable-next-line vue/multi-word-component-names
  name:"Products"
}
</script>

<style scoped>
.products{
  padding: 5rem 2rem;
  background: #f8f9fa;
}
.products h1{
text-align: center;
font-size: 2.5rem;
color: #2c5530;
margin-bottom: 3rem;
margin-top: 30px;
}

.products-gird{
  display: grid;
  /* 最小250px：确保卡片有足够显示空间 等分剩余空间：1fr 让卡片平均分配宽度 */
  grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
.products-card{
  background: white;
  border-radius: 10px;
  padding: 2rem;
  /* 阴影 */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  /* 悬浮动画 */
  /* transition: transform 0.3s; */
}
.products-card:hover{
  /* 悬浮上浮效果 */
  transform: translateY(-10px);
}
.products-card h3{
  color: #2c5530;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
.products-card p{
  color: #666;
  text-align: left;
}
.products-card a{
  text-decoration: none;
}
.products-card a:hover{
  color: #2c5530;
}
.products img{
  width: 250px;
  height: 200px;
}
</style>