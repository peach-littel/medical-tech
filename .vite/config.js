import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/medical-tech/', // 重要：设置仓库名称作为基础路径
  build: {
    // 避免资源内嵌
    assetsInlineLimit: 1024,
    // 优化构建输出
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images'
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        }
      }
    }
  }
})