import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';

// 컴포넌트들
import { Step1NamePhone, Step1Data } from './steps/Step1NamePhone';
import { Step2Age } from './steps/Step2Age';
import { Step3ConcernSelection } from './steps/Step3Concern';
import { Step4Question, Step4Data } from './steps/Step4Question';
import { Step5Analysis } from './steps/Step5Analysis';
import { generateAccessToken } from '../../utils/accessToken';

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

/* ========== Ripple Animation Settings ========== */
const RIPPLE_CONFIG = {
  size: 48,          // 리플 크기 (px) - 원형 버튼은 32px
  top: -8,           // 위치 조절 (px) - 음수: 위로, 양수: 아래로 (버튼과 중앙 맞춤: -(size-32)/2)
  color: '#C9A962',  // 빛 색상
  opacityMin: 0.15,  // 최소 투명도
  opacityMax: 0.35,  // 최대 투명도
  scaleMin: 1,       // 최소 스케일
  scaleMax: 1.10,    // 최대 스케일
  duration: 1.2,     // 애니메이션 속도 (초)
};

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

  // STEP 5 완료 -> DB 제출 -> Result Page로 이동
  const handleStep5Next = () => {
    // AI 매칭 결과를 텍스트로 구성
    const matchingContent = `
[AI 매칭 결과]
━━━━━━━━━━━━━━━━━━━━━━━━━━━
나이대: ${data.age}
고민 태그: ${data.selectedTags.join(', ')}
윤곽관리 경험: ${data.hasContouringExp ? '있음' : '없음'}
우선순위: ${data.priority}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

[상담 희망 시술]
투명브이리프팅
    `.trim();

    // PHP form_update_tvlanding.php로 제출할 폼 생성 (투명브이 전용)
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://balancelab.kr/Landings/inc/form_update_tvlanding.php';

    // 토큰 생성 (결과 페이지 접근용)
    const token = generateAccessToken({
      name: data.name,
      age: data.age,
      tags: data.selectedTags,
      exp: data.hasContouringExp || false,
      priority: data.priority
    });

    // 리다이렉트 URL 생성
    const resultBaseUrl = import.meta.env.DEV
      ? 'http://localhost:5173'
      : `https://balancelab.kr/Landings/tvlanding01-1/result`;

    const params = new URLSearchParams({
      token: encodeURIComponent(token),
      name: data.name,
      age: data.age,
      tags: data.selectedTags.join(','),
      exp: String(data.hasContouringExp || false),
      priority: data.priority,
    });

    const resultUrl = `${resultBaseUrl}?${params.toString()}`;

    const fields = {
      bo_table: 'board3',
      ca_name: '투명브이_META',
      wr_subject: `[랜딩] 251219_투명브이_META`,
      wr_name: data.name,
      wr_7: data.phone,
      wr_content: matchingContent,
      wr_3: document.referrer || '',
      wr_5: '투명브이리프팅',
      wr_10: '251219_투명브이_META',
      completekey: String(Math.floor(Date.now() / 1000)),
      targetName: data.name,
      // 결과 페이지로 리다이렉트 설정
      redirect_to_result: 'true',
      result_url: resultUrl
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  /* ========== Render ========== */
  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-visible border border-slate-100 relative min-h-[500px]"
    >
      <div className="p-5 space-y-6">

        {/* ================================================================
            MODERN PROGRESS STEPS - 피그마 디자인
            ================================================================ */}
        <div className="relative px-1 pt-2 pb-6">
          {/* Step Indicators Container */}
          <div className="relative max-w-[430px] mx-auto">
            {/* Connection Line Background - 스텝 원형 중앙을 관통하는 라인 */}
            <div className="absolute top-[16px] left-[16px] right-[16px] h-[2px] bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #8B7355, #C9A962)' }}
                initial={{ width: "0%" }}
                animate={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "circOut" }}
              />
            </div>

            <div className="relative flex justify-between items-center z-10">
            {STEP_INFO.map((item) => {
              const isActive = step === item.num;
              const isCompleted = step > item.num;

              return (
                <div key={item.num} className="flex flex-col items-center gap-2 relative group cursor-default">
                  {/* Active Ripple Animation - 은은한 빛이 두근두근 */}
                  {isActive && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none -z-10"
                      style={{
                        width: RIPPLE_CONFIG.size,
                        height: RIPPLE_CONFIG.size,
                        top: RIPPLE_CONFIG.top,
                        backgroundColor: RIPPLE_CONFIG.color,
                      }}
                      animate={{
                        scale: [RIPPLE_CONFIG.scaleMin, RIPPLE_CONFIG.scaleMax, RIPPLE_CONFIG.scaleMin],
                        opacity: [RIPPLE_CONFIG.opacityMax, RIPPLE_CONFIG.opacityMin, RIPPLE_CONFIG.opacityMax]
                      }}
                      transition={{ duration: RIPPLE_CONFIG.duration, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  <motion.div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center border-[2.5px] z-10 bg-white transition-all duration-300 relative shadow-sm
                      ${isActive ? 'shadow-[0_0_15px_rgba(201,169,98,0.3)]' : ''}
                      ${isCompleted ? 'text-white border-transparent' : ''}
                      ${!isActive && !isCompleted ? 'border-slate-100 text-slate-300' : ''}
                    `}
                    style={
                      isActive ? { borderColor: '#8B7355', color: '#8B7355' } :
                        isCompleted ? { borderColor: '#8B7355', backgroundColor: '#8B7355' } :
                          {}
                    }
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <span className="text-[11px] font-extrabold">{item.num}</span>
                    )}
                  </motion.div>

                  {/* Label */}
                  <div className={`
                    absolute -bottom-6 text-[10px] whitespace-nowrap transition-all duration-500
                    ${isActive ? 'font-bold transform translate-y-0 opacity-100' : 'font-medium transform -translate-y-1 opacity-0'}
                  `}
                    style={{ color: isActive ? '#C9A962' : '#cbd5e1' }}
                  >
                    {item.title}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>

        {/* ================================================================
            AI HELPER TEXT
            ================================================================ */}
        <div className="flex items-center justify-center gap-2">
          <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #8B7355, #C9A962)' }}>
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <div className="text-sm font-medium text-[#1e293b] min-h-[20px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={step}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && 'AI 매칭을 위한 기본 정보를 입력해주세요'}
                {step === 2 && '정확한 매칭을 위해 연령대를 선택해주세요'}
                {step === 3 && '개선하고 싶은 부위를 선택해주세요'}
                {step === 4 && '맞춤 분석을 위한 추가 정보를 입력해주세요'}
                {step === 5 && 'AI가 최적의 케이스를 분석하고 있습니다'}
              </motion.span>
            </AnimatePresence>
            <span className="animate-pulse ml-0.5" style={{ color: '#C9A962' }}>_</span>
          </div>
        </div>

        {/* ================================================================
            STEP CONTENT
            ================================================================ */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
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
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
