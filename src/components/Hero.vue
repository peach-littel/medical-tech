<!-- src/components/Hero.vue -->
<template>
  <!-- 网站首屏轮播展示 -->
  <section id="home" class="hero">
    <!-- Swiper轮播容器 -->
    <div class="swiper" ref="swiperContainer">
      <!-- 轮播项容器 -->
      <div class="swiper-wrapper">
        <!-- 轮播项1：图片背景 -->
        <div class="swiper-slide">
          <img src="../assets/image.png" alt="医疗科技图片" class="slide-media">
          <div class="hero-contant">
            <h1>医疗科技</h1>
            <p>致力于推动医疗领域的创新性发展</p>
            <button class="btn btn-primary" @click="navigateTo('/products')">了解更多</button>
          </div>
        </div>

        <!-- 轮播项2：图片背景 -->
        <div class="swiper-slide">
          <img src="../assets/image3.png" alt="医疗科技图片" class="slide-media">
          <div class="hero-contant">
            <h1>专业团队</h1>
            <p>提供全面的医疗服务，支持临床诊断</p>
            <button class="btn btn-primary" @click="navigateTo('/services')">了解更多</button>
          </div>
        </div>

        <!-- 轮播项3：图片背景 -->
        <div class="swiper-slide">
          <img src="../assets/image1.png" alt="医疗创新图片" class="slide-media">
          <div class="hero-contant">
            <h1>全球合作</h1>
            <p>携手顶尖机构共创医疗未来</p>
            <button class="btn btn-primary" @click="navigateTo('/contact')">合作咨询</button>
          </div>
        </div>
      </div>

      <!-- 轮播控制按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- 轮播指示器 -->
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

export default {
  name: 'HeRo',
  setup() {
    const swiperContainer = ref(null)
    const router = useRouter()
    // eslint-disable-next-line no-unused-vars
    let swiper = null

    // 导航到指定路由
    const navigateTo = (path) => {
      router.push(path)
    }


    onMounted(() => {
      // 初始化Swiper
      swiper = new Swiper(swiperContainer.value, {
        modules: [Navigation, Pagination, Autoplay],
        loop: true, // 循环播放
        autoplay: {
          delay: 5000, // 5秒切换一次
          disableOnInteraction: false // 交互后继续自动播放
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 允许点击指示器切换
        },
        // 响应式设置
        breakpoints: {
          768: {
            slidesPerView: 1
          }
        }
      })
    })

    return {
      swiperContainer,
      navigateTo,
    }
  }
}
</script>

<style scoped>
.hero {
  height: 100vh;
  position: relative;
  overflow: hidden;
  color: white;
}

/* 轮播容器样式 */
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 媒体元素样式（图片/视频） */
.slide-media {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持比例填充容器 */
}

/* 文字内容样式 */
.hero-contant {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10; /* 确保在媒体上方 */
  padding: 0 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 2rem 3rem;
}

.hero-contant h1 {
  font-size: 3.0rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-contant p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* 按钮样式 - 与其他页面保持一致 */
.btn-primary {
  cursor: pointer;
  background-color: #2c5530;
  color: white;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  border-radius: 5px;
  font-weight: 500;
  border: none;
  transition: background 0.3s;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover {
  background-color: #4a7c59;
  transform: translateY(-2px);
}

/* 轮播控制按钮样式 */
.swiper-button-prev,
.swiper-button-next {
  color: white !important;
  background-color: rgba(0, 0, 0, 0.2);
  width: 50px !important;
  height: 50px !important;
  border-radius: 50%;
  top: 50% !important;
  transform: translateY(-50%) !important;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 20px !important;
}

/* 轮播指示器样式 */
.swiper-pagination-bullet {
  width: 12px !important;
  height: 12px !important;
  background-color: rgba(255, 255, 255, 0.6) !important;
}

.swiper-pagination-bullet-active {
  background-color: white !important;
  width: 30px !important;
  border-radius: 6px !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-contant h1 {
    font-size: 2rem;
  }

  .hero-contant p {
    font-size: 1.2rem;
  }

  .btn-primary {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
}
</style>
