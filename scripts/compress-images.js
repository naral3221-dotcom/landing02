const sharp = require('sharp');
const { glob } = require('glob');
const path = require('path');
const fs = require('fs');

// 압축 설정
const QUALITY = 80; // JPG/WebP 품질 (80 추천)
const MAX_WIDTH = 1200; // 최대 가로 크기 (px)

// 압축할 폴더들
const FOLDERS = [
    'public/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
    'build/assets/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}'
];

async function compressImage(filePath) {
    try {
        const metadata = await sharp(filePath).metadata();
        const originalSize = fs.statSync(filePath).size;
        const originalSizeMB = originalSize / 1024 / 1024;

        // 1MB 미만 파일은 건너뛰기
        if (originalSizeMB < 1.0) {
            console.log(`⏭️  Skipping (already optimized): ${path.relative(process.cwd(), filePath)} (${originalSizeMB.toFixed(2)} MB)`);
            return null;
        }

        console.log(`📸 Processing: ${path.relative(process.cwd(), filePath)}`);
        console.log(`   Original: ${originalSizeMB.toFixed(2)} MB (${metadata.width}x${metadata.height})`);

        // 이미지 압축 (원본 덮어쓰기)
        const pipeline = sharp(filePath);

        // 리사이즈 (가로가 MAX_WIDTH보다 크면)
        if (metadata.width > MAX_WIDTH) {
            pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
        }

        // 포맷별 압축
        if (filePath.match(/\.(jpg|jpeg)$/i)) {
            await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(filePath + '.tmp');
        } else if (filePath.match(/\.png$/i)) {
            await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toFile(filePath + '.tmp');
        }

        // 압축된 파일로 교체
        fs.renameSync(filePath + '.tmp', filePath);

        const compressedSize = fs.statSync(filePath).size;
        const savedPercent = ((1 - compressedSize / originalSize) * 100).toFixed(1);

        console.log(`   Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)} MB (${savedPercent}% saved) ✅\n`);

        return {
            original: originalSize,
            compressed: compressedSize,
            saved: originalSize - compressedSize
        };
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return null;
    }
}

async function main() {
    console.log('🚀 Starting image compression...\n');
    console.log(`Settings: Quality=${QUALITY}%, Max Width=${MAX_WIDTH}px\n`);

    let totalOriginal = 0;
    let totalCompressed = 0;
    let fileCount = 0;

    for (const pattern of FOLDERS) {
        const files = await glob(pattern, { nodir: true });

        for (const file of files) {
            const result = await compressImage(file);
            if (result) {
                totalOriginal += result.original;
                totalCompressed += result.compressed;
                fileCount++;
            }
        }
    }

    const totalSaved = totalOriginal - totalCompressed;
    const totalSavedPercent = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;

    console.log('\n' + '='.repeat(60));
    console.log('✨ Compression Complete!');
    console.log('='.repeat(60));
    console.log(`📊 Total files: ${fileCount}`);
    console.log(`📦 Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📦 Compressed size: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalSavedPercent}%)`);
    console.log('='.repeat(60));
}

main().catch(console.error);
