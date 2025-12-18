const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../public/match');
const MAX_WIDTH = 1200; // 최대 너비
const QUALITY = 80; // WebP 품질 (1-100)

let totalOriginal = 0;
let totalOptimized = 0;
let processedCount = 0;

async function getImageFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files.push(...await getImageFiles(fullPath));
        } else if (/\.(png|jpg|jpeg)$/i.test(item.name)) {
            files.push(fullPath);
        }
    }
    return files;
}

async function optimizeImage(inputPath) {
    try {
        const originalSize = fs.statSync(inputPath).size;
        totalOriginal += originalSize;

        // WebP 출력 경로 (.png/.jpg -> .webp)
        const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

        // 이미지 메타데이터 확인
        const metadata = await sharp(inputPath).metadata();

        // 리사이징 + WebP 변환
        let pipeline = sharp(inputPath);

        if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        await pipeline
            .webp({ quality: QUALITY })
            .toFile(outputPath);

        const optimizedSize = fs.statSync(outputPath).size;
        totalOptimized += optimizedSize;

        // 원본 삭제
        fs.unlinkSync(inputPath);

        processedCount++;
        const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
        console.log(`[${processedCount}] ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${savings}% 감소)`);

    } catch (error) {
        console.error(`Error processing ${inputPath}:`, error.message);
    }
}

async function main() {
    console.log('이미지 최적화 시작...\n');
    console.log(`설정: 최대 너비 ${MAX_WIDTH}px, WebP 품질 ${QUALITY}%\n`);

    const files = await getImageFiles(SOURCE_DIR);
    console.log(`총 ${files.length}개 이미지 발견\n`);

    for (const file of files) {
        await optimizeImage(file);
    }

    console.log('\n========== 완료 ==========');
    console.log(`처리된 이미지: ${processedCount}개`);
    console.log(`원본 크기: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`최적화 후: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
    console.log(`절감: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
}

main().catch(console.error);
