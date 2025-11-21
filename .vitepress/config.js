export default {
  title: 'Medical Tech',
  description: 'Medical Technology Documentation',
  
  head: [
    ['meta', {
      'http-equiv': 'Content-Security-Policy',
      'content': 'default-src \'self\' https:; script-src \'self\' \'unsafe-inline\' https:; style-src \'self\' \'unsafe-inline\' https:; font-src \'self\' https: data:; img-src \'self\' https: data: blob:; connect-src \'self\' https:;'
    }]
  ],
  
  vite: {
    build: {
      assetsInlineLimit: 1024
    }
  },
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ]
  }
};