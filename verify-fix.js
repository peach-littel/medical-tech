import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-unused-vars
const __dirname = path.dirname(__filename);

console.log('🔍 验证修复结果...\n');

function verifyFix() {
  const buildDir = './dist';
  if (!fs.existsSync(buildDir)) {
    console.log('❌ 未找到 dist 目录');
    return;
  }

  const allFiles = [];
  
  function findAllFiles(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findAllFiles(fullPath);
      } else {
        allFiles.push(fullPath);
      }
    });
  }
  
  findAllFiles(buildDir);
  
  console.log(`📁 扫描 ${allFiles.length} 个构建文件`);
  
  let remainingDataURIs = 0;
  const problematicFiles = [];
  
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // 检查所有 data URI
    const dataUriCount = (content.match(/data:application\/font/g) || []).length;
    
    if (dataUriCount > 0) {
      problematicFiles.push({
        file: path.relative('.', file),
        count: dataUriCount
      });
      remainingDataURIs += dataUriCount;
    }
  });
  
  console.log('\n📊 验证结果:');
  console.log(`   剩余内嵌字体: ${remainingDataURIs} 个`);
  console.log(`   涉及文件: ${problematicFiles.length} 个`);
  
  if (problematicFiles.length > 0) {
    console.log('\n⚠️ 仍有问题的文件:');
    problematicFiles.forEach(item => {
      console.log(`   • ${item.file} (${item.count} 个)`);
    });
    
    console.log('\n🔧 建议:');
    console.log('   运行: node force-fix.js 进行强力修复');
  } else {
    console.log('\n✅ 恭喜! 所有内嵌字体已成功移除');
    console.log('🚀 现在可以安全部署到 GitHub Pages');
  }
}

// 运行验证
verifyFix();