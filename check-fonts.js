import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-unused-vars
const __dirname = path.dirname(__filename);

console.log('🔍 专门检查字体相关的 CSP 问题...\n');

// 检查构建目录
const buildDir = './dist';
if (!fs.existsSync(buildDir)) {
  console.log('❌ 未找到构建目录');
  // eslint-disable-next-line no-undef
  process.exit(1);
}

// 查找 CSS 文件
function findCSSFiles(dir) {
  const files = [];
  
  function scan(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (path.extname(item).toLowerCase() === '.css') {
        files.push(fullPath);
      }
    });
  }
  
  scan(dir);
  return files;
}

const cssFiles = findCSSFiles(buildDir);
console.log(`📁 找到 ${cssFiles.length} 个 CSS 文件`);

let totalFonts = 0;

cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = path.relative('.', file);
  
  // 专门检查字体
  const fontPatterns = [
    /data:application\/font-woff[^"]*"/g,
    /data:application\/font-woff2[^"]*"/g,
    /data:application\/x-font-woff[^"]*"/g,
    /data:font\/woff2[^"]*"/g
  ];
  
  let fontCount = 0;
  let fontDetails = [];
  
  fontPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        fontDetails.push(match.substring(0, 60) + '...');
        fontCount++;
      });
    }
  });
  
  if (fontCount > 0) {
    console.log(`\n⚠️ ${relativePath}`);
    console.log(`   发现 ${fontCount} 个内嵌字体:`);
    fontDetails.forEach((detail, idx) => {
      console.log(`     ${idx + 1}. ${detail}`);
    });
    totalFonts += fontCount;
  }
});

console.log('\n📈 字体检查汇总:');
console.log(`   发现内嵌字体: ${totalFonts} 个`);

if (totalFonts > 0) {
  console.log('\n🔧 立即修复:');
  console.log('   运行: node fix-fonts-csp.js');
} else {
  console.log('\n✅ 未发现内嵌字体问题');
}