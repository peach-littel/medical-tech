import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-unused-vars
const __dirname = path.dirname(__filename);

console.log('🚨 紧急修复字体 CSP 问题...\n');

// 查找构建目录中的 CSS 文件
function findBuildCSS() {
  const buildDir = './dist';
  if (!fs.existsSync(buildDir)) {
    console.log('❌ 未找到构建目录');
    return [];
  }
  
  const cssFiles = [];
  
  function scan(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (path.extname(item).toLowerCase() === '.css') {
        cssFiles.push(fullPath);
      }
    });
  }
  
  scan(buildDir);
  return cssFiles;
}

const cssFiles = findBuildCSS();

if (cssFiles.length === 0) {
  console.log('❌ 未找到 CSS 文件');
  // eslint-disable-next-line no-undef
  process.exit(1);
}

console.log(`📁 找到 ${cssFiles.length} 个 CSS 文件`);

let totalFixed = 0;

cssFiles.forEach(cssFile => {
  console.log(`\n🔧 处理: ${path.basename(cssFile)}`);
  
  let cssContent = fs.readFileSync(cssFile, 'utf8');
  // eslint-disable-next-line no-unused-vars
  const originalContent = cssContent;
  
  // 匹配并移除内嵌字体
  const fontPatterns = [
    /url\("data:application\/font-woff;charset=utf-8;base64,[^"]+"\)/g,
    /url\("data:application\/font-woff2;charset=utf-8;base64,[^"]+"\)/g,
    /url\("data:application\/x-font-woff;base64,[^"]+"\)/g
  ];
  
  let fixedCount = 0;
  
  fontPatterns.forEach(pattern => {
    const matches = cssContent.match(pattern);
    if (matches) {
      fixedCount += matches.length;
      cssContent = cssContent.replace(pattern, '/* 内嵌字体已移除 */');
    }
  });
  
  if (fixedCount > 0) {
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log(`✅ 移除了 ${fixedCount} 个内嵌字体引用`);
    totalFixed += fixedCount;
  } else {
    console.log('✅ 未发现内嵌字体');
  }
});

console.log(`\n🎉 紧急修复完成!`);
console.log(`   移除了 ${totalFixed} 个内嵌字体引用`);

if (totalFixed > 0) {
  console.log('\n💡 注意:');
  console.log('   • 字体功能可能会受影响');
  console.log('   • 但 CSP 错误应该会消失');
  console.log('   • 建议后续使用外部字体文件');
  
  console.log('\n📋 下一步:');
  console.log('   提交更改: git add . && git commit -m "fix: 移除内嵌字体" && git push');
}