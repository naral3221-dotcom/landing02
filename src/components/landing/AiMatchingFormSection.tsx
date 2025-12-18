import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { AiMatchingSystem } from '../matching';

/* ============================================================================
   AI MATCHING FORM SECTION
   - AI 매칭 폼 영역 (헤더 + 통계 + 폼)
   - 외부 UI 컴포넌트 의존성 없음 (독립적)
   - 모바일 전용 (430px)
   ============================================================================ */

export const AiMatchingFormSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="py-12 relative overflow-hidden bg-slate-50">

      {/* ========== Background Effects ========== */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #FFFEF7, rgba(212, 184, 106, 0.05), #F8F6F0)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(180,150,80,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(180,150,80,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ backgroundColor: 'rgba(212, 184, 106, 0.1)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full blur-[80px] pointer-events-none animate-pulse" style={{ backgroundColor: 'rgba(180, 150, 80, 0.08)', animationDelay: '1s' }} />

      {/* ========== Content ========== */}
      <div className="px-4 relative z-10">

        {/* --- Header Text --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold leading-tight break-words text-slate-900 mb-4">
            정확한 CASE 매칭을 위해 <br />
            <span style={{ background: 'linear-gradient(90deg, #8B7355, #C9A962)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>정보를 입력해주세요</span>
          </h2>

          <p className="text-slate-500 text-sm break-keep leading-relaxed">
            <strong className="text-slate-700">빅데이터 기반 AI 시스템</strong>이<br />
            가장 유사한 <strong className="text-slate-700">성공 사례</strong>를 찾아드립니다.
          </p>
        </motion.div>

        {/* --- Stats --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm text-center" style={{ border: '1px solid rgba(212, 184, 106, 0.3)' }}>
            <div className="text-xl font-bold" style={{ color: '#8B7355' }}>1,247+</div>
            <div className="text-xs text-slate-500">누적 매칭 성공</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm text-center" style={{ border: '1px solid rgba(212, 184, 106, 0.3)' }}>
            <div className="text-xl font-bold" style={{ color: '#C9A962' }}>98.2%</div>
            <div className="text-xs text-slate-500">만족도</div>
          </div>
        </motion.div>

        {/* --- Live Status --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#C9A962' }} />
          현재 실시간 분석 시스템 가동 중
        </motion.div>

        {/* --- AI Matching Form Component --- */}
        <AiMatchingSystem />

      </div>
    </section>
  );
});

AiMatchingFormSection.displayName = 'AiMatchingFormSection';
