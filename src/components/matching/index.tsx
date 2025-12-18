import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트들
import { Step1NamePhone, Step1Data } from './steps/Step1NamePhone';
import { Step2Age } from './steps/Step2Age';
import { Step3ConcernSelection } from './steps/Step3Concern';
import { Step4Question, Step4Data } from './steps/Step4Question';
import { Step5Analysis } from './steps/Step5Analysis';

/* ============================================================================
   AI MATCHING SYSTEM
   - 5단계 AI 매칭 폼 시스템
   - 외부 UI 컴포넌트 의존성 없음 (독립적)
   - 모바일 전용 (430px)
   ============================================================================ */

/* ========== Types ========== */
export interface MatchingData {
  name: string;
  phone: string;
  age: string;
  selectedTags: string[];
  hasContouringExp: boolean | null;
  priority: string;
}

/* ========== Constants ========== */
const INITIAL_DATA: MatchingData = {
  name: '',
  phone: '',
  age: '',
  selectedTags: [],
  hasContouringExp: null,
  priority: '',
};

const TOTAL_STEPS = 5;

const STEP_INFO = [
  { num: 1, title: '정보입력' },
  { num: 2, title: '연령선택' },
  { num: 3, title: '고민선택' },
  { num: 4, title: '추가질문' },
  { num: 5, title: 'AI분석' },
];

/* ========== Main Component ========== */
export const AiMatchingSystem: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<MatchingData>(INITIAL_DATA);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  /* ========== Helpers ========== */
  const handleScroll = () => {
    if (containerRef.current) {
      const element = containerRef.current;
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  /* ========== Step Handlers ========== */

  // STEP 1: 이름/번호 입력 완료 -> 나이 선택(2)으로 이동
  const handleStep1Next = (step1Data: Step1Data) => {
    setData((prev) => ({ ...prev, ...step1Data }));
    setStep(2);
    handleScroll();
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
    const queryData = encodeURIComponent(JSON.stringify(data));
    navigate(`/result?data=${queryData}`);
  };

  /* ========== Render ========== */
  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden p-4 min-h-[500px] transition-all duration-500 ease-in-out"
    >

      {/* ================================================================
          STEP INDICATOR
          ================================================================ */}
      {step <= TOTAL_STEPS && (
        <div className="mb-8 px-2">

          {/* --- Title --- */}
          <h2 className="text-center text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">
            AI Matching Process
          </h2>

          {/* --- Step Navigation --- */}
          <div className="flex items-center justify-between gap-1 mb-3 overflow-x-auto hide-scrollbar">
            {STEP_INFO.map((item, index) => {
              const isActive = step === item.num;
              const isCompleted = step > item.num;

              return (
                <div key={item.num} className="flex items-center flex-1 min-w-0">
                  {/* Step Item */}
                  <div className={`
                    flex flex-col items-center flex-1 py-2 px-1 rounded-lg transition-all duration-300
                    ${isActive ? 'bg-slate-900 text-white scale-105 shadow-lg' : ''}
                    ${isCompleted ? 'bg-emerald-50 text-emerald-600' : ''}
                    ${!isActive && !isCompleted ? 'bg-slate-50 text-slate-400' : ''}
                  `}>
                    <span className={`text-[10px] font-bold ${isActive ? 'text-slate-300' : ''}`}>
                      STEP {item.num}
                    </span>
                    <span className={`text-xs font-bold mt-0.5 truncate max-w-full ${isCompleted ? 'text-emerald-600' : ''}`}>
                      {isCompleted ? '✓ ' : ''}{item.title}
                    </span>
                  </div>

                  {/* Connector Line (마지막 제외) */}
                  {index < 4 && (
                    <div className={`w-2 h-0.5 flex-shrink-0 transition-colors duration-300 ${
                      isCompleted ? 'bg-emerald-300' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* --- Progress Bar --- */}
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-slate-800 to-slate-600 transition-all duration-500 ease-out"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ================================================================
          STEP CONTENT
          ================================================================ */}
      <div key={step} className="animate-fadeIn">

        {/* --- Step 1: Name & Phone --- */}
        {step === 1 && (
          <Step1NamePhone
            onNext={handleStep1Next}
            defaultValues={{ name: data.name, phone: data.phone }}
          />
        )}

        {/* --- Step 2: Age Selection --- */}
        {step === 2 && (
          <Step2Age
            onNext={handleStep2Next}
            defaultAge={data.age}
          />
        )}

        {/* --- Step 3: Concern Selection --- */}
        {step === 3 && (
          <Step3ConcernSelection
            selectedTags={data.selectedTags}
            onToggleTag={handleToggleTag}
            onNext={handleStep3Next}
          />
        )}

        {/* --- Step 4: Additional Questions --- */}
        {step === 4 && (
          <Step4Question
            onNext={handleStep4Next}
            defaultValues={{ hasContouringExp: data.hasContouringExp, priority: data.priority }}
          />
        )}

        {/* --- Step 5: AI Analysis --- */}
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
