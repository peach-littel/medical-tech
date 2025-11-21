// .vitepress/config.js
export default {
  title: 'Medical Tech',
  description: 'Medical Technology Documentation',
  
  // 添加 CSP 相关的 head 配置
  head: [
    // 如果不需要严格的 CSP，可以放宽策略
    ['meta', {
      'http-equiv': 'Content-Security-Policy',
      'content': 'default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; font-src \'self\' data:; img-src \'self\' data: blob:;'
    }]
  ],
  
  // Vite 配置
  vite: {
    build: {
      // 增大资源内嵌限制，避免小文件被内嵌
      assetsInlineLimit: 8192, // 8KB
    },
    // 确保正确处理资源
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg']
  },
  
  // 主题配置
  themeConfig: {
    // 你的主题配置
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ]
  }
}