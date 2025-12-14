import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import modelImage from 'figma:asset/8f1f25bf38e8ec19fab26a6e091fddc0cbb157c8.png';
import waterBg from 'figma:asset/7ede7125d922d8e41cba0668261013254ba5502f.png';

interface HeroProps {
  onScrollToForm: () => void;
}

export const Hero = ({ onScrollToForm }: HeroProps) => {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-white flex flex-col items-center pt-16 pb-12 md:pt-24 md:pb-12 justify-center md:justify-start">

      {/* Background Ambience & Water Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Water Ripple Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Primary Water Texture */}
          <img
            src={waterBg}
            alt="Water Ripple Background"
            className="absolute inset-0 w-full h-full object-cover opacity-50 scale-110 animate-[pulse_8s_ease-in-out_infinite]"
            style={{ filter: 'contrast(1.1) brightness(1.1)' }}
          />

          {/* Flowing overlay animation */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white/40 to-white" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[size:250%_250%] animate-[shimmer_15s_linear_infinite] opacity-50" />
        </div>

        {/* Subtle Grid/Mesh for "Medical/Scientific" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 mix-blend-multiply" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col items-center h-full max-w-lg md:max-w-7xl">

        {/* 1. Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-6 md:mb-12 relative px-2"
        >
          <span className="text-blue-500 font-semibold tracking-[0.2em] text-[10px] md:text-sm uppercase bg-white/60 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-blue-100 shadow-sm break-words">
            Balance Lab Plastic Surgery
          </span>
        </motion.div>

        {/* 2. Model Image Area - Clean & Transparent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-[85%] aspect-[4/5] md:w-full md:aspect-[16/9] mb-8 md:mb-0 group max-w-md md:max-w-full"
        >
          {/* Glass/Water Glow Behind Image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-[2rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

          {/* Main Image Container */}
          <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-[0_15px_40px_-10px_rgba(14,165,233,0.2)] border border-white/60 bg-white/20 backdrop-blur-sm">

            {/* [수정 완료] Water Ripple Border Effect */}
            <svg
              className="absolute inset-0 w-full h-full z-20 pointer-events-none p-[2px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="30"
                ry="30"
                fill="none"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="2"
              />
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="30"
                ry="30"
                fill="none"
                stroke="rgba(186, 230, 253, 0.9)"
                strokeWidth="2"
                pathLength="100"
                strokeDasharray="30 70"
                strokeDashoffset="0"
                className="animate-[dashRotate_4s_linear_infinite]"
                style={{ filter: 'drop-shadow(0 0 4px rgba(186,230,253,0.8))' }}
              />
            </svg>

            {/* Image */}
            <img
              src={modelImage}
              alt="Balance Lab Model"
              className="relative w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000"
            />

            {/* Inner Overlay for soft blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-60" />

            {/* Highlight reflection */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/30 to-transparent skew-x-12 opacity-40 pointer-events-none" />
          </div>

          {/* Floating Decor Elements (Glass Bubbles) - Smaller on mobile */}
          <div className="absolute -top-3 -right-3 w-12 h-12 md:w-16 md:h-16 bg-blue-50/40 rounded-full blur-md border border-white/60 animate-pulse shadow-sm" />
          <div className="absolute -bottom-6 -left-6 w-16 h-16 md:w-24 md:h-24 bg-cyan-50/40 rounded-full blur-xl border border-white/40 shadow-sm" />
        </motion.div>

        {/* 3. Typography & Info */}
        <div className="flex flex-col items-center text-center -mt-16 md:-mt-16 relative z-20 w-full px-2">

          {/* Main Title - Clean & Modern */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[2.5rem] md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter italic drop-shadow-sm break-words max-w-full"
          >
            FIND YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 relative">
              BALANCE
            </span>
          </motion.h1>

          {/* Subtitle Group - Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            // [수정 1] 모바일 패딩 축소 (p-4 -> px-1 py-4) : 글자 들어갈 공간 확보
            className="mt-6 md:mt-8 flex flex-col items-center gap-2 md:gap-5 bg-white/60 backdrop-blur-xl px-1 py-4 md:p-10 rounded-3xl border border-white shadow-[0_8px_30px_rgb(14,165,233,0.06)] max-w-full w-full mx-1"
          >
            {/* [수정 2] style 속성으로 강제 크기 지정 (13vw) */}
            <h2
              className="font-bold text-slate-800 break-keep text-center leading-none tracking-tight"
              style={{ fontSize: '7vw' }}
            >
              투명브이리프팅
            </h2>

            <div className="w-12 md:w-16 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-300 my-2" />

            <p className="text-3xl md:text-5xl leading-relaxed break-keep text-center text-slate-600" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
              당신이 꿈꾸던 맑은 라인, <br className="md:hidden" />
              <strong className="text-slate-900">밸런스랩</strong>에서 시작됩니다.
            </p>
          </motion.div>

          {/* CTA Button - Hidden on Mobile (Using Sticky Bar instead) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 hidden md:block"
          >
            <Button
              onClick={onScrollToForm}
              className="group relative px-10 py-6 bg-slate-900 text-white hover:bg-slate-800 text-lg font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden border border-slate-700/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                무료 상담 신청하기
                <ChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform text-cyan-400" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};