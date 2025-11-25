import fs from 'fs'
import path from 'path'

console.log('🔧 Fixing built files for GitHub Pages...')

// 修复 dist 目录中的所有文件
function fixBuildFiles() {
  const buildDir = './dist'
  if (!fs.existsSync(buildDir)) {
    console.log('❌ No dist directory found')
    return
  }

  let totalFixed = 0

  // 修复所有文件
  function processFiles(dir) {
    const items = fs.readdirSync(dir)
    
    items.forEach(item => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        processFiles(fullPath)
      } else {
        const ext = path.extname(item).toLowerCase()
        if (['.css', '.js', '.html'].includes(ext)) {
          let content = fs.readFileSync(fullPath, 'utf8')
          let fixed = false
          
          // 移除内嵌字体
          const fontPatterns = [
            /url\("data:application\/font-woff[^"]+"\)/g,
            /url\("data:application\/font-woff2[^"]+"\)/g,
            /url\("data:application\/x-font-woff[^"]+"\)/g,
            /"data:application\/font[^"]*"/g
          ]
          
          fontPatterns.forEach(pattern => {
            const matches = content.match(pattern)
            if (matches) {
              totalFixed += matches.length
              content = content.replace(pattern, '/* inline-font-removed */')
              fixed = true
            }
          })
          
          if (fixed) {
            fs.writeFileSync(fullPath, content, 'utf8')
          }
        }
      }
    })
  }
  
  processFiles(buildDir)
  return totalFixed
}

const fixedCount = fixBuildFiles()
console.log(`✅ Fixed ${fixedCount} inline resource references`)
console.log('🚀 Ready for GitHub Pages deployment!')