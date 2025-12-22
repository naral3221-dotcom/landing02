import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Lock, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { REVIEWS } from '@/data/reviews';
import { getAssetPath } from '@/utils/paths';

interface Props {
    userName: string; // Step 1에서 받은 이름 ("홍길동"님)
    onNext: () => void; // 최종 결과 페이지로 이동
}

/* ========== Circular Progress Component ========== */
interface CircularProgressProps {
    value: number;
    size?: number;
    strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    size = 160,
    strokeWidth = 12,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max(value, 0), 100);
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* 글로우 효과 */}
            <div
                className="absolute inset-0 blur-2xl opacity-30 rounded-full animate-pulse"
                style={{ background: 'radial-gradient(circle, #C9A962 0%, transparent 70%)' }}
            />

            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="rotate-[-90deg]"
            >
                {/* 배경 트랙 */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    className="stroke-slate-100"
                />
                {/* 진행 인디케이터 */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    stroke="url(#progressGradient)"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ strokeDasharray: circumference }}
                />
                {/* 그라데이션 정의 */}
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B7355" />
                        <stop offset="100%" stopColor="#C9A962" />
                    </linearGradient>
                </defs>
            </svg>

            {/* 중앙 퍼센트 표시 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Sparkles size={20} className="mb-1" style={{ color: '#C9A962' }} />
                <span className="text-3xl font-black text-slate-900">{Math.round(percentage)}%</span>
                <span className="text-xs text-slate-400 font-medium">분석중</span>
            </div>
        </div>
    );
};

export const Step5Analysis: React.FC<Props> = ({ userName, onNext }) => {
    const [progress, setProgress] = useState(0);
    const [loadingStep, setLoadingStep] = useState(0);
    const [isAgreed, setIsAgreed] = useState(false);

    // 랜덤 후기 개수 (3~8개 사이)
    const matchedCount = useMemo(() => Math.floor(Math.random() * 6) + 3, []);

    // 전/후 이미지가 모두 있는 후기 찾기
    const sampleReview = useMemo(() => {
        // 전/후 이미지가 모두 있는 후기만 필터링
        const reviewsWithBeforeAfter = REVIEWS.filter(review => {
            if (!review?.content) return false;
            const hasBeforeSection = review.content.includes('✅시술 전');
            const hasAfterSection = review.content.includes('✅시술 후');
            return hasBeforeSection && hasAfterSection;
        });

        if (reviewsWithBeforeAfter.length === 0) {
            return REVIEWS[Math.floor(Math.random() * REVIEWS.length)];
        }

        const randomIndex = Math.floor(Math.random() * reviewsWithBeforeAfter.length);
        return reviewsWithBeforeAfter[randomIndex];
    }, []);

    // 후기에서 전/후 이미지 경로 추출
    const { beforeImage, afterImage } = useMemo(() => {
        if (!sampleReview?.content) {
            console.log('[Step5] No sample review content');
            return { beforeImage: null, afterImage: null };
        }

        const content = sampleReview.content;

        // "✅시술 전" 섹션에서 첫 번째 이미지 추출 (box 태그 포함 대응)
        const beforeSectionMatch = content.match(/(<box>)?✅시술 전(<\/box>)?[\s\S]*?(?=(<box>)?✅시술 후|$)/);
        let beforeImg = null;
        if (beforeSectionMatch) {
            const beforeImageMatch = beforeSectionMatch[0].match(/public\\match\\[^\n]+\.webp/);
            if (beforeImageMatch) {
                // public\ 제거 후 경로 생성
                const cleanPath = beforeImageMatch[0].replace(/\\/g, '/').replace(/^public\//, '/');
                beforeImg = getAssetPath(cleanPath);
                console.log('[Step5] Before image:', beforeImg);
            } else {
                console.log('[Step5] No before image match found');
            }
        } else {
            console.log('[Step5] No before section match');
        }

        // "✅시술 후" 섹션에서 첫 번째 이미지 추출 (box 태그 포함 대응)
        const afterSectionMatch = content.match(/(<box>)?✅시술 후(<\/box>)?[\s\S]*?(?=<title>|$)/);
        let afterImg = null;
        if (afterSectionMatch) {
            const afterImageMatch = afterSectionMatch[0].match(/public\\match\\[^\n]+\.webp/);
            if (afterImageMatch) {
                // public\ 제거 후 경로 생성
                const cleanPath = afterImageMatch[0].replace(/\\/g, '/').replace(/^public\//, '/');
                afterImg = getAssetPath(cleanPath);
                console.log('[Step5] After image:', afterImg);
            } else {
                console.log('[Step5] No after image match found');
            }
        } else {
            console.log('[Step5] No after section match');
        }

        return { beforeImage: beforeImg, afterImage: afterImg };
    }, [sampleReview]);

    // 로딩 멘트 사이클
    const LOADING_MESSAGES = [
        '얼굴형 및 고민 부위 분석 중...',
        '유사한 연령대 데이터 검색 중...',
        '윤곽/피부 타입 매칭 진행 중...',
        '최적의 시술 케이스 선별 완료!',
    ];

    // AI 분석 시뮬레이션 (3초)
    useEffect(() => {
        if (progress >= 100) return;

        const duration = 3000; // 3초
        const interval = 30; // 30ms마다 업데이트
        const totalSteps = duration / interval;
        const increment = 100 / totalSteps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return Math.min(prev + increment, 100);
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // 진행률에 따라 멘트 변경
    useEffect(() => {
        if (progress < 25) setLoadingStep(0);
        else if (progress < 50) setLoadingStep(1);
        else if (progress < 75) setLoadingStep(2);
        else setLoadingStep(3);
    }, [progress]);


    // --- [Phase 1: 로딩 화면] ---
    if (progress < 100) {
        return (
            <div className="w-full max-w-xl mx-auto py-8 flex flex-col items-center justify-center animate-fadeIn">
                {/* 신뢰 뱃지 */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5" style={{ backgroundColor: 'rgba(212, 184, 106, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)', color: '#8B7355' }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#C9A962' }} />
                        AI 분석 진행중
                    </div>
                    <div className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(212, 184, 106, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)', color: '#8B7355' }}>
                        STEP 5 OF 5
                    </div>
                </div>

                {/* 원형 프로그레스 */}
                <div className="mb-8">
                    <CircularProgress value={progress} />
                </div>

                {/* 로딩 메시지 */}
                <motion.h3
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-bold text-slate-900 mb-2 text-center"
                >
                    {LOADING_MESSAGES[loadingStep]}
                </motion.h3>
                <p className="text-slate-500 text-sm text-center">
                    {userName}님의 최적 케이스를 찾고 있습니다
                </p>

                {/* 분석 항목 리스트 */}
                <div className="mt-8 w-full max-w-xs space-y-2">
                    {LOADING_MESSAGES.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                                idx <= loadingStep ? 'opacity-100' : 'opacity-30'
                            }`}
                        >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                idx <= loadingStep
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-100'
                            }`}>
                                {idx <= loadingStep && <Check size={12} strokeWidth={3} />}
                            </div>
                            <span className={idx <= loadingStep ? 'text-slate-700' : 'text-slate-400'}>
                                {msg.replace('...', '').replace(' 중', '').replace(' 완료!', '')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // --- [Phase 2: 게이트 화면 (결과 잠금)] ---
    return (
        <div className="w-full max-w-xl mx-auto animate-fadeInUp">

            {/* 1. 상단 메시지 */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: 'rgba(212, 184, 106, 0.2)', color: '#8B7355' }}>
                    <Check size={12} strokeWidth={4} />
                    분석 완료
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight break-keep">
                    <span style={{ background: 'linear-gradient(90deg, #8B7355, #C9A962)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{userName}</span>님의 케이스와 부합한<br />
                    <span className="underline decoration-4 underline-offset-4" style={{ textDecorationColor: 'rgba(201, 169, 98, 0.4)' }}>
                        BEST 성공 사례 <span style={{ background: 'linear-gradient(90deg, #8B7355, #C9A962)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{matchedCount}개</span>
                    </span>를 찾았습니다!
                </h2>
            </div>

            {/* 2. 전/후 비교 카드 (블러 처리) */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 mb-6">
                {/* 전/후 이미지 비교 영역 */}
                <div className="relative bg-slate-100 overflow-hidden">
                    <div className="flex">
                        {/* 시술 전 */}
                        <div className="flex-1 relative">
                            <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-slate-900/70 text-white text-[10px] font-bold rounded">
                                BEFORE
                            </div>
                            {beforeImage ? (
                                <img
                                    src={beforeImage}
                                    alt="시술 전"
                                    className="w-full aspect-[3/4] object-cover blur-md scale-105"
                                />
                            ) : (
                                <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 blur-sm" />
                            )}
                        </div>

                        {/* 중앙 구분선 */}
                        <div className="w-px bg-white/50 z-20" />

                        {/* 시술 후 */}
                        <div className="flex-1 relative">
                            <div className="absolute top-3 right-3 z-20 px-2 py-1 text-white text-[10px] font-bold rounded" style={{ backgroundColor: 'rgba(201, 169, 98, 0.9)' }}>
                                AFTER
                            </div>
                            {afterImage ? (
                                <img
                                    src={afterImage}
                                    alt="시술 후"
                                    className="w-full aspect-[3/4] object-cover blur-md scale-105"
                                />
                            ) : (
                                <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 blur-sm" />
                            )}
                        </div>
                    </div>

                    {/* 잠금 오버레이 */}
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-10">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center mb-3 shadow-lg">
                            <Lock className="w-5 h-5" />
                        </div>
                        <p className="text-slate-600 text-sm break-keep leading-relaxed max-w-[280px]">
                            <strong className="text-slate-800">밸런스랩은 의료법을 준수</strong>하기에<br />
                            개인정보 수집 동의 및 상담 신청 후<br />
                            해당 후기를 열람하실 수 있습니다.
                        </p>
                    </div>
                </div>

                {/* 하단 후기 정보 (블러 처리) */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: 'rgba(212, 184, 106, 0.2)', color: '#8B7355' }}>
                                    {sampleReview?.age}대
                                </span>
                                <span className="text-xs">⭐⭐⭐⭐⭐</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {sampleReview?.tags.slice(0, 2).map((tag, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500">
                                        #{tag}
                                    </span>
                                ))}
                                {(sampleReview?.tags.length || 0) > 2 && (
                                    <span className="text-[10px] text-slate-400">+{(sampleReview?.tags.length || 0) - 2}</span>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-400">외 {matchedCount - 1}건의 후기</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. 동의 및 잠금해제 버튼 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center mt-0.5">
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow-sm checked:border-blue-500 checked:bg-blue-500 transition-all"
                        />
                        <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={14} strokeWidth={3} />
                    </div>
                    <div className="text-sm text-slate-600 select-none">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            [필수] 개인정보 수집 및 활용 동의
                        </span>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            입력하신 정보는 상담을 위한 기초 자료로 활용되며,
                            전문 상담 실장이 확인 후 순차적으로 연락드립니다.
                        </p>
                    </div>
                </label>

                <button
                    onClick={onNext}
                    disabled={!isAgreed}
                    className={`
            w-full mt-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all relative overflow-hidden group
            ${isAgreed
                            ? 'text-white shadow-lg hover:shadow-2xl hover:scale-105 transform'
                            : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
                        }
          `}
                    style={isAgreed ? { background: 'linear-gradient(135deg, #8B7355 0%, #C9A962 100%)', boxShadow: '0 10px 30px -5px rgba(139, 115, 85, 0.4)' } : {}}
                >
                    {isAgreed && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2), rgba(139, 115, 85, 0.2))' }} />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        {isAgreed ? (
                            <>
                                <ShieldCheck className="w-5 h-5" />
                                결과 확인 및 상담 신청하기
                            </>
                        ) : (
                            '동의하고 결과 확인하기'
                        )}
                    </span>
                </button>
            </div>

        </div>
    );
};