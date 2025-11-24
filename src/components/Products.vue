<template>
  <section id="products" class="products">
    <div class="container">
      <!-- 页面标题与简介 -->
      <div class="section-intro">
        <h1>产品中心</h1>
        <p class="intro-desc">
          依托前沿科技与临床需求深度融合，我们提供涵盖生物分析、基因检测、智能诊断等领域的专业解决方案，
          助力医疗科研与临床应用高效推进。
        </p>
      </div>

      <!-- 产品分类筛选（新增） -->
      <div class="product-filters">
        <button
          v-for="filter in filters"
          :key="filter.id"
          :class="{'active': activeFilter === filter.id}"
          @click="activeFilter = filter.id"
        >
          {{ filter.name }}
        </button>
      </div>

      <!-- 产品网格 -->
      <div class="products-grid">
        <div
          class="products-card"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <!-- 产品标签（如新品/热门） -->
          <div class="product-tag" v-if="product.tag">
            {{ product.tag }}
          </div>

          <img
            :src="product.imgUrl"
            :alt="product.altText"
            class="product-img"
          >

          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-desc">{{ product.description }}</p>

            <!-- 产品核心特点（新增） -->
            <ul class="product-features">
              <li v-for="(feature, idx) in product.features" :key="idx">
                {{ feature }}
              </li>
            </ul>

            <!-- 查看详情按钮 -->
            <router-link
              :to="product.detailUrl"
              class="detail-btn"
            >
              查看详情 <i class="arrow-icon">→</i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Products",
  data() {
    return {
      // 产品分类筛选
      filters: [
        { id: 'all', name: '全部产品' },
        { id: 'software', name: '分析软件' },
        { id: 'equipment', name: '检测设备' },
        { id: 'service', name: '配套服务' }
      ],
      activeFilter: 'all',

      // 产品数据（结构化管理，便于维护）
      products: [
        {
          id: 1,
          title: "基因测序数据分析系统",
          tag: "热门",
          category: "software",
          description: "针对高通量测序数据的专业分析平台，支持全基因组、外显子组等多类型数据解读",
          features: ["AI辅助变异位点识别", "临床数据库联动", "自动化报告生成"],
          imgUrl: "src/assets/product1.png",
          altText: "基因测序数据分析系统界面展示",
          detailUrl: "/products/1"
        },
        {
          id: 2,
          title: "全自动核酸提取仪",
          tag: "新品",
          category: "equipment",
          description: "高通量自动化核酸提取设备，适用于临床样本快速处理，减少人工操作误差",
          features: ["96孔板同步处理", "封闭式提取防污染", "适配多种样本类型"],
          imgUrl: "src/assets/product2.png",
          altText: "全自动核酸提取仪实物图",
          detailUrl: "/products/2"
        },
        {
          id: 3,
          title: "病理切片智能分析软件",
          category: "software",
          description: "基于深度学习的数字病理分析工具，辅助病理医师进行快速精准诊断",
          features: ["HE染色自动识别", "肿瘤区域定量分析", "多中心数据协同"],
          imgUrl: "src/assets/product3.png",
          altText: "病理切片智能分析软件操作界面",
          detailUrl: "/products/3"
        },
        {
          id: 4,
          title: "临床检测配套服务",
          category: "service",
          description: "提供从样本处理到数据分析的一站式检测服务，支持科研合作与临床转化",
          features: ["ISO15189认证实验室", "72小时快速周转", "定制化分析方案"],
          imgUrl: "src/assets/product5.png",
          altText: "临床检测实验室场景",
          detailUrl: "/products/4"
        }
      ]
    };
  },
  computed: {
    // 根据筛选条件过滤产品
    filteredProducts() {
      if (this.activeFilter === 'all') return this.products;
      return this.products.filter(product => product.category === this.activeFilter);
    }
  }
};
</script>

<style scoped>
.products {
  padding: 5rem 2rem;
  background: #f8f9fa;
}

/* 标题与简介 */
.section-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.section-intro h1 {
  font-size: 2.5rem;
  color: #2c5530;
  margin-bottom: 1.5rem;
  margin-top: 30px;
  font-weight: bolder;
}

.intro-desc {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: left;
}

/* 筛选按钮 */
.product-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.product-filters button {
  background: white;
  border: 1px solid #ddd;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.product-filters button.active {
  background: #2c5530;
  color: white;
  border-color: #2c5530;
}

.product-filters button:hover:not(.active) {
  border-color: #2c5530;
  color: #2c5530;
}

/* 产品网格 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* 产品卡片 */
.products-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.products-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

/* 产品标签 */
.product-tag {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #e74c3c;
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
}

.product-tag:nth-child(2) {
  background: #27ae60; /* 新品标签绿色 */
}

/* 产品图片 */
.product-img {
  width: 100%;
  height: 200px;
  object-fit: contain; /* 保持图片比例，避免拉伸 */
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}

/* 产品信息 */
.product-info {
  text-align: left;
}

.product-title {
  color: #2c5530;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.product-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  font-size: 1rem;
}

/* 产品特点 */
.product-features {
  list-style-type: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.product-features li {
  color: #555;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.product-features li::before {
  content: "•";
  color: #2c5530;
  font-weight: bold;
  position: absolute;
  left: 0.5rem;
}

/* 详情按钮 */
.detail-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c5530;
  font-weight: 600;
  text-decoration: none;
  padding: 0.6rem 0;
  transition: color 0.3s;
}

.detail-btn:hover {
  color: #1a3d20;
}

.arrow-icon {
  font-size: 1.1rem;
  transition: transform 0.3s;
}

.detail-btn:hover .arrow-icon {
  transform: translateX(3px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .section-intro h1 {
    font-size: 2rem;
  }

  .products {
    padding: 3rem 1rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-img {
    height: 180px;
  }
}
</style>
