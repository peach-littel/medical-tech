<template>
  <section id="services" class="services section-padding">
    <div class="container">
      <!-- 标题区域 -->
      <div class="section-head text-center mb-12">
        <h5 class="section-tag">核心服务</h5>
        <h2 class="section-main-title">我们的专业服务</h2>
        <div class="title-divider mx-auto my-4"></div>
        <p class="section-desc max-w-2xl mx-auto">
          凭借先进技术与专业团队，为医疗科研机构提供从基因检测到临床应用的全链条解决方案，
          助力精准医疗发展
        </p>
      </div>

      <!-- 服务卡片区域 -->
      <div class="services-container">
        <!-- 服务卡片1 -->
        <div class="service-item">
          <div class="service-icon-box">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
              </svg>
            </div>
          </div>
          <div class="service-info">
            <img src="/images/image2.png" alt="全基因组测序服务" class="service-img">
            <h3 class="service-title">全基因组测序</h3>
            <p class="service-text">
              采用高通量测序技术，对人类全基因组进行全面解析，提供肿瘤易感基因检测、遗传病筛查等精准医疗方案，数据准确率达99.99%。
            </p>
            <div class="service-meta">
              <span class="meta-item">30x深度覆盖</span>
              <span class="meta-item">专业解读</span>
              <span class="meta-item">CLIA认证</span>
            </div>
            <a href="#contact" class="service-more">查看详情 <i class="arrow-icon"></i></a>
          </div>
        </div>

        <!-- 服务卡片2 -->
        <div class="service-item">
          <div class="service-icon-box">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
            </div>
          </div>
          <div class="service-info">
            <img src="/images/service1.png" alt="生物信息分析服务" class="service-img">
            <h3 class="service-title">生物信息分析</h3>
            <p class="service-text">
              基于AI算法的生物数据深度挖掘服务，提供基因表达分析、蛋白质结构预测及代谢组学研究支持，助力科研成果转化。
            </p>
            <div class="service-meta">
              <span class="meta-item">定制流程</span>
              <span class="meta-item">多组学整合</span>
              <span class="meta-item">可视化报告</span>
            </div>
            <a href="#contact" class="service-more">了解方案 <i class="arrow-icon"></i></a>
          </div>
        </div>

        <!-- 服务卡片3 -->
        <div class="service-item">
          <div class="service-icon-box">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 8a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/>
                <path d="M7 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V0z"/>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.563L4 13.101V2a1 1 0 0 0-1-1z"/>
              </svg>
            </div>
          </div>
          <div class="service-info">
            <img src="/images/service2.png" alt="临床检测服务" class="service-img">
            <h3 class="service-title">临床检测服务</h3>
            <p class="service-text">
              提供分子诊断、病理检测等临床检测服务，配备全自动检测平台，实现样本接收至报告生成的全流程标准化管理，检测周期缩短30%。
            </p>
            <div class="service-meta">
              <span class="meta-item">24小时速测</span>
              <span class="meta-item">CAP认证</span>
              <span class="meta-item">电子报告</span>
            </div>
            <a href="#contact" class="service-more">服务流程 <i class="arrow-icon"></i></a>
          </div>
        </div>

        <!-- 服务卡片4 -->
        <div class="service-item">
          <div class="service-icon-box">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.388-.893-1.33.134-2.458.033-3.112-.752V3.573zm2.673.056c-1.454-.18-3.176.166-4.165 1.042-.99.876-.957 2.308.152 3.187l3.586 3.179a.5.5 0 0 0 .622.033l1.508-1.371c1.109-.92.162-2.311-.153-3.186-.989-.876-2.71-1.222-4.165-1.042zM8 5.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </div>
          </div>
          <div class="service-info">
            <img src="/images/service3.png" alt="智能设备部署服务" class="service-img">
            <h3 class="service-title">智能设备部署</h3>
            <p class="service-text">
              提供医疗设备整体解决方案，包括AI辅助诊断系统、高通量核酸检测平台等设备的安装调试、技术培训及售后支持。
            </p>
            <div class="service-meta">
              <span class="meta-item">定制配置</span>
              <span class="meta-item">7×24支持</span>
              <span class="meta-item">维护计划</span>
            </div>
            <a href="#contact" class="service-more">设备详情 <i class="arrow-icon"></i></a>
          </div>
        </div>
      </div>

      <!-- 咨询按钮 -->
      <div class="service-cta text-center mt-10">
        <a href="#contact" class="btn-primary">
          定制服务方案
          <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SerVices',
  data() {
    return {}
  }
}
</script>

<style scoped>
/* 基础样式 */
.section-padding {
  padding: 7rem 2rem;
  background-color: #f9faf9;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center {
  text-align: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.max-w-2xl {
  max-width: 42rem;
}

/* 标题样式 */
.section-head {
  margin-bottom: 4rem;
}

.section-tag {
  color: #2c5530;
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 0.5rem 0;
}

.section-main-title {
  color: #1a374d;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.title-divider {
  width: 60px;
  height: 3px;
  background-color: #2c5530;
  border-radius: 3px;
}

.section-desc {
  color: #666;
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0;
}

/* 服务容器 */
.services-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

/* 服务项样式 */
.service-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.service-item:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* 服务图标 */
.service-icon-box {
  background-color: #f1f8f2;
  padding: 1.2rem;
  display: flex;
  justify-content: flex-end;
}

.service-icon {
  width: 40px;
  height: 40px;
  color: #2c5530;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(44, 85, 48, 0.15);
}

/* 服务信息 */
.service-info {
  padding: 1.8rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1.2rem;
}

.service-title {
  color: #1a374d;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 0.8rem 0;
}

.service-text {
  color: #666;
  font-size: 0.98rem;
  line-height: 1.6;
  margin: 0 0 1.2rem 0;
  flex: 1;
}

/* 服务元数据 */
.service-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.meta-item {
  font-size: 0.85rem;
  color: #2c5530;
  background-color: #f1f8f2;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
}

/* 服务链接 */
.service-more {
  color: #2c5530;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  margin-top: auto;
  width: fit-content;
}

.arrow-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-left: 5px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='%232c5530' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'/%3E%3C/svg%3E");
  transition: transform 0.3s ease;
}

.service-more:hover {
  color: #1a374d;
}

.service-more:hover .arrow-icon {
  transform: translateX(3px);
}

/* 按钮样式 */
.service-cta {
  margin-top: 3rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  background-color: #2c5530;
  color: #fff;
  padding: 0.9rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background-color: #1a374d;
  transform: translateY(-2px);
}

.btn-icon {
  margin-left: 8px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .section-main-title {
    font-size: 2rem;
  }

  .services-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-padding {
    padding: 5rem 1rem;
  }

  .section-main-title {
    font-size: 1.7rem;
  }

  .services-container {
    grid-template-columns: 1fr;
  }

  .service-img {
    height: 140px;
  }
}
</style>
