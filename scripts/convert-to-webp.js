const sharp = require('sharp');
const { glob } = require('glob');
const path = require('path');
const fs = require('fs');

// 변환 설정
const QUALITY = 85; // WebP 품질 (85 추천)
const MAX_WIDTH = 1200; // 최대 가로 크기 (px)

// 변환할 폴더들
const FOLDERS = [
    'public/match/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
    'public/source/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}'
];

async function convertToWebP(filePath) {
    try {
        const metadata = await sharp(filePath).metadata();
        const originalSize = fs.statSync(filePath).size;
        const originalSizeMB = originalSize / 1024 / 1024;

        // WebP 파일명 생성
        const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

        // 이미 WebP 파일이 존재하면 건너뛰기
        if (fs.existsSync(webpPath)) {
            console.log(`⏭️  Already exists: ${path.relative(process.cwd(), webpPath)}`);
            return null;
        }

        console.log(`📸 Converting: ${path.relative(process.cwd(), filePath)}`);
        console.log(`   Original: ${originalSizeMB.toFixed(2)} MB (${metadata.width}x${metadata.height})`);

        // WebP 변환
        const pipeline = sharp(filePath);

        // 리사이즈 (가로가 MAX_WIDTH보다 크면)
        if (metadata.width > MAX_WIDTH) {
            pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
        }

        // WebP로 변환
        await pipeline.webp({ quality: QUALITY }).toFile(webpPath);

        const webpSize = fs.statSync(webpPath).size;
        const savedPercent = ((1 - webpSize / originalSize) * 100).toFixed(1);

        console.log(`   WebP: ${(webpSize / 1024 / 1024).toFixed(2)} MB (${savedPercent}% saved) ✅`);
        console.log(`   Created: ${path.relative(process.cwd(), webpPath)}\n`);

        return {
            original: originalSize,
            webp: webpSize,
            saved: originalSize - webpSize,
            originalPath: filePath,
            webpPath: webpPath
        };
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return null;
    }
}

async function main() {
    console.log('🚀 Starting WebP conversion...\n');
    console.log(`Settings: Quality=${QUALITY}%, Max Width=${MAX_WIDTH}px\n`);

    let totalOriginal = 0;
    let totalWebP = 0;
    let fileCount = 0;
    const convertedFiles = [];

    for (const pattern of FOLDERS) {
        const files = await glob(pattern, { nodir: true });

        for (const file of files) {
            const result = await convertToWebP(file);
            if (result) {
                totalOriginal += result.original;
                totalWebP += result.webp;
                fileCount++;
                convertedFiles.push(result);
            }
        }
    }

    const totalSaved = totalOriginal - totalWebP;
    const totalSavedPercent = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;

    console.log('\n' + '='.repeat(60));
    console.log('✨ WebP Conversion Complete!');
    console.log('='.repeat(60));
    console.log(`📊 Total files converted: ${fileCount}`);
    console.log(`📦 Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📦 WebP size: ${(totalWebP / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalSavedPercent}%)`);
    console.log('='.repeat(60));

    // 원본 파일 삭제 여부 물어보기
    console.log('\n⚠️  Note: Original files are kept. To delete them, run:');
    console.log('   node scripts/delete-originals.js');
}

main().catch(console.error);
