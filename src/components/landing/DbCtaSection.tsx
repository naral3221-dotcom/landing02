import { motion } from 'motion/react';
import { Sparkles, Scan } from 'lucide-react';
import { getAssetPath } from '../../utils/paths';

const GlowingCheckIcon = () => (
  <div className="relative shrink-0 w-6 h-6">
    <div
      className="absolute inset-0 rounded-full blur-md opacity-70"
      style={{ background: 'radial-gradient(circle, #FDFBCE 0%, #F5D88E 50%, transparent 70%)' }}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#goldGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative z-10"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDFBCE" />
          <stop offset="50%" stopColor="#F5D88E" />
          <stop offset="100%" stopColor="#E8C86B" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  </div>
);

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
      {/* 백그라운드 이미지 */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url('${getAssetPath('/bg/group-6.webp')}')` }}
      />
      {/* 노이즈 텍스처 - 질감 강화 */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
      {/* 빛 효과 */}
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
          className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-full font-extrabold mb-8 border-2 backdrop-blur-md text-lg shadow-sm"
          style={{ borderColor: '#F6F8EA' }}
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
              className="flex items-center gap-4 bg-white/10 border-2 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-colors text-left"
              style={{ borderColor: '#F6F8EA' }}
            >
              <GlowingCheckIcon />
              <span className="text-white font-bold text-base tracking-tight">{point}</span>
            </motion.div>
          ))}
        </div>

        {/* --- Spacer --- */}
        <div className="h-8" aria-hidden="true" />

        {/* --- Sub Copy --- */}
        <p className="mb-10 text-base leading-relaxed font-medium drop-shadow-md" style={{ color: '#F5E6C8', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          밸런스랩에서 시술받은<br />
          실제 환자 데이터를 바탕으로<br />
          나와 가장 유사한 케이스의<br />
          결과와 후기를<br />
          <strong className="text-white drop-shadow-lg">AI가 정밀하게 분석하여 보여드립니다.</strong>
        </p>

        {/* --- Spacer --- */}
        <div className="h-8" aria-hidden="true" />

        {/* --- CTA Button --- */}
        <div className="flex flex-col gap-4 justify-center items-center px-4">
          <button
            onClick={onScrollToForm}
            className="flex items-center justify-center bg-white text-xl px-10 py-6 rounded-full font-bold shadow-xl transition-transform hover:scale-105 border-2 border-transparent whitespace-nowrap"
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
