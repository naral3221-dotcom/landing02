import { motion } from 'motion/react';
import modelImage from '/source/main model.png';
import mainBg from '/source/main bg.png';
import titleImage from '/source/find your balance.webp';
import bannerImage from '/source/banner.png';

/* ============================================================================
   HERO SECTION
   - 메인 히어로 영역 (모델 이미지 + 타이틀 + CTA)
   - 외부 UI 컴포넌트 의존성 없음 (독립적)
   - 모바일 전용 (430px)
   ============================================================================ */

export const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white flex flex-col items-center pt-6 justify-start" style={{ paddingBottom: '120px' }}>

      {/* ========== Background Image ========== */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={mainBg}
          alt="Background"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* ========== Main Content ========== */}
      <div className="relative z-10 px-4 flex flex-col items-center h-full max-w-lg">

        {/* --- Header Badge --- */}
        <motion.img
          src={bannerImage}
          alt="Balance Lab Plastic Surgery"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-auto"
          style={{ width: '400px', marginBottom: '24px' }}
        />

        {/* --- Model Image Area --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full aspect-[4/5] mb-8 group px-[30px]"
        >
          {/* Image Container */}
          <div
            className="relative h-full w-full rounded-[2rem] overflow-hidden"
            style={{
              boxShadow: '0 20px 50px -10px rgba(180, 150, 80, 0.3)',
              border: '3px solid rgba(212, 184, 106, 0.6)'
            }}
          >
            {/* Image */}
            <img
              src={modelImage}
              alt="Balance Lab Model"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="relative w-full h-full object-cover"
              style={{ objectPosition: '50% center' }}
            />
          </div>
        </motion.div>

        {/* --- Typography --- */}
        <div className="flex flex-col items-center text-center relative z-20 w-full px-6" style={{ marginTop: '-6.8rem' }}>

          {/* Main Title Image */}
          <motion.img
            src={titleImage}
            alt="FIND YOUR BALANCE"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-auto"
            style={{
              width: '340px',
              filter: 'drop-shadow(0 0 1px #fff) drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px rgba(255,255,255,0.8))'
            }}
          />

          {/* Subtitle Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 flex flex-col items-center gap-2 bg-white/80 backdrop-blur-xl px-1 py-4 rounded-3xl max-w-full w-full mx-1"
            style={{ border: '1px solid rgba(212, 184, 106, 0.4)', boxShadow: '0 8px 30px rgba(180, 150, 80, 0.1)' }}
          >
            <h2
              className="font-bold break-keep text-center leading-none tracking-tight text-3xl"
              style={{ color: '#5C4A1F' }}
            >
              투명브이리프팅
            </h2>
            <div
              className="w-12 h-[2px] my-2"
              style={{ background: 'linear-gradient(90deg, #C9A962, #E8D5A3, #B8943D)' }}
            />
            <p
              className="text-3xl leading-relaxed break-keep text-center"
              style={{ fontFamily: "'Nanum Pen Script', cursive", color: '#6B5A2F' }}
            >
              당신이 꿈꾸던 맑은 라인, <br />
              <strong style={{ color: '#4A3D1F' }}>밸런스랩</strong>에서 시작됩니다.
            </p>
          </motion.div>


        </div>
      </div>

    </div>
  );
};
