import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-unused-vars
const __dirname = path.dirname(__filename);

console.log('🔧 直接修复构建文件中的内嵌字体...\n');

// 直接定位并修复 dist 目录中的所有 CSS 文件
function fixAllCSSFiles() {
  const buildDir = './dist';
  if (!fs.existsSync(buildDir)) {
    console.log('❌ 未找到 dist 目录');
    return;
  }

  // 递归查找所有 CSS 文件
  const cssFiles = [];
  
  function findCSSFiles(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findCSSFiles(fullPath);
      } else if (path.extname(item).toLowerCase() === '.css') {
        cssFiles.push(fullPath);
      }
    });
  }
  
  findCSSFiles(buildDir);
  
  if (cssFiles.length === 0) {
    console.log('❌ 未找到 CSS 文件');
    return;
  }
  
  console.log(`📁 找到 ${cssFiles.length} 个 CSS 文件:`);
  cssFiles.forEach(file => {
    console.log(`   • ${path.relative('.', file)}`);
  });
  
  let totalFixed = 0;
  
  cssFiles.forEach(cssFile => {
    console.log(`\n🔧 修复: ${path.relative('.', cssFile)}`);
    
    let content = fs.readFileSync(cssFile, 'utf8');
    // eslint-disable-next-line no-unused-vars
    const originalLength = content.length;
    
    // 匹配所有类型的内嵌字体
    const fontPatterns = [
      // woff 字体
      /url\("data:application\/font-woff;charset=utf-8;base64,[^"]+"\)/g,
      /url\("data:application\/x-font-woff;base64,[^"]+"\)/g,
      /url\("data:font\/woff;base64,[^"]+"\)/g,
      
      // woff2 字体  
      /url\("data:application\/font-woff2;charset=utf-8;base64,[^"]+"\)/g,
      /url\("data:font\/woff2;base64,[^"]+"\)/g,
      
      // 其他字体格式
      /url\("data:application\/octet-stream;base64,[^"]+"\)/g,
      /url\("data:font\/opentype;base64,[^"]+"\)/g,
      /url\("data:application\/vnd.ms-fontobject;base64,[^"]+"\)/g
    ];
    
    let fixedInFile = 0;
    
    fontPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        console.log(`   发现 ${matches.length} 个匹配: ${pattern.toString().substring(0, 50)}...`);
        
        // 替换为注释或移除
        content = content.replace(pattern, '/* 内嵌字体已移除 */');
        fixedInFile += matches.length;
      }
    });
    
    if (fixedInFile > 0) {
      fs.writeFileSync(cssFile, content, 'utf8');
      console.log(`✅ 修复了 ${fixedInFile} 个内嵌字体引用`);
      totalFixed += fixedInFile;
      
      // 验证修复
      const newContent = fs.readFileSync(cssFile, 'utf8');
      const remaining = (newContent.match(/data:application\/font/g) || []).length;
      if (remaining > 0) {
        console.log(`⚠️ 仍有 ${remaining} 个内嵌字体未处理`);
      }
    } else {
      console.log('✅ 未发现内嵌字体');
    }
  });
  
  return totalFixed;
}

// 运行修复
const totalFixed = fixAllCSSFiles();

console.log('\n' + '='.repeat(50));
if (totalFixed > 0) {
  console.log(`🎉 修复完成! 共处理 ${totalFixed} 个内嵌字体引用`);
  console.log('\n📋 立即部署:');
  console.log('   git add .');
  console.log('   git commit -m "fix: 移除内嵌字体解决CSP"');
  console.log('   git push');
} else {
  console.log('✅ 未发现需要修复的内嵌字体');
  console.log('\n💡 可能的原因:');
  console.log('   1. 字体来自其他文件 (JS/HTML)');
  console.log('   2. 字体来自第三方库');
  console.log('   3. 需要检查其他构建文件');
}