<template>
  <section id="about" class="about-section">
    <!-- 顶部横幅区域 -->
    <div class="about-banner">
      <div class="banner-overlay">
        <div class="container">
          <h1 class="banner-title">关于我们</h1>
          <p class="banner-subtitle">智启医疗,惠泽民生</p>
        </div>
      </div>
    </div>

    <!-- 公司简介 -->
    <div class="container about-intro">
      <div class="intro-content">
        <h2 class="section-title">公司概述</h2>
        <p>XX医疗科技有限公司自20XX年应运而生,便以"智启医疗,惠泽民生"为初心使命,深耕医疗技术领域十五载。在时代浪潮的淬炼中,公司始终秉持"创新为核、品质为基、合作共赢"的发展理念,从最初专注于精准医疗设备研发的初创企业,逐步成长为集医疗技术研发、设备智造、临床转化、国际合作于一体的现代化医疗科技企业,为全球医疗健康事业发展注入持续动能。</p>
      </div>
      <div class="intro-image">
        <img src="../assets/company.png" alt="公司办公环境" class="rounded-lg shadow-lg">
      </div>
    </div>

    <!-- 发展历程时间线 -->
    <div class="timeline-section">
      <div class="container">
        <h2 class="section-title">发展历程</h2>
        <div class="timeline">
          <div class="timeline-item" v-for="(item, index) in timelineData" :key="index">
            <div class="timeline-date">{{ item.year }}</div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心数据 -->
    <div class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2c5530" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
              </svg>
            </div>
            <CountUp :end="50" suffix="+" />
            <div class="stat-label">研发项目</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2c5530" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
              </svg>
            </div>
            <CountUp :end="100" suffix="+" />
            <div class="stat-label">专业团队</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2c5530" viewBox="0 0 16 16">
                <path d="M12.163 13.163a3 3 0 0 1-3.464 0l-.289-.29.29-.289a3 3 0 0 1 0-3.464l-.707-.707a3 3 0 0 1 0-3.464l.29-.289-.289-.29a3 3 0 0 1 0-3.464l-.289-.29.29-.289a3 3 0 0 1 3.464 0l.289.29-.29.289a3 3 0 0 1 3.464 0l.707.708a3 3 0 0 1 0 3.464l-.29.289.289.29a3 3 0 0 1 0 3.464l-.289.29-.29-.289a3 3 0 0 1-3.464 0zM8 10.93a2.93 2.93 0 1 0 0-5.86 2.93 2.93 0 0 0 0 5.86z"/>
              </svg>
            </div>
            <CountUp :end="10" suffix="+" />
            <div class="stat-label">国际合作</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2c5530" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm-3.646 6.646a.5.5 0 0 1 .708.708L4.707 8.707l2.646 2.647a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3zm7.292 0a.5.5 0 0 0-.708.708L11.293 8.707l-2.646 2.647a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L11.293 7.293 8.646 4.646a.5.5 0 1 0-.708.708l2.647 2.646L8.646 9.354a.5.5 0 1 0 .708.708l2.647-2.647 2.646 2.647a.5.5 0 0 0 .708-.708l-3-3z"/>
              </svg>
            </div>
            <CountUp :end="80" suffix="+" />
            <div class="stat-label">覆盖国家</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 团队与合作 -->
    <div class="team-cooperation">
      <div class="container">
        <div class="team-section">
          <h2 class="section-title">专业团队</h2>
          <p class="section-desc">人才是创新的第一资源，公司始终将团队建设置于战略高度。目前，公司核心研发团队由3名两院院士领衔，汇聚了来自国内外顶尖医学院校、工程院校及知名医疗企业的专业人才。</p>
          
          <div class="team-grid">
            <div class="team-card" v-for="(member, index) in teamMembers" :key="index">
              <div class="team-photo">
                <img :src="member.photo" :alt="member.name">
              </div>
              <div class="team-info">
                <h3>{{ member.name }}</h3>
                <p class="team-position">{{ member.position }}</p>
                <p class="team-bio">{{ member.bio }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="cooperation-section">
          <h2 class="section-title">国际合作</h2>
          <p class="section-desc">在全球化发展进程中，公司始终坚持"引进来、走出去"相结合，积极搭建国际合作桥梁，与全球顶尖机构建立长期战略合作关系。</p>
          
          <div class="partners-grid">
            <div class="partner-logo" v-for="(partner, index) in partners" :key="index">
              <img :src="partner.logo" :alt="partner.name">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 荣誉资质 -->
    <div class="awards-section">
      <div class="container">
        <h2 class="section-title">荣誉资质</h2>
        <div class="awards-grid">
          <div class="award-card" v-for="(award, index) in awards" :key="index">
            <img :src="award.image" :alt="award.title">
            <h3>{{ award.title }}</h3>
            <p>{{ award.year }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CountUp from 'vue-countup-v3'

export default {
  name: 'AboutUs',
  components: {
    CountUp
  },
  setup() {

    // 时间线数据
    const timelineData = [
      {
        year: '2008',
        title: '公司成立',
        description: '在上海张江科学城正式成立，初期聚焦肿瘤早期诊断设备的核心技术攻关'
      },
      {
        year: '2012',
        title: '产业化突破',
        description: '建成国内首个精准医疗设备中试基地，实现核心技术从实验室到产业化的关键跨越'
      },
      {
        year: '2016',
        title: '智能化转型',
        description: '启动"智联医疗生态"战略，将人工智能技术与医疗设备深度融合'
      },
      {
        year: '2020',
        title: '抗疫贡献',
        description: '紧急研发出全自动核酸提取仪等抗疫关键设备，为疫情防控提供有力支撑'
      },
      {
        year: '2023',
        title: '全球化布局',
        description: '海外研发中心在德国慕尼黑正式启用，全球化战略迈入新阶段'
      }
    ]

    // 团队成员数据
    const teamMembers = [
      {
        name: '张明教授',
        position: '首席科学家',
        bio: 'XX工程院院士，肿瘤诊断领域权威专家，拥有30年临床与研究经验',
        photo: 'src/assets/professor1.png'
      },
      {
        name: '李华博士',
        position: '研发总监',
        bio: '前XX诊所研究员，在精准医疗领域发表论文50余篇',
        photo: 'src/assets/professor2.png'
      },
      {
        name: '王静教授',
        position: 'XX实验室主任',
        bio: 'XX大学计算机系博士，专注于医疗人工智能算法研究',
        photo: 'src/assets/professor3.png'
      }
    ]

    // 合作伙伴数据
    const partners = [
      { name: '梅奥诊所', logo: 'src/assets/MAYO.png' },
      { name: '奥林巴斯', logo: 'src/assets/Olympus.png' },
      { name: '慕尼黑大学', logo: 'src/assets/LMU.png' },
      { name: '约翰·霍普金斯医院', logo: 'src/assets/Johns.png' }
    ]

    // 荣誉资质数据
    const awards = [
      {
        title: '国家科学技术进步奖二等奖',
        year: '2022',
        image: 'src/assets/award2.png'
      },
      {
        title: '国家级专精特新"小巨人"企业',
        year: '2021',
        image: 'src/assets/award1.png'
      },
      {
        title: 'ISO13485医疗器械质量管理体系认证',
        year: '2020',
        image: 'src/assets/award3.png'
      },
      {
        title: '中国医疗设备行业创新领军企业',
        year: '2019',
        image: 'src/assets/award.png'
      }
    ]

    return {
      timelineData,
      teamMembers,
      partners,
      awards
    }
  }
}
</script>

<style scoped>
/* 基础样式 */
.about-section {
  font-family: 'Noto Sans SC', sans-serif;
  color: #333;
  line-height: 1.8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  color: #2c5530;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 60px;
  height: 3px;
  background-color: #2c5530;
}

/* 横幅区域 */
.about-banner {
  height: 40vh;
  background: url('../assets/image3.png') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(44, 85, 48, 0.7);
  display: flex;
  align-items: center;
}

.banner-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
}

.banner-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* 公司简介 */
.about-intro {
  padding: 6rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.intro-content p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.intro-image img {
  width: 100%;
  height: auto;
}

/* 时间线 */
.timeline-section {
  background-color: #f8f9fa;
  padding: 6rem 0;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 4rem auto 0;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: #2c5530;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
  border-radius: 3px;
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  margin-bottom: 3rem;
}

.timeline-item:nth-child(odd) {
  left: 0;
}

.timeline-item:nth-child(even) {
  left: 50%;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border: 4px solid #2c5530;
  border-radius: 50%;
  top: 15px;
  z-index: 1;
}

.timeline-item:nth-child(odd)::after {
  right: -13px;
}

.timeline-item:nth-child(even)::after {
  left: -13px;
}

.timeline-date {
  font-weight: bold;
  color: #2c5530;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.timeline-content {
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.timeline-content h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

/* 统计数据 */
.stats-section {
  padding: 6rem 0;
  background-color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.stat-card {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 3rem;
  font-weight: bold;
  color: #2c5530;
  margin: 1rem 0;
}

.stat-label {
  font-size: 1.1rem;
  color: #555;
}

/* 团队与合作 */
.team-cooperation {
  padding: 6rem 0;
  background-color: #f8f9fa;
}

.team-section, .cooperation-section {
  margin-bottom: 6rem;
}

.section-desc {
  font-size: 1.1rem;
  color: #555;
  max-width: 800px;
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.team-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-photo img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.team-info {
  padding: 1.5rem;
}

.team-position {
  color: #2c5530;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.team-bio {
  color: #555;
  font-size: 0.95rem;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
  justify-items: center;
}

.partner-logo img {
  max-height: 80px;
  max-width: 180px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.partner-logo img:hover {
  opacity: 1;
  transform: scale(1.05);
}

/* 荣誉资质 */
.awards-section {
  padding: 6rem 0;
  background-color: white;
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.award-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.award-card:hover {
  transform: translateY(-5px);
}

.award-card img {
  max-height: 120px;
  margin-bottom: 1rem;
}

.award-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.award-card p {
  color: #777;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .about-intro {
    grid-template-columns: 1fr;
  }
  
  .timeline::after {
    left: 31px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }
  
  .timeline-item:nth-child(even) {
    left: 0;
  }
  
  .timeline-item::after {
    left: 18px;
  }
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 2.2rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .about-intro, .timeline-section, .stats-section, 
  .team-cooperation, .awards-section {
    padding: 4rem 0;
  }
}

@media (max-width: 576px) {
  .banner-title {
    font-size: 1.8rem;
  }
  
  .stats-grid, .team-grid, .awards-grid {
    grid-template-columns: 1fr;
  }
}


/* 针对团队照片（固定高度300px），确保父容器有高度 */
.team-photo {
  height: 200px; /* 和你样式中 .team-photo img 的 height 一致 */
  overflow: hidden; /* 避免图片超出容器 */
}
</style>