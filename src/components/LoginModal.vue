<!-- LoginModal.vue -->
<template>
  <!-- Bootstrap模态框，fade动画效果 -->
  <div class="modal fade" id="loginModal" tabindex="-1">
    <!-- 模态框对话框，居中显示 -->
    <div class="modal-dialog modal-dialog-centered">
      <!-- 模态框内容区域 -->
      <div class="modal-content">
        <!-- 模态框头部 -->
        <div class="modal-header">
          <!-- 模态框标题 -->
          <h5 class="modal-title">用户登录</h5>
          <!-- 关闭按钮，点击时重置表单 -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetForm"></button>
        </div>
        <!-- 模态框主体内容 -->
        <div class="modal-body">
          <!-- 登录表单，阻止默认提交行为 -->
          <form @submit.prevent="handleLogin">
            <!-- 邮箱输入组 -->
            <div class="form-group">
              <!-- 邮箱标签 -->
              <label for="loginEmail" class="form-label">邮箱地址</label>
              <!-- 邮箱输入框，根据验证错误动态添加error类 -->
              <input 
                type="email" 
                class="form-control" 
                id="loginEmail"
                v-model="loginForm.email"
                :class="{ 'error': loginErrors.email }"
                required
              >
              <!-- 邮箱错误信息显示 -->
              <div class="error-message" v-if="loginErrors.email">
                {{ loginErrors.email }}
              </div>
            </div>
            
            <!-- 密码输入组 -->
            <div class="form-group">
              <!-- 密码标签 -->
              <label for="loginPassword" class="form-label">密码</label>
              <!-- 密码输入框，根据验证错误动态添加error类 -->
              <input 
                type="password" 
                class="form-control" 
                id="loginPassword"
                v-model="loginForm.password"
                :class="{ 'error': loginErrors.password }"
                required
              >
              <!-- 密码错误信息显示 -->
              <div class="error-message" v-if="loginErrors.password">
                {{ loginErrors.password }}
              </div>
            </div>
            
            <!-- 登录错误提示 -->
            <div class="alert alert-error" v-if="loginError">
              {{ loginError }}
            </div>
            
            <!-- 提交按钮，登录时禁用 -->
            <button 
              type="submit" 
              class="btn btn-primary w-100"
              :disabled="loginLoading"
            >
              <!-- 登录中显示加载动画 -->
              <span v-if="loginLoading" class="spinner"></span>
              <!-- 根据登录状态显示不同文字 -->
              {{ loginLoading ? '登录中...' : '登录' }}
            </button>
          </form>
          
          <!-- 注册引导链接 -->
          <div class="text-center mt-3">
            <p>还没有账号？ 
              <!-- 注册链接，点击切换到注册模态框 -->
              <a href="#" @click="showRegister" class="link">立即注册</a>
            </p>
          </div>
          
          <!-- 演示账号信息 -->
          <div class="demo-credentials">
            <p>演示账号：demo@medicaltech.cn</p>
            <p>演示密码：123456</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LoginModal',
  setup(props, { emit }) {
    const store = useStore()
    
    const loginForm = computed({
      get: () => store.getters.loginFormData,
      // eslint-disable-next-line no-unused-vars
      set: (value) => {}
    })
    
    const loginLoading = ref(false)
    const loginError = ref('')
    
    const loginErrors = reactive({
      email: '',
      password: ''
    })
    
    const updateLoginForm = (field, value) => {
      store.commit('UPDATE_LOGIN_FORM', { field, value })
    }
    
    const validateLoginForm = () => {
      let isValid = true
      
      Object.keys(loginErrors).forEach(key => loginErrors[key] = '')
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!loginForm.value.email) {
        loginErrors.email = '请输入邮箱地址'
        isValid = false
      } else if (!emailRegex.test(loginForm.value.email)) {
        loginErrors.email = '请输入有效的邮箱地址'
        isValid = false
      }
      
      if (!loginForm.value.password) {
        loginErrors.password = '请输入密码'
        isValid = false
      } else if (loginForm.value.password.length < 6) {
        loginErrors.password = '密码至少6位字符'
        isValid = false
      }
      
      return isValid
    }
    
    // 修正：使用安全的模态框关闭方式
    const hideLoginModal = () => {
      const modal = document.getElementById('loginModal')
      if (modal) {
        modal.style.display = 'none'
        modal.classList.remove('show')
      }
    }
    
    const handleLogin = async () => {
      if (!validateLoginForm()) return
      
      loginLoading.value = true
      loginError.value = ''
      
      try {
        await store.dispatch('loginUser')
        
        // 修正：使用安全的模态框关闭方式
        hideLoginModal()
        
        resetForm()
        emit('loginSuccess')
        
      } catch (error) {
        loginError.value = error.message
      } finally {
        loginLoading.value = false
      }
    }
    
    // 修正：使用安全的模态框切换方式
    const showRegister = () => {
      // 隐藏登录模态框
      hideLoginModal()
      
      // 显示注册模态框
      const registerModal = document.getElementById('registerModal')
      if (registerModal) {
        registerModal.style.display = 'block'
        registerModal.classList.add('show')
      }
    }
    
    const resetForm = () => {
      store.commit('RESET_FORMS')
      loginError.value = ''
      Object.keys(loginErrors).forEach(key => loginErrors[key] = '')
    }
    
    return {
      loginForm: {
        get email() { return loginForm.value.email },
        set email(value) { updateLoginForm('email', value) },
        get password() { return loginForm.value.password },
        set password(value) { updateLoginForm('password', value) }
      },
      loginLoading,
      loginError,
      loginErrors,
      handleLogin,
      showRegister,
      resetForm
    }
  }
}
</script>

