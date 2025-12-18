import React, { useMemo, useState } from 'react';
import { CheckCircle, Clock, User, ChevronRight, Star, Sparkles, FileText, Target, TrendingUp } from 'lucide-react';
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
        return keywords.slice(0, 5);
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

    // 매칭률 계산 (95% 기본 + 태그 매칭에 따라 조정)
    const matchRate = Math.min(98, 90 + Math.floor(matchedReviews.length / 2));

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #4A3C1A 0%, #6B5A2F 30%, #8B7355 70%, #5C4A1F 100%)' }}>
            <div className="w-full max-w-[800px] mx-auto overflow-hidden flex flex-col relative">

                {/* ========== Header ========== */}
                <div className="flex items-center justify-between px-6 py-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">👑</span>
                        <span className="text-white font-bold text-lg">밸런스랩</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-white/70 text-sm">🔔</span>
                        <span className="text-white/70 text-sm">👤</span>
                    </div>
                </div>

                {/* ========== Hero Section with Images ========== */}
                <div className="relative px-6 pt-4 pb-8">
                    {/* 3 Images Layout */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        {/* Left Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="w-24 h-28 rounded-xl overflow-hidden border-2 shadow-lg"
                            style={{ borderColor: '#C9A962' }}
                        >
                            {matchedReviews[0] && (
                                <img
                                    src={extractImages(matchedReviews[0].content).find(img => img.includes('-b-')) || '/placeholder.jpg'}
                                    alt="Before"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </motion.div>

                        {/* Center - Main Display with Percentage */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="relative w-36 h-44 rounded-2xl overflow-hidden border-4 shadow-2xl"
                            style={{ borderColor: '#D4B86A', background: 'linear-gradient(135deg, #5C4A1F 0%, #8B7355 100%)' }}
                        >
                            {matchedReviews[0] ? (
                                <img
                                    src={extractImages(matchedReviews[0].content).find(img => img.includes('-a-')) || '/placeholder.jpg'}
                                    alt="After"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-white/50 text-sm">이미지</span>
                                </div>
                            )}
                            {/* Percentage Badge */}
                            <div className="absolute bottom-2 right-2 px-3 py-1 rounded-lg font-extrabold text-2xl"
                                style={{ background: 'linear-gradient(135deg, #D4B86A, #F5D88E)', color: '#3D2E0F' }}>
                                {matchRate}%
                            </div>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="w-24 h-28 rounded-xl overflow-hidden border-2 shadow-lg"
                            style={{ borderColor: '#C9A962' }}
                        >
                            {matchedReviews[1] && (
                                <img
                                    src={extractImages(matchedReviews[1].content).find(img => img.includes('-a-')) || '/placeholder.jpg'}
                                    alt="Sample"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </motion.div>
                    </div>

                    {/* User Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-xl font-bold text-white mb-2">
                            {userData.name}님의 맞춤 분석 완료
                        </h1>
                        <p className="text-sm" style={{ color: '#D4B86A' }}>
                            AI가 {matchedReviews.length}건의 유사 케이스를 찾았습니다
                        </p>
                    </motion.div>
                </div>

                {/* ========== 3 Column Info Cards ========== */}
                <div className="px-4 pb-6">
                    <div className="grid grid-cols-3 gap-3">
                        {/* AI 분석 요약 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="rounded-2xl p-4 border"
                            style={{
                                background: 'linear-gradient(180deg, rgba(60, 48, 20, 0.95) 0%, rgba(80, 65, 30, 0.9) 100%)',
                                borderColor: 'rgba(212, 184, 106, 0.3)'
                            }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <FileText size={16} style={{ color: '#D4B86A' }} />
                                <span className="text-white font-bold text-xs">AI 분석 요약</span>
                            </div>
                            <ul className="space-y-1.5 text-[11px]" style={{ color: '#E8D9B0' }}>
                                <li>• {userData.age}대 맞춤 분석</li>
                                <li>• {userData.selectedTags[0] || '피부'} 고민 파악</li>
                                <li>• 최적 솔루션 도출</li>
                            </ul>
                        </motion.div>

                        {/* 매칭 포인트 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="rounded-2xl p-4 border"
                            style={{
                                background: 'linear-gradient(180deg, rgba(60, 48, 20, 0.95) 0%, rgba(80, 65, 30, 0.9) 100%)',
                                borderColor: 'rgba(212, 184, 106, 0.3)'
                            }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Target size={16} style={{ color: '#D4B86A' }} />
                                <span className="text-white font-bold text-xs">매칭 포인트</span>
                            </div>
                            <ul className="space-y-1.5 text-[11px]" style={{ color: '#E8D9B0' }}>
                                <li>• 동일 연령대 케이스</li>
                                <li>• 유사 고민 매칭</li>
                                <li>• 만족도 높은 시술</li>
                            </ul>
                        </motion.div>

                        {/* 기대 효과 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="rounded-2xl p-4 border"
                            style={{
                                background: 'linear-gradient(180deg, rgba(60, 48, 20, 0.95) 0%, rgba(80, 65, 30, 0.9) 100%)',
                                borderColor: 'rgba(212, 184, 106, 0.3)'
                            }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp size={16} style={{ color: '#D4B86A' }} />
                                <span className="text-white font-bold text-xs">기대 효과</span>
                            </div>
                            <ul className="space-y-1.5 text-[11px]" style={{ color: '#E8D9B0' }}>
                                <li>• 자연스러운 개선</li>
                                <li>• 빠른 일상 복귀</li>
                                <li>• 높은 만족도</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* ========== CTA Button ========== */}
                <div className="px-6 pb-6">
                    <motion.a
                        href="tel:1661-8581"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="block w-full py-4 rounded-2xl text-center font-bold text-lg shadow-xl"
                        style={{
                            background: 'linear-gradient(135deg, #D4B86A 0%, #F5D88E 50%, #D4B86A 100%)',
                            color: '#3D2E0F',
                            boxShadow: '0 8px 32px rgba(212, 184, 106, 0.4)'
                        }}
                    >
                        상담신청
                    </motion.a>
                </div>

                {/* ========== Keywords Section ========== */}
                <div className="px-6 pb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {analysisKeywords.map((tag, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 text-xs font-medium rounded-full"
                                style={{
                                    background: 'rgba(212, 184, 106, 0.15)',
                                    color: '#D4B86A',
                                    border: '1px solid rgba(212, 184, 106, 0.3)'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ========== Case Review Slider ========== */}
                <div className="py-8 px-6 relative" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Star size={18} style={{ color: '#D4B86A' }} fill="#D4B86A" />
                            맞춤 후기
                        </h3>
                        <span className="text-xs font-semibold flex items-center cursor-pointer" style={{ color: '#D4B86A' }}>
                            더보기 <ChevronRight size={14} />
                        </span>
                    </div>

                    {matchedReviews.length > 0 ? (
                        <div className="pb-10" style={{ height: '400px' }}>
                            <Slider {...sliderSettings}>
                                {matchedReviews.slice(0, 10).map((review, index) => {
                                    const images = extractImages(review.content);
                                    const beforeImage = images.find(img => img.includes('-b-'));
                                    const afterImage = images.find(img => img.includes('-a-'));

                                    return (
                                        <div key={review.id} className="px-1">
                                            <div
                                                onClick={() => setSelectedReview(review)}
                                                className="overflow-hidden shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-shadow flex flex-col border"
                                                style={{
                                                    height: '360px',
                                                    background: 'linear-gradient(180deg, rgba(60, 48, 20, 0.98) 0%, rgba(45, 36, 15, 0.98) 100%)',
                                                    borderColor: 'rgba(212, 184, 106, 0.3)'
                                                }}
                                            >
                                                <div className="relative w-full flex-shrink-0 flex" style={{ height: '180px' }}>
                                                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full font-medium text-[10px] z-10"
                                                        style={{ background: 'rgba(212, 184, 106, 0.9)', color: '#3D2E0F' }}>
                                                        {index + 1} / {Math.min(matchedReviews.length, 10)}
                                                    </div>

                                                    <div className="w-1/2 relative">
                                                        {beforeImage ? (
                                                            <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center" style={{ background: '#2D240F', color: '#6B5A2F' }}>Before</div>
                                                        )}
                                                        <div className="absolute top-2 left-2 text-white text-[10px] px-2 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.6)' }}>Before</div>
                                                    </div>
                                                    <div className="w-1/2 relative">
                                                        {afterImage ? (
                                                            <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center" style={{ background: '#2D240F', color: '#6B5A2F' }}>After</div>
                                                        )}
                                                        <div className="absolute top-2 left-2 text-white text-[10px] px-2 py-0.5 rounded" style={{ background: '#D4B86A', color: '#3D2E0F' }}>After</div>
                                                    </div>
                                                </div>

                                                <div className="flex-1 p-4 flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(212, 184, 106, 0.15)', color: '#D4B86A', border: '1px solid rgba(212, 184, 106, 0.3)' }}>
                                                                {review.age}대 / {review.tags.slice(0, 2).join(' / ')}
                                                            </span>
                                                            <span className="text-sm tracking-tighter" style={{ color: '#D4B86A' }}>★★★★★</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg w-fit font-semibold mb-3" style={{ background: 'rgba(212, 184, 106, 0.15)', color: '#D4B86A' }}>
                                                            <Star size={14} fill="currentColor" />
                                                            {review.targets.includes('mid') && review.targets.includes('lower') ? '중안면+하안면' :
                                                                review.targets.includes('mid') ? '중안면 개선' :
                                                                    review.targets.includes('lower') ? '하안면 개선' : '전체 개선'} 케이스
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {[
                                                                `#${review.age}대`,
                                                                ...review.tags.slice(0, 2).map(tag => `#${tag}`),
                                                            ].map((tag, i) => (
                                                                <span key={i} className="text-[11px] px-2 py-1 rounded-full font-medium"
                                                                    style={{ background: 'rgba(212, 184, 106, 0.1)', color: '#C9A962', border: '1px solid rgba(212, 184, 106, 0.2)' }}>
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="pt-3 border-t" style={{ borderColor: 'rgba(212, 184, 106, 0.2)' }}>
                                                        <span className="text-xs font-bold flex items-center justify-center gap-1" style={{ color: '#D4B86A' }}>
                                                            자세히 보기 <ChevronRight size={12} />
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
                        <div className="text-center py-10 rounded-xl" style={{ background: 'rgba(60, 48, 20, 0.5)', color: '#8B7355' }}>
                            매칭되는 사례를 찾지 못했습니다.
                        </div>
                    )}
                </div>

                {/* ========== Progress Timeline ========== */}
                <div className="px-6 py-10 relative" style={{ background: 'rgba(0, 0, 0, 0.15)' }}>
                    <h3 className="text-lg font-bold text-white mb-8 text-center">진행 과정</h3>
                    <div className="relative flex justify-between items-center px-4">
                        <div className="absolute top-1/2 left-8 right-8 h-0.5 -z-10 transform -translate-y-1/2" style={{ background: 'rgba(212, 184, 106, 0.3)' }} />
                        <div className="absolute top-1/2 left-8 w-1/3 h-0.5 transform -translate-y-1/2" style={{ background: 'linear-gradient(90deg, #D4B86A, #F5D88E)' }} />

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #D4B86A, #F5D88E)', color: '#3D2E0F' }}>
                                <CheckCircle size={20} />
                            </div>
                            <span className="text-xs font-bold" style={{ color: '#D4B86A' }}>접수완료</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: '#D4B86A' }}
                                />
                                <div className="w-10 h-10 relative rounded-full flex items-center justify-center shadow-lg z-10 border-2"
                                    style={{ background: 'linear-gradient(135deg, #D4B86A, #F5D88E)', borderColor: '#F5D88E', color: '#3D2E0F' }}>
                                    <User size={18} />
                                </div>
                            </div>
                            <span className="text-xs font-bold" style={{ color: '#F5D88E' }}>배정중</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2" style={{ background: 'rgba(212, 184, 106, 0.1)', borderColor: 'rgba(212, 184, 106, 0.3)', color: 'rgba(212, 184, 106, 0.5)' }}>
                                <Clock size={18} />
                            </div>
                            <span className="text-xs font-medium" style={{ color: 'rgba(212, 184, 106, 0.5)' }}>해피콜</span>
                        </div>
                    </div>
                </div>

                {/* ========== Bottom Buttons ========== */}
                <div className="px-6 py-8" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                    {/* Coupon */}
                    <div className="relative mb-6 rounded-xl p-4 flex items-center justify-between overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, rgba(212, 184, 106, 0.15), rgba(245, 216, 142, 0.1))', border: '1px solid rgba(212, 184, 106, 0.3)' }}>
                        <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ background: '#4A3C1A' }} />
                        <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ background: '#4A3C1A' }} />

                        <div className="ml-2">
                            <span className="text-[10px] font-bold" style={{ color: '#D4B86A' }}>SPECIAL GIFT</span>
                            <p className="text-base font-extrabold text-white">AI 정밀 진단 무료권</p>
                        </div>
                        <Sparkles size={24} style={{ color: '#D4B86A' }} />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onRestart}
                            className="flex-1 h-14 rounded-xl font-bold text-base transition-colors"
                            style={{ background: 'rgba(212, 184, 106, 0.1)', border: '2px solid rgba(212, 184, 106, 0.4)', color: '#D4B86A' }}
                        >
                            처음으로
                        </button>
                        <a
                            href="tel:1661-8581"
                            className="flex-[2] h-14 rounded-xl shadow-lg font-bold text-lg flex items-center justify-center transition-all hover:opacity-90"
                            style={{
                                background: 'linear-gradient(135deg, #D4B86A 0%, #F5D88E 50%, #D4B86A 100%)',
                                color: '#3D2E0F',
                                boxShadow: '0 8px 24px rgba(212, 184, 106, 0.4)'
                            }}
                        >
                            상담 연결하기
                        </a>
                    </div>
                </div>

            </div>

            {/* Review Modal */}
            <ReviewModal
                review={selectedReview}
                onClose={() => setSelectedReview(null)}
            />
        </div>
    );
};
