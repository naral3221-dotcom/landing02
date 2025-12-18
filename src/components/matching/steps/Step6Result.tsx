import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ChevronRight,
  Share2,
  Download,
  RotateCcw,
  Phone,
  Sparkles,
  ScanLine,
  Activity,
  Target,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star
} from 'lucide-react';
import { ReviewModal, ReviewData } from '../../result/OriginalReviewModal';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- landing02 imports ---
import { REVIEWS } from '../../../data/reviews';
import { ReviewData as Landing02ReviewData } from '@/types';

// --- Types ---

interface Step6ResultProps {
  userData: {
    name: string;
    phone: string;
    age: string;
    selectedTags: string[];
    hasContouringExp?: boolean | null;
    priority: string;
  };
  onRestart: () => void;
}

type ScoredReview = Landing02ReviewData & {
  score: number;
  isContouringReview: boolean;
};

// --- Utility Functions ---

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// 이미지 추출 함수 (landing02 로직)
const extractImages = (content: string) => {
  const lines = content.split('\n');
  const images: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if ((trimmed.endsWith('.jpg') || trimmed.endsWith('.png') || trimmed.endsWith('.webp')) &&
      (trimmed.includes('-a-') || trimmed.includes('-b-'))) {
      // public\ 또는 public/ 제거하고 /로 시작하게 변환
      const path = '/' + trimmed.replace(/^public[\\\/]/, '').replace(/\\/g, '/');
      images.push(path);
    }
  }
  return images;
};

// 후기 텍스트 추출 (이미지 경로 제외)
const extractReviewText = (content: string) => {
  const lines = content.split('\n');
  const textLines: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed &&
        !trimmed.endsWith('.jpg') &&
        !trimmed.endsWith('.png') &&
        !trimmed.endsWith('.webp') &&
        !trimmed.startsWith('match/')) {
      textLines.push(trimmed);
    }
  }
  const text = textLines.join(' ').slice(0, 200);
  return text || '시술 후 만족스러운 결과를 얻었습니다. 자연스러운 변화가 마음에 들어요.';
};

// landing02 ReviewData -> 원본 ReviewData 변환
const convertToOriginalReview = (review: ScoredReview): ReviewData => {
  const images = extractImages(review.content);
  const beforeImage = images.find(img => img.includes('-b-')) || '';
  const afterImage = images.find(img => img.includes('-a-')) || '';

  const ageMap: Record<string, string> = {
    '20': '20대',
    '30': '30대',
    '40': '40대',
    '50': '50대'
  };

  return {
    id: review.id,
    name: review.name || `${ageMap[review.age]} 고객`,
    age: ageMap[review.age] || review.age,
    rating: 5,
    date: '2024.12',
    content: extractReviewText(review.content),
    tags: review.tags,
    beforeImage,
    afterImage
  };
};

const ANALYSIS_KEYWORDS = [
  "#30대_집중관리", "#무너진_턱선", "#탄력저하", "#맞춤윤곽", "#즉각리프팅"
];

// --- Component ---

