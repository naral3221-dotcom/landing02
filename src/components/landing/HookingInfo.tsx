import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 이미지 import
import reviewImageB from "figma:asset/28d214b90c1ef405064c78b5046bf97fee6ab1e8.png";
import reviewImageG from "figma:asset/fec2a2f1caf1c54bc3539ab2b352a0a98577ae2c.png";

// [중요] 분리한 팝업 컴포넌트 불러오기
import { PopupRappol } from "./popups/PopupRappol";
import { PopupPCL } from "./popups/PopupPCL";
import { PopupAbsorption } from "./popups/PopupAbsorption";

export const HookingInfo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      }
    };

    const handleScroll = () => {
      if (isMobile) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const progress = (scrollY / windowHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <>
      {/* SECTION 1: Intro & Hook */}
      <section className="pt-16 pb-8 md:pt-24 md:pb-12 bg-slate-50 relative overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] shadow-xl z-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {!isMobile && (
            <>
              <div
                className="absolute w-[800px] h-[800px] bg-blue-200/30 rounded-full blur-[100px] transition-all duration-300 ease-out mix-blend-multiply"
                style={{
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                className="absolute w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-[80px] transition-all duration-500 ease-out mix-blend-multiply"
                style={{
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </>
          )}

          {isMobile && (
            <>
              <div
                className="absolute w-[300px] h-[300px] bg-blue-100/40 rounded-full blur-[80px] transition-all duration-700 ease-out mix-blend-multiply"
                style={{
                  left: '50%',
                  top: `${scrollProgress}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </>
          )}

          <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white/80 rounded-full blur-[60px] md:blur-[100px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-sky-100/50 rounded-full blur-[60px] md:blur-[100px]" />
        </div>

        <div className="container px-4 md:px-8 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 px-2 flex flex-col items-center"
          >
            <span className="text-blue-500 font-bold tracking-widest md:text-sm uppercase mb-4 block leading-tight text-[14px]">
              BALANCE LAB <br />
              <span className="opacity-70 font-medium">Signature Lifting</span>
            </span>

            <h2 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight mb-8 md:mb-12 break-words">
              2025년 성형어플 <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-1 bg-blue-100/50 -skew-x-12 rounded-lg" />
                <span className="relative text-blue-600 font-black px-1">[실리프팅 부문] 압도적 1위</span>
              </span>
            </h2>

            <div className="flex justify-center items-start gap-3 md:gap-6 mb-8 md:mb-10 w-full max-w-2xl">
              <div className="relative w-1/2 rounded-2xl overflow-hidden shadow-xl border border-slate-100 group">
                <img src={reviewImageB} alt="B App Review" className="w-full h-auto block" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-[shimmer_3s_infinite]" />
              </div>

              <div className="relative w-1/2 rounded-2xl overflow-hidden shadow-xl border border-slate-100 group">
                <img src={reviewImageG} alt="G App Review" className="w-full h-auto block" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-[shimmer_3s_infinite_1.5s]" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8 md:mb-12 w-full max-w-4xl px-4 md:px-0">
              {[
                "누적 리뷰 1,500건 이상",
                "실사용자 만족도 99%",
                "양대 성형 앱 평점 검증 완료"
              ].map((text, i) => (
                <div key={i} className="flex-1 flex items-center justify-center md:justify-center gap-2 bg-white/80 backdrop-blur-sm py-3 px-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
                    <Check size={12} className="text-white stroke-[3]" />
                  </div>
                  <span className="text-slate-700 font-bold text-sm md:text-base whitespace-nowrap">{text}</span>
                </div>
              ))}
            </div>

            <div className="relative mb-4 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                왜 다들 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-black text-3xl md:text-4xl">
                  투명브이리프팅
                </span>
                에<br />
                열광할까요?
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CHECK POINTS & GRID */}
      <section className="py-16 md:py-24 bg-white relative -mt-10 md:-mt-16 pt-20 md:pt-32 z-10">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col space-y-4 md:space-y-6">
            {/* CHECK POINT HEADER */}
            <div className="relative w-full flex items-center justify-center py-2">
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <div className="relative bg-white px-6 py-2 flex items-center gap-3 shadow-[0_0_20px_10px_white]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 animate-[spin_10s_linear_infinite]">
                  <path d="M12 2L14.4 9.6H22L16 14.4L18.4 22L12 17.6L5.6 22L8 14.4L2 9.6H9.6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-serif italic text-2xl md:text-3xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                  CHECK POINT
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 animate-[spin_10s_linear_infinite_reverse]">
                  <path d="M12 2L14.4 9.6H22L16 14.4L18.4 22L12 17.6L5.6 22L8 14.4L2 9.6H9.6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 px-2 md:px-4">
              {[
                {
                  title: "RAPPO.L 실 사용",
                  desc: "실에서부터 시작되는 근본적인 차이점",
                  color: "from-blue-500 to-sky-500",
                  iconColor: "text-white",
                },
                {
                  title: "PCL 실리프팅",
                  desc: "프리미엄 PCL 소재 사용",
                  color: "from-sky-400 to-cyan-400",
                  iconColor: "text-white",
                },
                {
                  title: "체내에 100% 흡수",
                  desc: "100% 콜라겐으로 자연분해 및 흡수",
                  color: "from-indigo-500 to-blue-600",
                  iconColor: "text-white",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="h-full"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.98]">

                        {/* Mobile Layout: Compact Row */}
                        <div className="md:hidden p-5 flex flex-col gap-3">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col items-start gap-1 pr-4">
                              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                {item.title}
                              </h3>
                              <p className="text-slate-500 text-xs font-medium break-keep text-left">
                                {item.desc}
                              </p>
                            </div>
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md shrink-0`}>
                              <ArrowRight className="text-white" size={18} />
                            </div>
                          </div>
                          <div className="w-full pt-3 border-t border-slate-50 flex items-center justify-center">
                            <span className="text-blue-500 text-xs font-bold flex items-center gap-1">
                              자세히 보기 <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>

                        {/* Desktop Layout: Vertical Card */}
                        <div className="hidden md:flex flex-col items-center text-center p-8 h-full">
                          <div
                            className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <ArrowRight
                              className={item.iconColor}
                              size={28}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-3">
                            {item.title}
                          </h3>
                          <p className="text-slate-500 text-base mb-6 flex-grow break-keep leading-relaxed">
                            {item.desc}
                          </p>
                          <div className="text-blue-500 text-sm font-bold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            자세히 보기 <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white border-slate-100 text-slate-900 w-[95vw] md:w-[90vw] max-w-2xl max-h-[85vh] overflow-hidden rounded-xl p-0 block">

                      {/* Inner Scroll Container - Close button stays outside this, so it remains fixed */}
                      <div className="h-full w-full max-h-[85vh] overflow-y-auto p-6 custom-scrollbar">
                        <DialogHeader>
                          <DialogTitle className="text-center md:pt-4 text-[24px]">
                            <span className="text-blue-500 text-xs md:text-sm font-black tracking-widest uppercase block mb-1 md:mb-2">
                              CHECK POINT {idx + 1}
                            </span>
                            <span className="text-lg md:text-3xl font-black text-slate-900 leading-tight break-words">
                              {item.title}
                            </span>
                          </DialogTitle>
                        </DialogHeader>

                        {/* [수정 완료] 이제 여기서 분리된 파일을 불러옵니다 */}
                        {idx === 0 && <PopupRappol />}
                        {idx === 1 && <PopupPCL />}
                        {idx === 2 && <PopupAbsorption />}

                        <div className="pt-2 md:pt-4 px-2 md:px-4 pb-4">
                          <button className="w-full bg-slate-900 text-white hover:bg-slate-800 py-3 md:py-4 rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all hover:scale-[1.02] text-sm md:text-base break-words">
                            나에게 맞는 리프팅 상담받기
                          </button>
                        </div>
                      </div>

                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};