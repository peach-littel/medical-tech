<template>
  <section id="contact" class="contact">
    <div class="container">
      <h1>联系我们</h1>
      <div class="contact-content">
        <div class="contact-info">
          <h3>联系信息</h3>
          <div class="contact-item">
            <strong>地址：</strong>
            <p>XX市XX区科技园</p>
          </div>
          <div class="contact-item">
            <strong>电话</strong>
            <p>+86 10 1234 5678</p>
          </div>
          <div class="contact-item">
            <strong>邮箱</strong>
            <p>info@medicaltech.cn</p>
          </div>
        </div>
        <div class="contact-form-wrapper">
          <!-- 未登录时显示登录/注册提示 -->
          <div v-if="!isAuthenticated" class="login-prompt">
            <h3>发送消息</h3>
            <p>请先登录以发送消息</p>
            <div class="auth-buttons">
              <button class="login-btn" @click="showLoginModal">立即登录</button>
              <button class="register-btn" @click="showRegisterModal">注册账号</button>
            </div>
          </div>
          <!-- 已登录时显示联系表单 -->
          <form v-else class="contact-form" @submit.prevent="handleSubmit">
            <input type="text" placeholder="您的姓名" v-model="form.name" required>
            <input type="email" placeholder="您的邮箱" v-model="form.email" required>
            <textarea placeholder="请输入留言" rows="5" v-model="form.message" required></textarea>
            <button type="submit" :disabled="sending">
              {{ sending ? '发送中...' : '发送消息' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default{
  name:'ConTact',
  setup() {
    const store = useStore()
    const sending = ref(false)
    
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    const user = computed(() => store.getters.currentUser)
    
    const form = reactive({
      name: '',
      email: '',
      message: ''
    })
    
    if (isAuthenticated.value && user.value) {
      form.name = user.value.name
      form.email = user.value.email
    }
    
    const showLoginModal = () => {
      const loginModalElement = document.getElementById('loginModal')
      if (loginModalElement) {
        const loginModal = new bootstrap.Modal(loginModalElement)
        loginModal.show()
      }
    }
    
    const showRegisterModal = () => {
      const registerModalElement = document.getElementById('registerModal')
      if (registerModalElement) {
        const registerModal = new bootstrap.Modal(registerModalElement)
        registerModal.show()
      }
    }
    
    const handleSubmit = async () => {
      if (!isAuthenticated.value) {
        showLoginModal()
        return
      }
      
      if (!form.name || !form.email || !form.message) {
        alert('请填写所有必填字段')
        return
      }
      
      sending.value = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('消息发送成功！')
        form.message = ''
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert('发送失败，请重试')
      } finally {
        sending.value = false
      }
    }
    
    return {
      isAuthenticated,
      form,
      sending,
      showLoginModal,
      showRegisterModal,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* 联系我们区域样式 */
.contact{
  /* 内边距：上下5rem，左右2rem */
  padding: 5rem 2rem;
  /* 浅灰色背景 */
  background: #f8f9fa;
}

/* 容器主标题样式 */
.container h1{
  /* 文字居中对齐 */
  text-align: center;
  /* 字体大小2.5rem */
  font-size: 2.5rem;
  /* 主题绿色 */
  color: #2c5530;
  /* 底部外边距3rem */
  margin-bottom: 3rem;
  margin-top: 30px;
}

/* 联系内容容器样式 */
.contact-content{
  /* 网格布局 */
  display: grid;
  /* 两列等宽布局 */
  grid-template-columns: 1fr 1fr;
  /* 列间距4rem */
  gap: 4rem;
  /* 最大宽度限制 */
  max-width: 1200px;
  /* 水平居中 */
  margin: 0 auto;
}

/* 联系信息标题样式 */
.contact-info h3{
  /* 主题绿色 */
  color: #2c5530;
  /* 底部外边距2rem */
  margin-bottom: 2rem;
  /* 字体大小1.5rem */
  font-size: 1.5rem;
}

/* 联系信息项样式 */
.contact-item{
  /* 底部外边距1.5rem */
  margin-bottom: 1.5rem;
}

/* 联系信息标签样式 */
.contact-item strong{
  /* 深灰色文字 */
  color: #333;
}

/* 联系信息内容样式 */
.contact-item p{
  /* 中灰色文字 */
  color: #666;
  /* 上外边距0.5rem，其他方向0 */
  margin: 0.5rem 0 0 0;
}

/* 表单包装容器样式 */
.contact-form-wrapper {
  /* flex列布局 */
  display: flex;
  flex-direction: column;
}

/* 登录提示区域样式 */
.login-prompt {
  /* 白色背景 */
  background: white;
  /* 内边距2rem */
  padding: 2rem;
  /* 圆角10像素 */
  border-radius: 10px;
  /* 阴影效果 */
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  /* 文字居中对齐 */
  text-align: center;
}

/* 登录提示标题样式 */
.login-prompt h3 {
  /* 主题绿色 */
  color: #2c5530;
  /* 底部外边距1rem */
  margin-bottom: 1rem;
}

/* 登录提示文字样式 */
.login-prompt p {
  /* 中灰色文字 */
  color: #666;
  /* 底部外边距1.5rem */
  margin-bottom: 1.5rem;
}

/* 登录按钮样式 */
.login-btn {
  /* 主题绿色背景 */
  background: #2c5530;
  /* 白色文字 */
  color: white;
  /* 无边框 */
  border: none;
  /* 内边距：上下0.75rem，左右2rem */
  padding: 0.75rem 2rem;
  /* 圆角5像素 */
  border-radius: 5px;
  /* 字体大小1rem */
  font-size: 1rem;
  /* 手型光标 */
  cursor: pointer;
  /* 背景色过渡动画 */
  transition: background 0.3s;
}

/* 登录按钮悬停状态 */
.login-btn:hover {
  /* 悬停时稍亮的绿色 */
  background: #4a7c59;
}

/* 联系表单样式 */
.contact-form{
  /* flex列布局 */
  display: flex;
  flex-direction: column;
  /* 子元素间距1rem */
  gap: 1rem;
}

/* 表单输入框和文本域通用样式 */
.contact-form input,
.contact-form textarea{
  /* 内边距1rem */
  padding: 1rem;
  /* 浅灰色边框 */
  border: 1px solid #ddd;
  /* 圆角5像素 */
  border-radius: 5px;
  /* 字体大小1rem */
  font-size: 1rem;
}

/* 表单提交按钮样式 */
.contact-form button{
  /* 主题绿色背景 */
  background:#2c5530;
  /* 白色文字 */
  color: white;
  /* 无边框 */
  border: none;
  /* 圆角5像素 */
  border-radius: 5px;
  /* 字体大小1.1rem */
  font-size: 1.1rem;
  /* 背景色过渡动画 */
  transition: background 0.3s;
  /* 固定高度50像素 */
  height: 50px;
  /* 手型光标 */
  cursor: pointer;
}

/* 表单按钮悬停状态（非禁用时） */
.contact-form button:hover:not(:disabled){
  /* 悬停时稍亮的绿色 */
  background: #4a7c59;
}

/* 表单按钮禁用状态 */
.contact-form button:disabled {
  /* 灰色背景 */
  background: #cccccc;
  /* 禁用光标 */
  cursor: not-allowed;
}
/* 认证按钮容器 */
.auth-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* 注册按钮样式 */
.register-btn {
  background: #4a7c59;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.register-btn:hover {
  background: #2c5530;
}
</style>