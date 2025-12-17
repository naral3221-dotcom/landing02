import React, { useMemo, useState } from 'react';
import { CheckCircle, Clock, User, ChevronRight, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { REVIEWS } from '../../../data/reviews';
import { ReviewData } from '@/types';
import { ReviewModal } from '../../result/ReviewModal';

type ScoredReview = ReviewData & {
    score: number;
    isContouringReview: boolean;
};

interface UserData {
    name: string;
    phone: string;
    age: string;
    selectedTags: string[];
    hasContouringExp: boolean | null;
    priority: string;
}

interface Props {
    userData: UserData;
    onRestart: () => void;
}

export const Step6Result: React.FC<Props> = ({ userData, onRestart }) => {
    // --- 모달 상태 관리 ---
    const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);

    // --- 매칭 로직 ---
    const matchedReviews = useMemo((): ScoredReview[] => {
        if (!REVIEWS || REVIEWS.length === 0) return [];
        const results = REVIEWS.filter((review): review is ReviewData => !!review);

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

    // --- 키워드 생성 ---
    const analysisKeywords = useMemo(() => {
        const keywords = [`#${userData.age}대`];
        if (userData.selectedTags.length > 0) {
            keywords.push(...userData.selectedTags.slice(0, 2).map(tag => `#${tag}`));
        }
        if (userData.hasContouringExp) keywords.push('#윤곽후관리');
        if (userData.priority) keywords.push(`#${userData.priority.split(' ')[0]}중요`);
        return keywords.slice(0, 5); // 최대 5개
    }, [userData]);

    // --- 이미지 추출 함수 ---
    const extractImages = (content: string) => {
        const lines = content.split('\n');
        const images: string[] = [];
        for (const line of lines) {
            const trimmed = line.trim();
            if ((trimmed.endsWith('.jpg') || trimmed.endsWith('.png')) &&
                (trimmed.includes('-a-') || trimmed.includes('-b-'))) {
                images.push('/' + trimmed.replace(/\\/g, '/'));
            }
        }
        return images;
    };

    // --- Slider 설정 ---
    const sliderSettings = {
        dots: true,
        infinite: matchedReviews.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: matchedReviews.length > 1,
        autoplaySpeed: 4000,
        arrows: false,
        dotsClass: "slick-dots !bottom-[-35px]",
        accessibility: true,
        focusOnSelect: false,
    };

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-0 sm:pt-10 pb-0 sm:pb-10">
            <div className="w-full max-w-md bg-white sm:rounded-[2.5rem] shadow-2xl overflow-hidden min-h-screen sm:min-h-[800px] flex flex-col">

                {/* ========== Hero Section ========== */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 pt-12 pb-20 px-6 rounded-b-[3rem] shadow-lg z-10">
                    <div className="flex flex-col items-center text-center text-white space-y-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.8 }}
                            className="bg-white/20 backdrop-blur-md p-4 rounded-full shadow-inner"
                        >
                            <div className="bg-white text-indigo-600 rounded-full p-3 shadow-xl">
                                <CheckCircle size={48} strokeWidth={3} />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-2xl font-bold mb-2 leading-snug">
                                {userData.name}님의 상담이<br />정상적으로 접수되었습니다.
                            </h1>
                            <p className="text-blue-100 font-medium opacity-90">
                                전문 상담사가 배정되었습니다.
                            </p>
                        </motion.div>
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                        <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
                    </div>
                </div>

                {/* ========== AI Analysis Report ========== */}
                <div className="px-6 -mt-12 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="border-0 shadow-xl overflow-hidden rounded-3xl bg-white"
                    >
                        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                            <span className="text-white font-bold flex items-center gap-2">
                                <Sparkles size={18} className="text-cyan-400" />
                                AI Analysis Report
                            </span>
                            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-full">Ver 2.0</span>
                        </div>
                        <div className="p-6 bg-white">
                            <div className="flex flex-col items-center">
                                <div className="w-full flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-500 font-medium">분석 대상</p>
                                        <p className="text-lg font-bold text-slate-900">{userData.name}님</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500 font-medium">종합 매칭률</p>
                                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                            98%
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-200 mb-6" />

                                <div className="w-full">
                                    <p className="text-sm text-slate-500 mb-3 font-medium">주요 키워드 분석</p>
                                    <div className="flex flex-col gap-2 w-full">
                                        {analysisKeywords.map((tag, i) => (
                                            <span key={i} className="w-full px-3 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 rounded-lg text-center break-keep">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 text-center w-full">
                                    <p className="text-sm text-slate-800 font-bold">
                                        🎉 축하드립니다! 총 <span className="text-indigo-600 text-lg font-extrabold">{matchedReviews.length}</span>건의 후기가 매칭되었습니다!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ========== Case Review Slider ========== */}
                <div className="py-12 px-6 bg-slate-50">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">투명브이리프팅 후기</h3>
                        <span className="text-xs text-blue-600 font-semibold flex items-center cursor-pointer">
                            더보기 <ChevronRight size={14} />
                        </span>
                    </div>

                    {matchedReviews.length > 0 ? (
                        <div className="pb-10" style={{ height: '420px' }}>
                            <Slider {...sliderSettings}>
                                {matchedReviews.slice(0, 10).map((review, index) => {
                                    const images = extractImages(review.content);
                                    const beforeImage = images.find(img => img.includes('-b-')); // b type = before
                                    const afterImage = images.find(img => img.includes('-a-'));  // a type = after

                                    const tagText = `${review.age}대 / ${review.tags.slice(0, 2).join(' / ')}`;

                                    return (
                                        <div key={review.id} className="px-1">
                                            <div
                                                onClick={() => setSelectedReview(review)}
                                                style={{ height: '380px' }}
                                                className="overflow-hidden border-none shadow-md rounded-2xl bg-white cursor-pointer hover:shadow-xl transition-shadow flex flex-col">
                                                <div className="relative w-full flex-shrink-0 flex" style={{ height: '192px' }}>
                                                    {/* Image Counter Badge */}
                                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-medium z-10 border border-white/10">
                                                        {index + 1} / {Math.min(matchedReviews.length, 10)}
                                                    </div>

                                                    <div className="w-1/2 relative">
                                                        {beforeImage ? (
                                                            <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">Before</div>
                                                        )}
                                                        <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">Before</div>
                                                    </div>
                                                    <div className="w-1/2 relative">
                                                        {afterImage ? (
                                                            <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">After</div>
                                                        )}
                                                        <div className="absolute top-2 left-2 bg-blue-600/80 text-white text-[10px] px-2 py-0.5 rounded">After</div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 p-4 bg-white flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="text-xs text-slate-500 border border-slate-200 px-2 py-1 rounded">
                                                                {tagText}
                                                            </span>
                                                            <span className="text-amber-400 text-sm tracking-tighter">★★★★★</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg w-fit font-semibold mb-3">
                                                            <Star size={14} fill="currentColor" />
                                                            {review.targets.includes('mid') && review.targets.includes('lower') ? '중안면+하안면' :
                                                                review.targets.includes('mid') ? '중안면 개선' :
                                                                    review.targets.includes('lower') ? '하안면 개선' : '전체 개선'} 케이스
                                                        </div>
                                                    </div>
                                                    <div className="pt-3 border-t border-slate-200">
                                                        <span className="text-blue-600 text-xs font-bold flex items-center justify-center gap-1">
                                                            자세히 보기
                                                            <ChevronRight size={12} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-400">
                            매칭되는 사례를 찾지 못했습니다.
                        </div>
                    )}
                </div>

                {/* ========== Doctor Comment ========== */}
                <div className="px-6 pb-12 bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">담당 의료진 코멘트</h3>
                    <div className="flex gap-4 items-start">
                        <div className="flex flex-col items-center gap-2 min-w-[70px]">
                            <div className="w-16 h-16 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                                DR
                            </div>
                            <span className="text-xs font-bold text-slate-700">밸런스랩 원장</span>
                        </div>
                        <div className="relative bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex-1">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                <span className="font-bold text-slate-800">"{userData.name}님, 고민하신 부위는 충분히 개선 가능합니다."</span>
                                <br className="mb-2" />
                                데이터 분석 결과, {userData.priority === '자연스러운 결과' ? '자연스럽고 안전한' : '회복이 빠르면서도 효과적인'} 솔루션이 적합해 보입니다. 내원 시 더 자세히 설명해드릴게요.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ========== Progress Timeline ========== */}
                <div className="px-6 py-12 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] mt-auto">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 text-center">진행 과정 안내</h3>
                    <div className="relative flex justify-between items-center px-4">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 transform -translate-y-1/2 mx-8" />
                        <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 -z-0 transform -translate-y-1/2 mx-8" />

                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <CheckCircle size={20} />
                            </div>
                            <span className="text-xs font-bold text-blue-600">접수완료</span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-indigo-500 rounded-full"
                                />
                                <div className="w-10 h-10 relative rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 z-10 border-4 border-white">
                                    <User size={18} />
                                </div>
                            </div>
                            <span className="text-xs font-bold text-indigo-600">배정중</span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 border-4 border-white">
                                <Clock size={18} />
                            </div>
                            <span className="text-xs font-medium text-slate-400">해피콜</span>
                        </div>
                    </div>
                </div>

                {/* ========== Benefits Bottom ========== */}
                <div className="px-6 pb-8 bg-white">
                    {/* Coupon Ticket */}
                    <div className="relative mb-8 group cursor-pointer">
                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-xl p-5 flex items-center justify-between relative overflow-hidden">
                            {/* Dashed line decoration */}
                            <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-r border-pink-100" />
                            <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-l border-pink-100" />

                            <div className="flex flex-col ml-3">
                                <span className="text-xs font-bold text-rose-500 mb-1">SPECIAL GIFT</span>
                                <span className="text-lg font-extrabold text-slate-800">AI 정밀 진단 무료권</span>
                                <span className="text-[10px] text-slate-500 mt-1">상담 예약 시 자동 적용됩니다.</span>
                            </div>
                            <div className="bg-white p-2 rounded-full shadow-sm text-rose-500 mr-2">
                                <Sparkles size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onRestart}
                            className="flex-1 h-14 rounded-xl text-slate-600 border-2 border-slate-200 hover:bg-slate-50 font-bold text-base transition-colors"
                        >
                            처음으로
                        </button>
                        <a
                            href="tel:1661-8581"
                            className="flex-[2] h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-200 font-bold text-lg flex items-center justify-center transition-all"
                        >
                            상담 연결하기
                        </a>
                    </div>
                </div>

            </div>

            {/* ========== Review Modal ========== */}
            <ReviewModal
                review={selectedReview}
                onClose={() => setSelectedReview(null)}
            />
        </div>
    );
};
