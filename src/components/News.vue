<template>
  <section id="news" class="news">
    <div class="container">
      <!-- 页面标题与简介 -->
      <div class="section-intro">
        <h1>最新动态</h1>
        <p class="intro-desc">
          及时了解公司在医疗科技领域的研发进展、学术合作、行业动态及社会责任等最新信息，
          见证我们为医疗健康事业带来的每一步突破。
        </p>
      </div>

      <!-- 新闻分类筛选 -->
      <div class="news-filters">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          :class="{'active': activeFilter === filter.id}"
          @click="activeFilter = filter.id"
        >
          {{ filter.name }}
        </button>
      </div>

      <!-- 新闻列表 -->
      <div class="news-list">
        <article 
          class="news-item" 
          v-for="item in filteredNews" 
          :key="item.id"
        >
          <!-- 新闻图片 -->
          <div class="news-image">
            <img 
              :src="item.imgUrl" 
              :alt="item.altText" 
              class="news-img"
            >
            <!-- 新闻标签 -->
            <div class="news-tag" v-if="item.tag">
              {{ item.tag }}
            </div>
          </div>
          
          <!-- 新闻内容 -->
          <div class="news-content">
            <div class="news-meta">
              <span class="date">{{ item.date }}</span>
              <span class="category">{{ getCategoryName(item.category) }}</span>
              <span class="read-time">{{ item.readTime }} 阅读</span>
            </div>
            
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-desc">{{ item.description }}</p>
            
            <!-- 阅读更多按钮 -->
            <router-link 
              :to="item.detailUrl" 
              class="read-more"
            >
              阅读全文 <i class="arrow-icon">→</i>
            </router-link>
          </div>
        </article>
      </div>

      <!-- 分页控件 -->
      <div class="pagination" v-if="filteredNews.length > 0">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          上一页
        </button>
        <div class="page-numbers">
          <span 
            v-for="page in totalPages" 
            :key="page"
            :class="{'current': currentPage === page}"
            @click="currentPage = page"
          >
            {{ page }}
          </span>
        </div>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          下一页
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NewsSection",
  data() {
    return {
      // 新闻分类筛选
      filters: [
        { id: 'all', name: '全部动态' },
        { id: 'research', name: '科研突破' },
        { id: 'cooperation', name: '国际合作' },
        { id: 'event', name: '行业活动' },
        { id: 'company', name: '公司动态' }
      ],
      activeFilter: 'all',
      currentPage: 1,
      pageSize: 3,
      
      // 新闻数据
      newsList: [
        {
          id: 1,
          title: "抗癌新药研发取得阶段性突破，进入临床二期试验",
          tag: "重要",
          category: "research",
          date: "2024-06-15",
          readTime: "3分钟",
          description: "公司自主研发的靶向抗肿瘤药物MT-2023已完成临床一期试验，安全性与有效性指标均优于预期，即日起正式启动二期临床试验，预计纳入200例晚期实体瘤患者...",
          imgUrl: "src/assets/product3.png",
          altText: "抗癌新药研发实验室场景",
          detailUrl: "/news/1"
        },
        {
          id: 2,
          title: "与德国慕尼黑大学医学院达成战略合作，共建联合实验室",
          category: "cooperation",
          date: "2024-05-28",
          readTime: "2分钟",
          description: "双方将聚焦精准医疗领域，围绕肿瘤早期诊断技术展开深度合作，计划三年内完成3项核心技术攻关，并推动2项成果转化...",
          imgUrl: "src/assets/image3.png",
          altText: "国际合作签约仪式",
          detailUrl: "/news/2"
        },
        {
          id: 3,
          title: "2024国际医疗科技论坛在沪成功举办，聚焦AI诊疗创新",
          tag: "热门",
          category: "event",
          date: "2024-04-10",
          readTime: "4分钟",
          description: "本次论坛汇集了12个国家的300余位专家学者，共同探讨人工智能在医学影像诊断、临床决策支持等领域的应用前景，公司CEO发表主题演讲...",
          imgUrl: "src/assets/image1.png",
          altText: "医疗科技论坛现场",
          detailUrl: "/news/3"
        },
        {
          id: 4,
          title: "公司入选国家级专精特新「小巨人」企业名单",
          category: "company",
          date: "2024-03-05",
          readTime: "1分钟",
          description: "凭借在医疗设备核心技术领域的持续创新与突破，公司成功入选第三批国家级专精特新「小巨人」企业，成为行业技术标杆...",
          imgUrl: "src/assets/award/award1.png",
          altText: "公司荣誉证书",
          detailUrl: "/news/4"
        },
        {
          id: 5,
          title: "全自动核酸检测系统获NMPA认证，助力基层医疗检测能力提升",
          category: "research",
          date: "2024-02-20",
          readTime: "2分钟",
          description: "公司自主研发的全自动核酸检测系统通过国家药品监督管理局审批，该系统检测效率较传统方法提升3倍，且操作流程简化，适合基层医疗机构普及...",
          imgUrl: "src/assets/image2.png",
          altText: "核酸检测系统设备图",
          detailUrl: "/news/5"
        }
      ]
    };
  },
  computed: {
    // 筛选后的新闻
    filteredNews() {
      const filtered = this.activeFilter === 'all' 
        ? this.newsList 
        : this.newsList.filter(item => item.category === this.activeFilter);
      
      // 分页处理
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return filtered.slice(startIndex, startIndex + this.pageSize);
    },
    // 总页数
    totalPages() {
      const filteredCount = this.activeFilter === 'all' 
        ? this.newsList.length 
        : this.newsList.filter(item => item.category === this.activeFilter).length;
      return Math.ceil(filteredCount / this.pageSize);
    }
  },
  methods: {
    // 获取分类名称
    getCategoryName(categoryId) {
      const category = this.filters.find(f => f.id === categoryId);
      return category ? category.name : '';
    }
  },
  watch: {
    // 切换筛选条件时重置页码
    activeFilter() {
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
.news {
  padding: 5rem 2rem;
  background: #fff;
}

/* 标题与简介 */
.section-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f4f1;
}

.section-intro h1 {
  font-size: 2.5rem;
  color: #2c5530;
  margin-bottom: 1.5rem;
  margin-top: 30px;
  font-weight: 700;
  position: relative;
  display: inline-block;
}

.section-intro h1::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #2c5530;
}

