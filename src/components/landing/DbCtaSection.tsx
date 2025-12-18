import { motion } from 'motion/react';
import { Sparkles, Scan, CheckCircle2 } from 'lucide-react';

/* ============================================================================
   DB CTA SECTION
   - AI 매칭 시스템 소개 및 CTA 버튼
   - 외부 UI 컴포넌트 의존성 없음 (독립적)
   - 모바일 전용 (430px)
   ============================================================================ */

interface DbCtaProps {
  onScrollToForm: () => void;
}

export const DbCtaSection = ({ onScrollToForm }: DbCtaProps) => {

  /* ========== Data ========== */
  const checkPoints = [
    "내 연령대 1:1 매칭",
    "유사 고민 부위 분석",
    "밸런스랩 실제 시술 데이터",
    "전후 결과 및 리얼 후기 매칭"
  ];

  return (
    <section className="pt-20 pb-0 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #5C4A1F 0%, #8B7355 50%, #6B5A2F 100%)' }}>

      {/* ========== Background Effects ========== */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 mix-blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-amber-900/20 rounded-full blur-[100px]" />
      </div>

      {/* ========== Content ========== */}
      <div className="px-4 relative z-10 text-center">

        {/* --- AI Matching Badge --- */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-full font-bold mb-8 border border-white/30 backdrop-blur-md text-lg shadow-sm"
        >
          <Sparkles size={24} className="shrink-0" style={{ color: '#F5D88E' }} />
          <span className="drop-shadow-sm">내 케이스 AI 매칭 시스템</span>
        </motion.div>

        {/* --- Main Copy --- */}
        <h2 className="text-2xl font-black text-white mb-12 leading-tight break-keep drop-shadow-sm">
          얼굴형도 고민도<br />
          나와 똑같은 사람,<br />
          <span style={{ color: '#F5E6C8' }}>어떤 시술로 효과를 봤을까요?</span>
        </h2>

        {/* --- Check Points Grid --- */}
        <div className="grid grid-cols-1 gap-4 mx-auto mb-10">
          {checkPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-colors text-left"
            >
              <CheckCircle2 className="shrink-0 w-6 h-6" style={{ color: '#F5D88E' }} />
              <span className="text-white font-bold text-base tracking-tight">{point}</span>
            </motion.div>
          ))}
        </div>

        {/* --- Spacer --- */}
        <div className="h-8" aria-hidden="true" />

        {/* --- Sub Copy --- */}
        <p className="mb-10 text-base leading-relaxed font-medium opacity-90" style={{ color: '#F5E6C8' }}>
          밸런스랩에서 시술받은 실제 환자 데이터를 바탕으로<br />
          나와 가장 유사한 케이스의 결과와 후기를<br />
          <strong className="text-white">AI가 정밀하게 분석하여 보여드립니다.</strong>
        </p>

        {/* --- Spacer --- */}
        <div className="h-8" aria-hidden="true" />

        {/* --- CTA Button --- */}
        <div className="flex flex-col gap-4 justify-center items-center px-4">
          <button
            onClick={onScrollToForm}
            className="flex items-center justify-center bg-white text-xl px-10 py-6 rounded-full font-bold shadow-xl transition-transform hover:scale-105 border-2 border-transparent"
            style={{ color: '#5C4A1F', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }}
          >
            <Scan className="mr-2 h-7 w-7 shrink-0" />
            내 케이스 AI 매칭하기
          </button>
        </div>

        {/* --- Bottom Spacer --- */}
        <div className="h-8" aria-hidden="true" />
      </div>
    </section>
  );
};
