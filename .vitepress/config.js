export default {
  title: 'Medical Tech',
  description: 'Medical Technology Documentation',
  
  head: [
    ['meta', {
      'http-equiv': 'Content-Security-Policy',
      'content': 'default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; font-src \'self\' data:; img-src \'self\' data: blob:;'
    }]
  ],
  
  vite: {
    build: {
      assetsInlineLimit: 1024
    }
  }
};