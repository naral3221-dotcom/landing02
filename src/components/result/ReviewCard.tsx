import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ReviewData } from '@/types';

interface ReviewCardProps {
  review: ReviewData;
  index: number;
  onClick: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, index, onClick }) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // content에서 모든 이미지 경로 추출
  const extractAllImages = useMemo(() => {
    const lines = review.content.split('\n');
    const images: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if ((trimmed.endsWith('.jpg') || trimmed.endsWith('.png')) &&
        (trimmed.includes('-a-') || trimmed.includes('-b-'))) {
        images.push('/' + trimmed.replace(/\\/g, '/'));
      }
    }
    return images;
  }, [review.content]);

  const primaryImage = extractAllImages[0];

  const getSummary = () => {
    let cleanText = review.content.replace(/<[^>]*>/g, '').replace(/public\\[^ \n]*/g, '').trim();
    const titleMatch = review.content.match(/<title>(.*?)<\/title>/);
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1];
    }
    return cleanText.slice(0, 50);
  };
  const summaryText = getSummary();

  const handleImageError = (imageIndex: number) => {
    setImageErrors(prev => ({ ...prev, [imageIndex]: true }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-lg border border-[#333] hover:border-slate-500 transition-all duration-300 cursor-pointer group h-full flex flex-row"
    >
      {/* 이미지 영역 - 왼쪽 (4:3 비율) */}
      <div className="p-2 flex-shrink-0">
        <div className="relative w-28 h-21 bg-slate-800 overflow-hidden rounded-lg border-2 border-slate-600">
          {!imageErrors[0] && primaryImage ? (
            <>
              <img
                src={primaryImage}
                alt="Review"
                onError={() => handleImageError(0)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* 검은색 투명 배경 + 사진 개수 표시 */}
              {extractAllImages.length > 1 && (
                <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                  +{extractAllImages.length - 1}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600 text-xs">No Img</div>
          )}
        </div>
      </div>

      {/* 정보 영역 - 오른쪽 */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div className="flex-1">
          {/* 상단: 별점만 */}
          <div className="flex justify-end items-center mb-2">
            <div className="flex gap-0">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className="text-sm leading-none">⭐</span>
              ))}
            </div>
          </div>

          {/* 메인 타이틀 (리뷰 요약) */}
          <h3 className="text-white text-xs font-bold leading-snug line-clamp-2 mb-2">
            {summaryText}
          </h3>
        </div>

        {/* 하단: 태그 + 자세히 보기 */}
        <div className="flex items-center justify-between pt-2 border-t border-[#333]">
          <div className="flex flex-wrap gap-1">
            {review.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[9px] text-[#aaa] border border-[#444] px-1 py-0.5 rounded bg-[#2a2a2a]">
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-blue-400 text-[10px] font-bold flex items-center gap-0.5 shrink-0">
            자세히 보기
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