export const Step6Result: React.FC<Step6ResultProps> = ({ userData, onRestart }) => {
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [matchScore, setMatchScore] = useState(0);

  // Counter animation
  useEffect(() => {
    const target = 98;
    const duration = 2000;
    const interval = 20;
    const step = target / (duration / interval);

    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setMatchScore(target);
        clearInterval(timer);
      } else {
        setMatchScore(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // --- 매칭 로직 (landing02) ---
  const matchedReviews = useMemo((): ScoredReview[] => {
    if (!REVIEWS || REVIEWS.length === 0) return [];
    const results = REVIEWS.filter((review): review is Landing02ReviewData => !!review);

    const scoredResults = results.map((review) => {
      let score = 0;
      const isContouringReview = review.memo?.includes('contouring') || false;

      if (userData.hasContouringExp && isContouringReview) score += 1000;
      if (review.age === userData.age) score += 100;

      const tagMatchCount = review.tags.filter((tag) =>
        userData.selectedTags.some(userTag => userTag.includes(tag))
      ).length;
      score += tagMatchCount * 10;

      return { ...review, score, isContouringReview };
    });

    return scoredResults
      .filter(item => {
        if (userData.hasContouringExp && item.isContouringReview) return true;
        if (item.age !== userData.age) return false;
        return item.score > 0;
      })
      .sort((a, b) => b.score - a.score);
  }, [userData]);

  // 변환된 리뷰 (원본 형식)
  const displayReviews = useMemo(() => {
    return matchedReviews.slice(0, 10).map(convertToOriginalReview);
  }, [matchedReviews]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    variableWidth: true,
    centerMode: true,
    className: "review-slider",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 overflow-x-hidden relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-amber-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <ReviewModal
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        review={selectedReview}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-1.5 text-amber-500 font-bold text-lg">
          <Sparkles size={18} />
          <span>BALANCE LAB</span>
        </div>
        <div className="flex gap-4">
          <button className="text-slate-400 hover:text-white transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 relative z-10 max-w-lg mx-auto space-y-8">

        {/* User Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-2">
            <ScanLine size={12} />
            AI ANALYSIS COMPLETE
          </div>
          <h1 className="text-2xl font-bold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              {userData.name}님
            </span>의<br />
            얼굴 분석 결과입니다.
          </h1>
          <p className="text-slate-400 text-sm">
            AI가 {userData.age}대 {userData.priority} 고민 케이스<br/>
            <span className="text-white font-semibold">{matchedReviews.length > 0 ? `${matchedReviews.length}건` : '12,482건'}</span>을 분석했습니다.
          </p>
        </motion.div>

        {/* Hero Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative p-1 rounded-3xl bg-gradient-to-b from-amber-500/20 to-transparent"
        >
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-[22px] p-8 text-center overflow-hidden">
             {/* Scanning Effect Overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent animate-scan pointer-events-none" />

             <div className="relative z-10">
               <p className="text-slate-400 text-sm font-medium mb-1">나와 유사한 사례 매칭률</p>
               <div className="flex items-center justify-center gap-1 mb-2">
                 <span className="text-6xl font-black text-white tracking-tighter drop-shadow-lg">
                   {matchScore}
                 </span>
                 <span className="text-2xl font-bold text-amber-500 mb-2">%</span>
               </div>

               {/* Progress Bar */}
               <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                 <motion.div
                   className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                   initial={{ width: 0 }}
                   animate={{ width: `${matchScore}%` }}
                   transition={{ duration: 2, ease: "easeOut" }}
                 />
               </div>

               <div className="inline-flex items-center gap-1.5 text-xs text-amber-200/80 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-900/50">
                 <Sparkles size={12} />
                 <span>상위 1% 매칭 정확도</span>
               </div>
             </div>
          </div>
        </motion.div>

        {/* 3 Column Info Cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Activity className="text-blue-400" size={20} />, label: "분석 요약", value: "복합형" },
            { icon: <Target className="text-red-400" size={20} />, label: "핵심 포인트", value: userData.priority || "자연스러움" },
            { icon: <CheckCircle2 className="text-emerald-400" size={20} />, label: "기대 효과", value: "92%" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-slate-800/50 transition-colors"
            >
              <div className="bg-slate-950 p-2 rounded-full border border-white/5 shadow-inner">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <span className="block text-xs text-slate-500">{item.label}</span>
                <span className="block text-sm font-bold text-slate-200">{item.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Keywords Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {userData.selectedTags.concat(ANALYSIS_KEYWORDS).slice(0, 6).map((keyword, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium"
            >
              {keyword.startsWith('#') ? keyword : `#${keyword}`}
            </span>
          ))}
        </motion.div>

        {/* Case Review Slider */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-500 rounded-full" />
              유사 케이스 매칭 결과
            </h3>

          </div>

          {displayReviews.length > 0 ? (
            <div className="slider-container -mx-4">
              <style>{`
                .slider-container .slick-slide {
                  padding: 0 8px;
                }
                .slider-container .slick-track {
                  display: flex;
                  align-items: stretch;
                }
              `}</style>
              <Slider {...sliderSettings} dots={false}>
                {displayReviews.map((review) => (
                  <div key={review.id} className="outline-none h-full" style={{ width: 300 }}>
                    <div
                      onClick={() => setSelectedReview(review)}
                      className="cursor-pointer bg-slate-900 border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:border-amber-500/50 transition-colors group"
                    >
                      <div className="relative h-48 bg-slate-800">
                        <div className="grid grid-cols-2 h-full w-full">
                          <div className="relative border-r border-black/20">
                             {review.beforeImage ? (
                               <img src={review.beforeImage} alt="Before" className="w-full h-full object-cover" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">Before</div>
                             )}
                             <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold">BEFORE</div>
                          </div>
                          <div className="relative">
                             {review.afterImage ? (
                               <img src={review.afterImage} alt="After" className="w-full h-full object-cover" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">After</div>
                             )}
                             <div className="absolute top-2 left-2 bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-bold">AFTER</div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-bold text-sm">{review.name}</span>
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                          {review.content}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {review.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 bg-slate-800 rounded text-slate-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="text-center py-10 rounded-xl bg-slate-900/50 text-slate-500">
              매칭되는 사례를 찾지 못했습니다.
            </div>
          )}
        </section>

        {/* Process Timeline */}
        <section className="bg-slate-900/30 border border-white/5 rounded-2xl p-6">
           <h3 className="text-base font-bold text-white mb-6">진행 상황 안내</h3>
           <div className="relative flex justify-between items-center z-0">
             {/* Line */}
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10" />
             <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-amber-500/50 -z-10" />

             {[
               { step: 1, label: "접수완료", active: true },
               { step: 2, label: "분석완료", active: true, current: true },
               { step: 3, label: "상담배정", active: false }
             ].map((item, idx) => (
               <div key={idx} className="flex flex-col items-center gap-2 bg-slate-950 px-2">
                 <div className={cn(
                   "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                   item.current ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110" :
                   item.active ? "bg-slate-700 text-slate-300" : "bg-slate-800 text-slate-600"
                 )}>
                   {item.active ? <CheckCircle2 size={16} /> : item.step}
                 </div>
                 <span className={cn(
                   "text-xs font-medium",
                   item.current ? "text-amber-500" : "text-slate-500"
                 )}>{item.label}</span>
               </div>
             ))}
           </div>
        </section>

        {/* Bottom Spacer */}
        <div className="h-12" />
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-50">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl py-4 flex items-center justify-center gap-2 transition-all border border-slate-700"
            onClick={onRestart}
          >
            <RotateCcw size={18} />
            다시하기
          </button>
          <a
            href="tel:1661-8581"
            className="flex-[2] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl py-4 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
          >
            <Phone size={18} />
            무료 상담 신청하기
          </a>
        </div>
      </div>
    </div>
  );
};
