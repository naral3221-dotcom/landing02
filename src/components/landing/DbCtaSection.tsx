import { motion } from 'motion/react';
import { Sparkles, Scan, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DbCtaProps {
  onScrollToForm: () => void;
}

export const DbCtaSection = ({ onScrollToForm }: DbCtaProps) => {
  const checkPoints = [
    "내 연령대 1:1 매칭",
    "유사 고민 부위 분석",
    "밸런스랩 실제 시술 데이터",
    "전후 결과 및 리얼 후기 매칭"
  ];

  return (
    <section className="pt-20 pb-0 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 relative overflow-hidden">
      {/* Water/Noise overlay effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 mix-blend-overlay"></div>

      {/* Fluid shapes in background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container px-6 md:px-8 mx-auto relative z-10 text-center">
        {/* AI Matching Badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-full font-bold mb-8 border border-white/30 backdrop-blur-md break-words text-lg md:text-xl shadow-sm"
        >
          <Sparkles size={24} className="shrink-0 text-yellow-300" />
          <span className="drop-shadow-sm">
            내 케이스 AI 매칭 시스템
          </span>
        </motion.div>

        {/* Main Copy */}
        <h2 className="text-2xl md:text-5xl font-black text-white mb-12 leading-tight break-keep drop-shadow-sm">
          얼굴형도 고민도<br />
          나와 똑같은 사람,<br />
          <span className="text-blue-50">어떤 시술로 효과를 봤을까요?</span>
        </h2>

        {/* Check Points (Box Grid Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {checkPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-colors text-left"
            >
              <CheckCircle2 className="shrink-0 w-6 h-6 text-white" />
              <span className="text-white font-bold text-base md:text-lg tracking-tight">
                {point}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Spacer Layer 1 */}
        <div className="h-8 md:h-10" aria-hidden="true" />

        {/* Sub Copy */}
        <p className="text-blue-50 mb-10 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium opacity-90">
          밸런스랩에서 시술받은 실제 환자 데이터를 바탕으로<br className="hidden md:block" />
          나와 가장 유사한 케이스의 결과와 후기를<br className="hidden md:block" />
          <strong className="text-white">AI가 정밀하게 분석하여 보여드립니다.</strong>
        </p>

        {/* Spacer Layer 2 */}
        <div className="h-8 md:h-10" aria-hidden="true" />

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Button
            onClick={onScrollToForm}
            className="bg-white text-blue-600 hover:bg-blue-50 text-xl md:text-2xl px-10 md:px-16 py-6 rounded-full font-bold shadow-xl shadow-blue-900/20 transition-transform hover:scale-105 break-words border-2 border-transparent hover:border-blue-100"
          >
            <Scan className="mr-2 h-7 w-7 shrink-0" />
            내 케이스 AI 매칭하기
          </Button>
        </div>

        {/* Spacer Layer 3 (Bottom) */}
        <div className="h-8 md:h-10" aria-hidden="true" />
      </div>
    </section>
  );
};