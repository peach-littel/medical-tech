<!-- RegisterModal.vue -->
<template>
  <!-- Bootstrap模态框，fade动画效果 -->
  <div class="modal fade" id="registerModal" tabindex="-1">
    <!-- 模态框对话框，居中显示 -->
    <div class="modal-dialog modal-dialog-centered">
      <!-- 模态框内容区域 -->
      <div class="modal-content">
        <!-- 模态框头部 -->
        <div class="modal-header">
          <!-- 模态框标题 -->
          <h5 class="modal-title">用户注册</h5>
          <!-- 关闭按钮，点击时重置表单 -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetForm"></button>
        </div>
        <!-- 模态框主体内容 -->
        <div class="modal-body">
          <!-- 注册表单，阻止默认提交行为 -->
          <form @submit.prevent="handleRegister">
            <!-- 姓名输入组 -->
            <div class="form-group">
              <!-- 姓名标签 -->
              <label for="registerName" class="form-label">姓名</label>
              <!-- 姓名输入框，根据验证错误动态添加error类 -->
              <input 
                type="text" 
                class="form-control" 
                id="registerName"
                v-model="registerForm.name"
                :class="{ 'error': registerErrors.name }"
                required
              >
              <!-- 姓名错误信息显示 -->
              <div class="error-message" v-if="registerErrors.name">
                {{ registerErrors.name }}
              </div>
            </div>
            
            <!-- 邮箱输入组 -->
            <div class="form-group">
              <!-- 邮箱标签 -->
              <label for="registerEmail" class="form-label">邮箱地址</label>
              <!-- 邮箱输入框，根据验证错误动态添加error类 -->
              <input 
                type="email" 
                class="form-control" 
                id="registerEmail"
                v-model="registerForm.email"
                :class="{ 'error': registerErrors.email }"
                required
              >
              <!-- 邮箱错误信息显示 -->
              <div class="error-message" v-if="registerErrors.email">
                {{ registerErrors.email }}
              </div>
            </div>
            
            <!-- 密码输入组 -->
            <div class="form-group">
              <!-- 密码标签 -->
              <label for="registerPassword" class="form-label">密码</label>
              <!-- 密码输入框，根据验证错误动态添加error类 -->
              <input 
                type="password" 
                class="form-control" 
                id="registerPassword"
                v-model="registerForm.password"
                :class="{ 'error': registerErrors.password }"
                required
              >
              <!-- 密码错误信息显示 -->
              <div class="error-message" v-if="registerErrors.password">
                {{ registerErrors.password }}
              </div>
            </div>
            
            <!-- 确认密码输入组 -->
            <div class="form-group">
              <!-- 确认密码标签 -->
              <label for="registerConfirmPassword" class="form-label">确认密码</label>
              <!-- 确认密码输入框，根据验证错误动态添加error类 -->
              <input 
                type="password" 
                class="form-control" 
                id="registerConfirmPassword"
                v-model="registerForm.confirmPassword"
                :class="{ 'error': registerErrors.confirmPassword }"
                required
              >
              <!-- 确认密码错误信息显示 -->
              <div class="error-message" v-if="registerErrors.confirmPassword">
                {{ registerErrors.confirmPassword }}
              </div>
            </div>
            
            <!-- 注册错误提示 -->
            <div class="alert alert-error" v-if="registerError">
              {{ registerError }}
            </div>
            
            <!-- 提交按钮，注册时禁用 -->
            <button 
              type="submit" 
              class="btn btn-primary w-100"
              :disabled="registerLoading"
            >
              <!-- 注册中显示加载动画 -->
              <span v-if="registerLoading" class="spinner"></span>
              <!-- 根据注册状态显示不同文字 -->
              {{ registerLoading ? '注册中...' : '注册' }}
            </button>
          </form>
          
          <!-- 登录引导链接 -->
          <div class="text-center mt-3">
            <p>已有账号？ 
              <!-- 登录链接，点击切换到登录模态框 -->
              <a href="#" @click="showLogin" class="link">立即登录</a>
            </p>
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
  name: 'RegisterModal',
  setup(props, { emit }) {
    const store = useStore()
    
    const registerForm = computed({
      get: () => store.getters.registerFormData,
      // eslint-disable-next-line no-unused-vars
      set: (value) => {}
    })
    
    const registerLoading = ref(false)
    const registerError = ref('')
    
    const registerErrors = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    
    const updateRegisterForm = (field, value) => {
      store.commit('UPDATE_REGISTER_FORM', { field, value })
    }
    
    const validateRegisterForm = () => {
      let isValid = true
      
      Object.keys(registerErrors).forEach(key => registerErrors[key] = '')
      
      if (!registerForm.value.name) {
        registerErrors.name = '请输入姓名'
        isValid = false
      } else if (registerForm.value.name.length < 2) {
        registerErrors.name = '姓名至少2个字符'
        isValid = false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!registerForm.value.email) {
        registerErrors.email = '请输入邮箱地址'
        isValid = false
      } else if (!emailRegex.test(registerForm.value.email)) {
        registerErrors.email = '请输入有效的邮箱地址'
        isValid = false
      }
      
      if (!registerForm.value.password) {
        registerErrors.password = '请输入密码'
        isValid = false
      } else if (registerForm.value.password.length < 6) {
        registerErrors.password = '密码至少6位字符'
        isValid = false
      }
      
      if (!registerForm.value.confirmPassword) {
        registerErrors.confirmPassword = '请确认密码'
        isValid = false
      } else if (registerForm.value.password !== registerForm.value.confirmPassword) {
        registerErrors.confirmPassword = '两次输入的密码不一致'
        isValid = false
      }
      
      return isValid
    }
    
    // 修正：使用安全的模态框关闭方式
    const hideRegisterModal = () => {
      const modal = document.getElementById('registerModal')
      if (modal) {
        modal.style.display = 'none'
        modal.classList.remove('show')
      }
    }
    
    const handleRegister = async () => {
      if (!validateRegisterForm()) return
      
      registerLoading.value = true
      registerError.value = ''
      
      try {
        await store.dispatch('registerUser')
        
        // 修正：使用安全的模态框关闭方式
        hideRegisterModal()
        
        resetForm()
        emit('registerSuccess')
        
      } catch (error) {
        registerError.value = error.message
      } finally {
        registerLoading.value = false
      }
    }
    
    // 修正：使用安全的模态框切换方式
    const showLogin = () => {
      // 隐藏注册模态框
      hideRegisterModal()
      
      // 显示登录模态框
      const loginModal = document.getElementById('loginModal')
      if (loginModal) {
        loginModal.style.display = 'block'
        loginModal.classList.add('show')
      }
    }
    
    const resetForm = () => {
      store.commit('RESET_FORMS')
      registerError.value = ''
      Object.keys(registerErrors).forEach(key => registerErrors[key] = '')
    }
    
    return {
      registerForm: {
        get name() { return registerForm.value.name },
        set name(value) { updateRegisterForm('name', value) },
        get email() { return registerForm.value.email },
        set email(value) { updateRegisterForm('email', value) },
        get password() { return registerForm.value.password },
        set password(value) { updateRegisterForm('password', value) },
        get confirmPassword() { return registerForm.value.confirmPassword },
        set confirmPassword(value) { updateRegisterForm('confirmPassword', value) }
      },
      registerLoading,
      registerError,
      registerErrors,
      handleRegister,
      showLogin,
      resetForm
    }
  }
}
</script>

<style scoped>
/* 复用 LoginModal 的样式，保持一致性 */

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
</style>