<style scoped>
/* 模态框内容区域样式 */
.modal-content {
  /* 圆角10像素 */
  border-radius: 10px;
  /* 无边框 */
  border: none;
  /* 阴影效果 */
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* 模态框头部样式 */
.modal-header {
  /* 底部边框线 */
  border-bottom: 1px solid #e9ecef;
  /* 内边距1.5rem */
  padding: 1.5rem;
}

/* 模态框标题样式 */
.modal-title {
  /* 主题绿色 */
  color: #2c5530;
  /* 字体加粗 */
  font-weight: 600;
  /* 字体大小1.5rem */
  font-size: 1.5rem;
}

/* 模态框主体样式 */
.modal-body {
  /* 内边距1.5rem */
  padding: 1.5rem;
}

/* 关闭按钮样式 */
.btn-close {
  /* 无边框 */
  border: none;
  /* 透明背景 */
  background: transparent;
  /* 字体大小1.2rem */
  font-size: 1.2rem;
  /* 手型光标 */
  cursor: pointer;
}

/* 表单组样式 */
.form-group {
  /* 底部外边距1.5rem */
  margin-bottom: 1.5rem;
}

/* 表单标签样式 */
.form-label {
  /* 深灰色文字 */
  color: #333;
  /* 中等字重 */
  font-weight: 500;
  /* 底部外边距0.5rem */
  margin-bottom: 0.5rem;
  /* 块级显示 */
  display: block;
}

/* 表单控件样式 */
.form-control {
  /* 宽度100% */
  width: 100%;
  /* 内边距：上下0.75rem，左右1rem */
  padding: 0.75rem 1rem;
  /* 边框样式 */
  border: 2px solid #e9ecef;
  /* 圆角5像素 */
  border-radius: 5px;
  /* 字体大小1rem */
  font-size: 1rem;
  /* 边框颜色过渡动画 */
  transition: border-color 0.3s;
}

/* 表单控件获取焦点状态 */
.form-control:focus {
  /* 移除默认轮廓 */
  outline: none;
  /* 焦点时边框变为主题绿色 */
  border-color: #2c5530;
}

/* 错误状态的表单控件 */
.form-control.error {
  /* 错误状态边框变为红色 */
  border-color: #dc3545;
}

/* 错误消息样式 */
.error-message {
  /* 红色文字 */
  color: #dc3545;
  /* 较小字体 */
  font-size: 0.875rem;
  /* 顶部外边距0.25rem */
  margin-top: 0.25rem;
}

/* 错误提示框样式 */
.alert-error {
  /* 浅红色背景 */
  background-color: #f8d7da;
  /* 红色边框 */
  border: 1px solid #f5c6cb;
  /* 深红色文字 */
  color: #721c24;
  /* 内边距 */
  padding: 0.75rem 1rem;
  /* 圆角5像素 */
  border-radius: 5px;
  /* 底部外边距1rem */
  margin-bottom: 1rem;
}

/* 主要按钮样式 */
.btn-primary {
  /* 主题绿色背景 */
  background: #2c5530;
  /* 白色文字 */
  color: white;
  /* 无边框 */
  border: none;
  /* 内边距 */
  padding: 0.75rem 1rem;
  /* 圆角5像素 */
  border-radius: 5px;
  /* 字体大小1rem */
  font-size: 1rem;
  /* 中等字重 */
  font-weight: 500;
  /* 手型光标 */
  cursor: pointer;
  /* 背景色过渡动画 */
  transition: background 0.3s;
  /* 固定高度50像素 */
  height: 50px;
}

/* 按钮悬停状态（非禁用时） */
.btn-primary:hover:not(:disabled) {
  /* 悬停时稍亮的绿色 */
  background: #4a7c59;
}

/* 按钮禁用状态 */
.btn-primary:disabled {
  /* 灰色背景 */
  background: #cccccc;
  /* 禁用光标 */
  cursor: not-allowed;
}

/* 加载动画样式 */
.spinner {
  /* 内联块级显示 */
  display: inline-block;
  /* 宽高1rem */
  width: 1rem;
  height: 1rem;
  /* 边框样式 */
  border: 2px solid transparent;
  /* 顶部边框为白色 */
  border-top: 2px solid white;
  /* 圆形 */
  border-radius: 50%;
  /* 旋转动画，1秒线性无限循环 */
  animation: spin 1s linear infinite;
  /* 右边距0.5rem */
  margin-right: 0.5rem;
}

/* 旋转动画定义 */
@keyframes spin {
  /* 起始角度0度 */
  0% { transform: rotate(0deg); }
  /* 结束角度360度 */
  100% { transform: rotate(360deg); }
}

/* 链接样式 */
.link {
  /* 主题绿色 */
  color: #2c5530;
  /* 无下划线 */
  text-decoration: none;
  /* 中等字重 */
  font-weight: 500;
}

/* 链接悬停状态 */
.link:hover {
  /* 悬停时显示下划线 */
  text-decoration: underline;
}

/* 演示账号信息样式 */
.demo-credentials {
  /* 顶部外边距1.5rem */
  margin-top: 1.5rem;
  /* 内边距1rem */
  padding: 1rem;
  /* 浅灰色背景 */
  background: #f8f9fa;
  /* 圆角5像素 */
  border-radius: 5px;
  /* 左边框：4像素宽主题绿色 */
  border-left: 4px solid #2c5530;
}

/* 演示账号信息段落样式 */
.demo-credentials p {
  /* 上下外边距0.25rem，左右0 */
  margin: 0.25rem 0;
  /* 较小字体 */
  font-size: 0.875rem;
  /* 中灰色文字 */
  color: #666;
}
</style>