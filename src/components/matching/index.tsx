import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';

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
          AI STEP INDICATOR - 칩 + 타이핑 스타일
          ================================================================ */}
      {step <= TOTAL_STEPS && (
        <div className="mb-6">

          {/* --- 가로 칩 버튼들 --- */}
          <div className="flex gap-1.5 mb-4 overflow-x-auto hide-scrollbar pb-1">
            {STEP_INFO.map((item) => {
              const isActive = step === item.num;
              const isCompleted = step > item.num;

              return (
                <motion.div
                  key={item.num}
                  animate={{ scale: isActive ? 1.02 : 1 }}
                  className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 shrink-0
                    ${isActive ? 'bg-slate-900 text-white shadow-lg' : ''}
                    ${isCompleted ? 'bg-emerald-100 text-emerald-700' : ''}
                    ${!isActive && !isCompleted ? 'bg-slate-100 text-slate-400' : ''}
                  `}
                >
                  {isCompleted ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black
                      ${isActive ? 'bg-white/20' : 'bg-slate-200/50'}
                    `}>
                      {item.num}
                    </span>
                  )}
                  <span>{item.title}</span>
                </motion.div>
              );
            })}
          </div>

          {/* --- AI 타이핑 상태 표시 --- */}
          <div className="flex items-center gap-3 px-1">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles size={14} className="text-amber-500" />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm text-slate-600"
                >
                  {step === 1 && 'AI 매칭을 위한 기본 정보를 입력해주세요'}
                  {step === 2 && '정확한 매칭을 위해 연령대를 선택해주세요'}
                  {step === 3 && '개선하고 싶은 부위를 선택해주세요'}
                  {step === 4 && '맞춤 분석을 위한 추가 정보를 입력해주세요'}
                  {step === 5 && 'AI가 최적의 케이스를 분석하고 있습니다'}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block ml-0.5"
                  >
                    _
                  </motion.span>
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* --- 미니 프로그레스 --- */}
          <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-slate-700 to-slate-500 rounded-full"
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
