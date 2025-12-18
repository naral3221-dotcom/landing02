import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { AiMatchingSystem } from '../matching';

/* ============================================================================
   AI MATCHING FORM SECTION
   - AI 매칭 폼 영역 (헤더 + 통계 + 폼)
   - 외부 UI 컴포넌트 의존성 없음 (독립적)
   - 모바일 전용 (430px)
   ============================================================================ */

/* ========== StatBox Component ========== */
const StatBox = ({ iconSrc, value, label }: { iconSrc: string; value: string; label: string }) => (
  <div
    className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-[#C9A962]/30 transition-colors"
    style={{ aspectRatio: '173 / 95' }}
  >
    <div className="flex flex-col items-center gap-3">
      <div className="bg-[#f8f5f2] p-1.5 rounded-lg">
        <img src={iconSrc} alt={label} className="w-6 h-6 object-contain" />
      </div>
      <div className="font-bold text-[#1e293b] text-lg leading-none tracking-wide">{value}</div>
      <div className="text-[10px] text-slate-400 font-medium leading-none tracking-wider">{label}</div>
    </div>
  </div>
);

export const AiMatchingFormSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="py-12 relative overflow-hidden bg-[#F8F9FA]">

      {/* ========== Background Effects ========== */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #FFFEF7, rgba(212, 184, 106, 0.05), #F8F6F0)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(180,150,80,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(180,150,80,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

      {/* ========== Content ========== */}
      <div className="px-4 relative z-10">

        {/* --- Top Spacer --- */}
        <div className="h-8" aria-hidden="true" />

        {/* --- Live Status Badge --- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e293b]/5 border border-[#1e293b]/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A962] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9A962]"></span>
            </span>
            <span className="text-xs font-bold text-[#1e293b]">현재 실시간 분석 시스템 가동 중</span>
          </div>
        </motion.div>

        {/* --- Header Text --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-[#1e293b] leading-[1.3] tracking-tight mb-3">
            정확한 <span style={{ color: '#8B7355' }}>CASE 매칭</span>을 위해<br />
            정보를 입력해주세요
          </h2>

          <p className="text-sm text-slate-500 leading-relaxed">
            빅데이터 기반 AI 시스템이 고객님과 가장 유사한<br />
            성공 사례를 1:1로 찾아드립니다.
          </p>
        </motion.div>

        {/* --- Stats Grid (Figma Style) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          <StatBox
            iconSrc="/source/icon/누적매칭 icon.png"
            value="1,247+"
            label="누적 매칭 성공"
          />
          <StatBox
            iconSrc="/source/icon/고객만족도 아이콘.png"
            value="98.2%"
            label="고객 만족도"
          />
          <StatBox
            iconSrc="/source/icon/시술건수 아이콘.png"
            value="12,678+"
            label="누적 시술건수"
          />
          <StatBox
            iconSrc="/source/icon/상담건수 아이콘.png"
            value="37,975+"
            label="누적 상담건수"
          />
        </motion.div>

        {/* --- AI Matching Form Component --- */}
        <AiMatchingSystem />

        {/* --- Bottom Spacer (Footer와의 간격) --- */}
        <div className="h-8" aria-hidden="true" />

      </div>
    </section>
  );
});

AiMatchingFormSection.displayName = 'AiMatchingFormSection';
