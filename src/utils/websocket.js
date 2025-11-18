class VercelWebSocket {
  constructor() {
    // 替换为你的 Vercel 应用域名
    this.wsUrl = import.meta.env.VITE_VERCEL_WS_URL || 'wss://medicaltech.vercel.app/api/ws'
    this.socket = null
    this.isConnected = false
  }

  // 初始化连接
  connect() {
    if (this.isConnected) return

    this.socket = new WebSocket(this.wsUrl)

    this.socket.onopen = () => {
      console.log('WebSocket 连接成功')
      this.isConnected = true
    }

    this.socket.onmessage = (event) => {
      console.log('收到消息:', event.data)
      // 可在这里分发消息事件，供组件监听
      this.handleMessage(event.data)
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket 错误:', error)
    }

    this.socket.onclose = (event) => {
      console.log('WebSocket 连接关闭，代码:', event.code)
      this.isConnected = false
      // 自动重连机制
      if (event.code !== 1000) {
        setTimeout(() => this.connect(), 3000)
      }
    }
  }

  // 发送消息
  sendMessage(data) {
    if (!this.isConnected) {
      console.error('WebSocket 未连接，无法发送消息')
      return
    }
    this.socket.send(JSON.stringify(data))
  }

  // 处理收到的消息（可被子类或回调覆盖）
  // eslint-disable-next-line no-unused-vars
  handleMessage(data) {
    // 默认实现，可在组件中自定义处理逻辑
  }

  // 关闭连接
  close() {
    if (this.socket) {
      this.socket.close(1000, '正常关闭')
    }
  }
}

// 导出单例实例
export const wsClient = new VercelWebSocket()