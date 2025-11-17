<template>
  <section id="news" class="news">
    <div class="container">
      <h1>最新动态</h1>
      <div class="news-gird">
        <article class="news-card">
          <h3>新药研发突破</h3>
          <img src="../assets/image2.png" alt="">
          <p class="date"> 20xx年x月x日</p>
          <p>我们在抗癌药物研发方面取得重大突破...</p>
        </article>
        <article class="news-card">
          <h3>国际合作</h3>
          <img src="../assets/image3.png" alt="">
          <p class="date"> 20xx年x月x日</p>
          <p>与XX生物科技公司达成战略合作...</p>
        </article>
        <article class="news-card">
          <h3>技术论坛成功举办</h3>
          <img src="../assets/image4.png" alt="">
          <p class="date"> 20xx年x月x日</p>
          <p>成功举办年度医疗科技技术创新论坛...</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default{
  name:'NewS'
}
</script>

<style scoped>
.news{
  padding: 5rem 2rem;
}
.news h1{
  text-align: center;
  font-size: 2.5rem;
  color: #2c5530;
  margin-bottom: 3rem;
  margin-top: 30px;
}
.news-gird{
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.news-card{
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}
.news-card h3{
  color: #2c5530;
  margin-bottom: 0.5rem;
}
.date{
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.news-card p:first-child{
  color: #666;
  line-height: 1.6;
}
.news-card img{
  width: 250px;
  height: 200px;
}
</style>