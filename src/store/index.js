
// 导入Vuex的createStore函数
import { createStore } from 'vuex'

// 创建Vuex store实例
const store = createStore({
  // 状态定义
  state() {
    return {
      user: null,                   // 当前用户信息，初始为null
      isAuthenticated: false,       // 认证状态，初始为false
      loginForm: {                  // 登录表单数据
        email: '',                  // 邮箱字段
        password: ''                // 密码字段
      },
      registerForm: {               // 注册表单数据
        name: '',                   // 姓名字段
        email: '',                  // 邮箱字段
        password: '',               // 密码字段
        confirmPassword: ''         // 确认密码字段
      }
    }
  },
  // 变更状态的方法
  mutations: {
    // 设置用户信息和认证状态
    SET_USER(state, user) {
      state.user = user                    // 设置用户信息
      state.isAuthenticated = true         // 设置认证状态为true
    },
    // 清除用户信息和认证状态
    CLEAR_USER(state) {
      state.user = null                    // 清空用户信息
      state.isAuthenticated = false        // 设置认证状态为false
    },
    // 更新登录表单字段
    UPDATE_LOGIN_FORM(state, { field, value }) {
      state.loginForm[field] = value       // 更新指定字段的值
    },
    // 更新注册表单字段
    UPDATE_REGISTER_FORM(state, { field, value }) {
      state.registerForm[field] = value    // 更新指定字段的值
    },
    // 重置所有表单数据
    RESET_FORMS(state) {
      state.loginForm = {                  // 重置登录表单
        email: '',
        password: ''
      }
      state.registerForm = {               // 重置注册表单
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  // 异步操作和业务逻辑
  actions: {
    // 用户登录异步操作
    async loginUser({ commit, state }) {
      // 返回Promise以便调用处可以await
      return new Promise((resolve, reject) => {
        // 模拟API调用延迟
        setTimeout(() => {
          // 从state获取表单数据
          const { email, password } = state.loginForm
          
          // 简单的验证逻辑（演示用）
          if (email === 'demo@medicaltech.cn' && password === '123456') {
            // 创建用户对象
            const user = {
              id: 1,                        // 用户ID
              name: '演示用户',              // 用户名
              email: email                  // 用户邮箱
            }
            // 提交SET_USER mutation
            commit('SET_USER', user)
            // 将用户信息存储到localStorage
            localStorage.setItem('user', JSON.stringify(user))
            // 解析Promise，返回用户信息
            resolve(user)
          } else {
            // 拒绝Promise，返回错误
            reject(new Error('邮箱或密码错误'))
          }
        }, 1000) // 1秒延迟模拟网络请求
      })
    },
    
    // 用户注册异步操作
    async registerUser({ commit, state }) {
      // 返回Promise以便调用处可以await
      return new Promise((resolve, reject) => {
        // 模拟API调用延迟
        setTimeout(() => {
          // 从state获取表单数据
          const { name, email, password } = state.registerForm
          
          // 简单的验证逻辑（演示用）
          if (name && email && password) {
            // 创建用户对象，使用时间戳作为ID
            const user = {
              id: Date.now(),               // 使用时间戳作为唯一ID
              name: name,                   // 用户名
              email: email                  // 用户邮箱
            }
            // 提交SET_USER mutation
            commit('SET_USER', user)
            // 将用户信息存储到localStorage
            localStorage.setItem('user', JSON.stringify(user))
            // 解析Promise，返回用户信息
            resolve(user)
          } else {
            // 拒绝Promise，返回错误
            reject(new Error('注册失败，请检查输入信息'))
          }
        }, 1000) // 1秒延迟模拟网络请求
      })
    },
    
    // 用户退出操作
    logout({ commit }) {
      // 提交CLEAR_USER mutation清除用户状态
      commit('CLEAR_USER')
      // 从localStorage移除用户信息
      localStorage.removeItem('user')
    },
    
    // 初始化认证状态（页面刷新时调用）
    initializeAuth({ commit }) {
      // 从localStorage获取用户信息
      const user = localStorage.getItem('user')
      // 如果存在用户信息
      if (user) {
        // 提交SET_USER mutation恢复用户状态
        commit('SET_USER', JSON.parse(user))
      }
    }
  },
  // 计算属性，用于从state派生状态
  getters: {
    // 获取认证状态
    isAuthenticated: state => state.isAuthenticated,
    // 获取当前用户信息
    currentUser: state => state.user,
    // 获取登录表单数据
    loginFormData: state => state.loginForm,
    // 获取注册表单数据
    registerFormData: state => state.registerForm
  }
})

// 导出store实例
export default store