.intro-desc {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-top: 2rem;
}

/* 筛选按钮 */
.news-filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.news-filters button {
  background: #f8f9fa;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.news-filters button.active {
  background: #2c5530;
  color: white;
  box-shadow: 0 2px 8px rgba(44, 85, 48, 0.3);
}

.news-filters button:hover:not(.active) {
  background: #f0f4f1;
  color: #2c5530;
}

/* 新闻列表 */
.news-list {
  max-width: 1400px;
  margin: 0 auto 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 新闻项 */
.news-item {
  display: flex;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f4f1;
}

.news-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* 新闻图片区域 */
.news-image {
  flex: 0 0 300px;
  position: relative;
  overflow: hidden;
}

.news-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-item:hover .news-img {
  transform: scale(1.05);
}

/* 新闻标签 */
.news-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
}

.news-tag[text="重要"] {
  background: #e74c3c;
  color: white;
}

.news-tag[text="热门"] {
  background: #f39c12;
  color: white;
}

/* 新闻内容 */
.news-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* 元数据 */
.news-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.news-meta .category {
  color: #2c5530;
  font-weight: 500;
  padding: 0.2rem 0.6rem;
  background: #f0f4f1;
  border-radius: 4px;
}

/* 新闻标题 */
.news-title {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  transition: color 0.3s;
  line-height: 1.4;
}

.news-item:hover .news-title {
  color: #2c5530;
}

/* 新闻描述 */
.news-desc {
  color: #666;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  flex: 1;
}

/* 阅读更多按钮 */
.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c5530;
  font-weight: 600;
  text-decoration: none;
  padding: 0.6rem 0;
  transition: all 0.3s;
  width: fit-content;
  border-bottom: 2px solid transparent;
}

.read-more:hover {
  color: #1a3d20;
  border-bottom-color: #2c5530;
}

.arrow-icon {
  font-size: 1.1rem;
  transition: transform 0.3s;
}

.read-more:hover .arrow-icon {
  transform: translateX(5px);
}

/* 分页控件 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 4rem;
}

.page-btn {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: #2c5530;
  color: white;
  border-color: #2c5530;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-numbers span {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-numbers span.current {
  background: #2c5530;
  color: white;
}

.page-numbers span:hover:not(.current) {
  background: #f0f4f1;
  color: #2c5530;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .news-item {
    flex-direction: column;
  }
  
  .news-image {
    flex: 0 0 220px;
  }
}

@media (max-width: 768px) {
  .section-intro h1 {
    font-size: 2rem;
  }

  .news {
    padding: 3rem 1rem;
  }

  .news-content {
    padding: 1.5rem;
  }
  
  .news-title {
    font-size: 1.3rem;
  }
  
  .news-meta {
    gap: 1rem;
    font-size: 0.85rem;
  }
}
</style>