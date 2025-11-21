import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-unused-vars
const __dirname = path.dirname(__filename);

console.log('🔍 检查构建文件中的内嵌资源...\n');

// 检查构建目录
const buildDir = './dist';
if (!fs.existsSync(buildDir)) {
  console.log('❌ 未找到构建目录，请先运行: npm run build');
  // eslint-disable-next-line no-undef
  process.exit(1);
}

// 查找所有文件
function findAllFiles(dir, extensions) {
  const files = [];
  
  function scan(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    });
  }
  
  scan(dir);
  return files;
}

// 分析文件中的内嵌资源
const files = findAllFiles(buildDir, ['.html', '.css', '.js']);
let totalDataURIs = 0;
const problematicFiles = [];

console.log(`📊 分析 ${files.length} 个构建文件...\n`);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = path.relative('.', file);
  
  // 检查各种 data URI
  const patterns = [
    /data:image\/svg\+xml[^"]*"/g,
    /data:application\/font[^"]*"/g,
    /data:image\/[^;]+;base64[^"]*"/g,
    /data:[^"]*base64[^"]*"/g
  ];
  
  let fileMatches = [];
  
  patterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        fileMatches.push({
          type: getDataType(match),
          match: match.substring(0, 80) + '...'
        });
        totalDataURIs++;
      });
    }
  });
  
  if (fileMatches.length > 0) {
    problematicFiles.push({
      file: relativePath,
      matches: fileMatches,
      count: fileMatches.length
    });
    
    console.log(`⚠️ ${relativePath}`);
    console.log(`   发现 ${fileMatches.length} 个内嵌资源:`);
    fileMatches.slice(0, 3).forEach((match, idx) => {
      console.log(`     ${idx + 1}. ${match.type}: ${match.match}`);
    });
    if (fileMatches.length > 3) {
      console.log(`     ... 还有 ${fileMatches.length - 3} 个`);
    }
    console.log('');
  }
});

// 获取 data URI 类型
function getDataType(dataUri) {
  if (dataUri.includes('image/svg+xml')) return 'SVG 图标';
  if (dataUri.includes('application/font')) return '字体文件';
  if (dataUri.includes('image/') && dataUri.includes('base64')) return 'Base64 图片';
  return '其他 Data URI';
}

// 显示汇总信息
console.log('='.repeat(50));
console.log('📈 分析汇总:');
console.log(`   扫描文件: ${files.length} 个`);
console.log(`   发现内嵌资源: ${totalDataURIs} 个`);
console.log(`   涉及文件: ${problematicFiles.length} 个`);

if (problematicFiles.length > 0) {
  console.log('\n📋 问题文件列表:');
  problematicFiles.forEach(result => {
    console.log(`   • ${result.file} (${result.matches.length} 个资源)`);
  });
  
  console.log('\n🔧 修复建议:');
  console.log('   运行: npm run fix:fonts 修复字体问题');
  console.log('   运行: node emergency-font-fix.js 紧急修复');
} else {
  console.log('\n✅ 构建文件中未发现内嵌资源');
}