import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트들
import { Step1NamePhone, Step1Data } from './steps/Step1NamePhone';
import { Step2Age } from './steps/Step2Age';
import { Step3ConcernSelection } from './steps/Step3Concern';
import { Step4Question, Step4Data } from './steps/Step4Question';
import { Step5Analysis } from './steps/Step5Analysis';

export interface MatchingData {
    name: string;
    phone: string;
    age: string;
    selectedTags: string[];
    hasContouringExp: boolean | null;
    priority: string;
}

const INITIAL_DATA: MatchingData = {
    name: '',
    phone: '',
    age: '',
    selectedTags: [],
    hasContouringExp: null,
    priority: '',
};

export const AiMatchingSystem: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [data, setData] = useState<MatchingData>(INITIAL_DATA);
    const navigate = useNavigate();

    // ✨ [수정 1] 컨테이너의 위치를 잡기 위한 Ref 생성
    const containerRef = useRef<HTMLDivElement>(null);

    // ✨ [수정 2] 다음 단계 이동 시 실행할 부드러운 스크롤 함수
    const handleScroll = () => {
        if (containerRef.current) {
            // 현재 컨테이너의 위치 확인
            const element = containerRef.current;
            const headerOffset = 120; // 헤더 높이 + 여유 공간 (px)
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // --- 🕹️ 핸들러 ---

    // STEP 1: 이름/번호 입력 완료 -> 나이 선택(2)으로 이동
    const handleStep1Next = (step1Data: Step1Data) => {
        setData((prev) => ({ ...prev, ...step1Data }));
        setStep(2);
        handleScroll(); // ✨ 맨 위가 아니라 컨테이너 위치로 스크롤
    };

    // STEP 2: 나이 선택 완료 -> 고민 부위(3)로 이동
    const handleStep2Next = (age: string) => {
        setData((prev) => ({ ...prev, age }));
        setStep(3);
        handleScroll();
    };

    // STEP 3: 태그 선택 로직
    const handleToggleTag = useCallback((tag: string) => {
        setData((prev) => {
            const isSelected = prev.selectedTags.includes(tag);
            return {
                ...prev,
                selectedTags: isSelected
                    ? prev.selectedTags.filter((t) => t !== tag)
                    : [...prev.selectedTags, tag],
            };
        });
    }, []);

    // STEP 3 완료 -> 질문(4)으로 이동
    const handleStep3Next = () => {
        setStep(4);
        handleScroll();
    };

    // STEP 4 완료 -> 분석(5)으로 이동
    const handleStep4Next = (step4Data: Step4Data) => {
        setData((prev) => ({ ...prev, ...step4Data }));
        setStep(5);
        handleScroll();
    };

    // STEP 5 완료 -> /result 페이지로 이동
    const handleStep5Next = () => {
        // userData를 URL 파라미터로 전달
        const queryData = encodeURIComponent(JSON.stringify(data));
        navigate(`/result?data=${queryData}`);
    };

    // 총 입력 단계 수 (결과 페이지 제외)
    const TOTAL_STEPS = 5;

    return (
        // ✨ [수정 3] ref={containerRef} 추가
        <div
            ref={containerRef}
            className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden md:p-8 p-4 min-h-[500px] transition-all duration-500 ease-in-out"
        >

            {/* 상단 프로그레스 바 */}
            {step <= TOTAL_STEPS && (
                <div className="mb-8 px-2">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                        <span>Matching Process</span>
                        <span>Step {step} of {TOTAL_STEPS}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-slate-900 transition-all duration-500 ease-out"
                            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* ✨ [수정 4] key={step} 추가 
         단계가 바뀔 때마다 div를 새로 그려서 animate-fadeIn 효과가 
         매번 발동되게 하여 '슬라이드/전환' 느낌을 줌
      */}
            <div key={step} className="animate-fadeIn">

                {step === 1 && (
                    <Step1NamePhone
                        onNext={handleStep1Next}
                        defaultValues={{ name: data.name, phone: data.phone }}
                    />
                )}

                {step === 2 && (
                    <Step2Age
                        onNext={handleStep2Next}
                        defaultAge={data.age}
                    />
                )}

                {step === 3 && (
                    <Step3ConcernSelection
                        selectedTags={data.selectedTags}
                        onToggleTag={handleToggleTag}
                        onNext={handleStep3Next}
                    />
                )}

                {step === 4 && (
                    <Step4Question
                        onNext={handleStep4Next}
                        defaultValues={{ hasContouringExp: data.hasContouringExp, priority: data.priority }}
                    />
                )}

                {step === 5 && (
                    <Step5Analysis
                        userName={data.name}
                        onNext={handleStep5Next}
                    />
                )}
            </div>
        </div>
    );
};