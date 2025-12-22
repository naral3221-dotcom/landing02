const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 이미지 파일을 WebP로 변환하는 함수
async function convertToWebP(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const outputPath = inputPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');

  // 이미 WebP 파일이 존재하면 스킵
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skip (already exists): ${outputPath}`);
    return { success: true, skipped: true };
  }

  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`✅ Converted: ${inputPath} -> ${outputPath}`);
    return { success: true, skipped: false };
  } catch (error) {
    console.error(`❌ Failed: ${inputPath}`, error.message);
    return { success: false, skipped: false };
  }
}

// 디렉토리 내 모든 이미지 찾기
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // node_modules, .git 등 제외
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist' && file !== 'build') {
        findImages(filePath, fileList);
      }
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 메인 실행
async function main() {
  const startTime = Date.now();
  console.log('🔍 Searching for images...\n');

  const images = findImages('./public');
  console.log(`📊 Found ${images.length} images to process\n`);

  if (images.length === 0) {
    console.log('No images to convert!');
    return;
  }

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const imagePath of images) {
    const result = await convertToWebP(imagePath);
    if (result.success) {
      if (result.skipped) {
        skipped++;
      } else {
        converted++;
      }
    } else {
      failed++;
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(50));
  console.log('📈 Summary:');
  console.log(`   ✅ Converted: ${converted}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   ⏱️  Duration: ${duration}s`);
  console.log('='.repeat(50));
}

main().catch(console.error);
