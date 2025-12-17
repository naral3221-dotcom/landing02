import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ReviewData } from '@/types';
import { ReviewContentRenderer } from '../ReviewContentRenderer';

interface ReviewModalProps {
  review: ReviewData | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ review, onClose }) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (review) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [review]);

  if (!review) return null;

  return (
    <AnimatePresence>
      {review && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* 모달 컨텐츠 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white sm:rounded-3xl shadow-2xl w-full h-full sm:h-auto sm:max-w-3xl sm:max-h-[90vh] overflow-hidden z-10 flex flex-col"
          >
            {/* 플로팅 X 버튼 - 우측 상단 고정 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2.5 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all border border-slate-200"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            {/* 헤더 - 고정 */}
            <div className="flex-shrink-0 sticky top-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-center z-20">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                투명브이리프팅 후기
              </h2>
            </div>

            {/* 컨텐츠 영역 - 스크롤 가능 */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <ReviewContentRenderer content={review.content} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
