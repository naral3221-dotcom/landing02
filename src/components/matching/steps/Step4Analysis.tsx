import React, { useState, useEffect } from 'react';
import { Loader2, Lock, Check, ShieldCheck } from 'lucide-react';

interface Props {
    userName: string; // Step 1에서 받은 이름 ("홍길동"님)
    onNext: () => void; // 최종 결과 페이지로 이동
}

export const Step4Analysis: React.FC<Props> = ({ userName, onNext }) => {
    const [progress, setProgress] = useState(0);
    const [loadingStep, setLoadingStep] = useState(0);
    const [isAgreed, setIsAgreed] = useState(false);

    // 로딩 멘트 사이클
    const LOADING_MESSAGES = [
        '얼굴형 및 고민 부위 분석 중...',
        '유사한 연령대 데이터 검색 중...',
        '윤곽/피부 타입 매칭 진행 중...',
        '최적의 시술 케이스 선별 완료!',
    ];

    // 1. AI 분석 시뮬레이션 (2.5초)
    useEffect(() => {
        if (progress >= 100) return;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // 진행률이 올라갈수록 속도를 조금씩 늦춤 (리얼함 추가)
                const increment = prev < 50 ? 4 : prev < 80 ? 2 : 1;
                return Math.min(prev + increment, 100);
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    // 진행률에 따라 멘트 변경
    useEffect(() => {
        if (progress < 30) setLoadingStep(0);
        else if (progress < 60) setLoadingStep(1);
        else if (progress < 90) setLoadingStep(2);
        else setLoadingStep(3);
    }, [progress]);


    // --- [Phase 1: 로딩 화면] ---
    if (progress < 100) {
        return (
            <div className="w-full max-w-xl mx-auto py-12 flex flex-col items-center justify-center animate-fadeIn">
                <div className="relative mb-8">
                    {/* 돌아가는 로딩 아이콘 */}
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full animate-pulse" />
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {LOADING_MESSAGES[loadingStep]}
                </h3>
                <p className="text-slate-500 text-sm mb-8">
                    잠시만 기다려주세요 ({Math.floor(progress)}%)
                </p>

                {/* 프로그레스 바 */}
                <div className="w-full max-w-xs h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        );
    }

    // --- [Phase 2: 게이트 화면 (결과 잠금)] ---
    return (
        <div className="w-full max-w-xl mx-auto animate-fadeInUp">

            {/* 1. 상단 메시지 */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-4">
                    <Check size={12} strokeWidth={4} />
                    분석 완료
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    <span className="text-blue-600">{userName}</span>님에게 딱 맞는<br />
                    <span className="underline decoration-blue-200 decoration-4 underline-offset-4">
                        BEST 성공 사례
                    </span>를 찾았습니다.
                </h2>
            </div>

            {/* 2. 티저 카드 (블러 처리) */}
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 mb-8 group">
                {/* 블러된 배경 이미지 (실제 후기 느낌) */}
                <div className="absolute inset-0 bg-slate-200">
                    {/* 가짜 데이터 이미지들을 흐릿하게 깔아둠 */}
                    <div className="grid grid-cols-2 h-full opacity-50 blur-md scale-105">
                        <div className="bg-slate-300 m-1 rounded-lg"></div>
                        <div className="bg-slate-300 m-1 rounded-lg"></div>
                        <div className="bg-slate-300 m-1 rounded-lg"></div>
                        <div className="bg-slate-300 m-1 rounded-lg"></div>
                    </div>
                </div>

                {/* 잠금 오버레이 */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-10">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce-slow">
                        <Lock className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">결과가 잠겨있습니다</h4>
                    <p className="text-slate-600 text-sm md:text-base break-keep">
                        의료법상 전후 사진 및 상세 후기는<br />
                        <strong>상담 신청 동의 후</strong> 열람이 가능합니다.
                    </p>
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
            w-full mt-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
            ${isAgreed
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }
          `}
                >
                    {isAgreed ? (
                        <>
                            <ShieldCheck className="w-5 h-5" />
                            결과 확인 및 상담 신청하기
                        </>
                    ) : (
                        '동의하고 결과 확인하기'
                    )}
                </button>
            </div>

        </div>
    );
};