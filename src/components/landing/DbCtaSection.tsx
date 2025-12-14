import { motion } from 'motion/react';
import { Sparkles, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DbCtaProps {
  onScrollToForm: () => void;
}

export const DbCtaSection = ({ onScrollToForm }: DbCtaProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 relative overflow-hidden">
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
          className="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2 rounded-full font-bold mb-6 border border-white/30 backdrop-blur-md break-words text-sm md:text-base shadow-sm"
        >
          <Sparkles size={18} className="shrink-0 text-yellow-300" />
          <span className="break-words drop-shadow-sm">
            AI 케이스 매칭 혜택, 이번 달 한정 제공
          </span>
        </motion.div>

        {/* Main Copy */}
        <h2 className="text-2xl md:text-5xl font-black text-white mb-6 leading-tight break-words px-4 drop-shadow-sm">
          나와 비슷한 얼굴형,<br />
          같은 고민을 가진 사람들은<br />
          어떤 리프팅을 선택했을까요?
        </h2>

        {/* Sub Copy */}
        <p className="text-blue-50 mb-8 text-base md:text-lg max-w-xl mx-auto break-keep px-4 font-medium">
          AI 케이스 매칭 시스템으로<br />
          밸런스랩에서 실제 리프팅을 받은<br />
          유사 고민 환자들의 결과와 후기를 분석합니다
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Button
            onClick={onScrollToForm}
            className="bg-white text-blue-600 hover:bg-blue-50 text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-full font-bold shadow-lg shadow-blue-900/20 transition-transform hover:scale-105 break-words border-2 border-transparent hover:border-blue-100"
          >
            <Scan className="mr-2 h-5 w-5 shrink-0" />
            내 케이스 AI 매칭하기
          </Button>
        </div>
      </div>
    </section>
  );
};
