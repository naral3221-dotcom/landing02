import { motion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

// 이미지 import
import reviewImageB from "figma:asset/28d214b90c1ef405064c78b5046bf97fee6ab1e8.png";
import reviewImageG from "figma:asset/fec2a2f1caf1c54bc3539ab2b352a0a98577ae2c.png";

// 분리한 팝업 컴포넌트 불러오기
import { PopupRappol } from "./popups/PopupRappol";
import { PopupPCL } from "./popups/PopupPCL";
import { PopupAbsorption } from "./popups/PopupAbsorption";

/* ============================================================================
   HOOKING INFO SECTION
   - 성형어플 리뷰 소개 + 체크포인트 그리드
   - 외부 UI 컴포넌트 의존성 없음 (독립적) - Dialog 제거, 자체 모달 사용
   - 모바일 전용 (430px)
   ============================================================================ */

export const HookingInfo = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openModal, setOpenModal] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = (scrollY / windowHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모달 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (openModal !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openModal]);

  /* ========== Data ========== */
  const checkItems = [
    {
      title: "RAPPO.L 실 사용",
      desc: "실에서부터 시작되는 근본적인 차이점",
      gradient: "linear-gradient(135deg, #8B7355 0%, #C9A962 100%)",
    },
    {
      title: "PCL 실리프팅",
      desc: "프리미엄 PCL 소재 사용",
      gradient: "linear-gradient(135deg, #A08050 0%, #D4B86A 100%)",
    },
    {
      title: "체내에 100% 흡수",
      desc: "100% 콜라겐으로 자연분해 및 흡수",
      gradient: "linear-gradient(135deg, #6B5A2F 0%, #B4966A 100%)",
    },
  ];

  const badges = [
    "누적 리뷰 1,500건 이상",
    "실사용자 만족도 99%",
    "양대 성형 앱 평점 검증 완료"
  ];

  return (
    <>
      {/* ================================================================
          SECTION 1: Intro & Hook
          ================================================================ */}
      <section className="pt-16 pb-8 relative overflow-hidden rounded-t-[3rem] rounded-b-[3rem] shadow-2xl z-20 -mt-16" style={{ backgroundColor: '#FAF8F3' }}>

        {/* ========== Background Effects ========== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[300px] h-[300px] rounded-full blur-[80px] transition-all duration-700 ease-out mix-blend-multiply"
            style={{
              left: '50%',
              top: `${scrollProgress}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(212, 184, 106, 0.15)',
            }}
          />
          <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-white/80 rounded-full blur-[60px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[250px] h-[250px] rounded-full blur-[60px]" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }} />
        </div>

        {/* ========== Content ========== */}
        <div className="px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 px-2 flex flex-col items-center"
          >
            {/* --- Badge --- */}
            <span className="font-bold tracking-widest uppercase block leading-tight" style={{ fontSize: '18px', marginBottom: '32px', color: '#8B7355' }}>
              BALANCE LAB <br />
              <span className="opacity-70 font-medium">Signature Lifting</span>
            </span>

            {/* --- Main Title --- */}
            <h2 className="text-2xl font-black text-slate-900 leading-tight mb-8 break-words">
              2025년 성형어플 <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-1 -skew-x-12 rounded-lg" style={{ backgroundColor: 'rgba(212, 184, 106, 0.2)' }} />
                <span className="relative font-black px-1" style={{ color: '#8B7355' }}>[실리프팅 부문] 압도적 1위</span>
              </span>
            </h2>

            {/* --- Review Images --- */}
            <div className="flex justify-center items-start gap-3 mb-8 w-full max-w-2xl">
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

            {/* --- Badge List --- */}
            <div className="flex flex-col gap-3 mb-8 w-full px-4">
              {badges.map((text, i) => (
                <div key={i} className="flex-1 flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-shadow" style={{ border: '1px solid rgba(212, 184, 106, 0.3)' }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#C9A962', boxShadow: '0 2px 4px rgba(201, 169, 98, 0.3)' }}>
                    <Check size={12} className="text-white stroke-[3]" />
                  </div>
                  <span className="text-slate-700 font-bold text-sm whitespace-nowrap">{text}</span>
                </div>
              ))}
            </div>

            {/* --- Sub Title --- */}
            <div className="relative mb-4">
              <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                왜 다들 <br />
                <span className="font-black text-3xl" style={{ background: 'linear-gradient(90deg, #8B7355, #C9A962)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
                  투명브이리프팅
                </span>
                에<br />
                열광할까요?
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2: CHECK POINTS & GRID
          ================================================================ */}
      <section className="py-16 bg-white relative -mt-10 pt-20 z-10">
        <div className="px-4">
          <div className="flex flex-col space-y-4">

            {/* --- CHECK POINT HEADER --- */}
            <div className="relative w-full flex items-center justify-center py-2">
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <div className="relative bg-white px-6 py-2 flex items-center gap-3 shadow-[0_0_20px_10px_white]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_10s_linear_infinite]" style={{ color: '#C9A962' }}>
                  <path d="M12 2L14.4 9.6H22L16 14.4L18.4 22L12 17.6L5.6 22L8 14.4L2 9.6H9.6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-serif italic text-2xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                  CHECK POINT
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_10s_linear_infinite_reverse]" style={{ color: '#C9A962' }}>
                  <path d="M12 2L14.4 9.6H22L16 14.4L18.4 22L12 17.6L5.6 22L8 14.4L2 9.6H9.6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* --- GRID --- */}
            <div className="grid grid-cols-1 gap-3 px-2">
              {checkItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="h-full"
                >
                  <div
                    onClick={() => setOpenModal(idx)}
                    className="h-full group relative bg-white rounded-2xl border border-slate-100 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(201,169,98,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.98]"
                  >
                    {/* Card Content */}
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-start gap-1 pr-4">
                          <h3 className="text-lg font-bold text-slate-900 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-slate-500 text-xs font-medium break-keep text-left">
                            {item.desc}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0" style={{ background: item.gradient }}>
                          <ArrowRight className="text-white" size={18} />
                        </div>
                      </div>
                      <div className="w-full pt-3 border-t border-slate-50 flex items-center justify-center">
                        <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#8B7355' }}>
                          자세히 보기 <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MODAL (자체 구현 - Dialog 대체)
          ================================================================ */}
      {openModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenModal(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-[95vw] max-w-md max-h-[85vh] rounded-xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X size={18} className="text-slate-600" />
            </button>

            {/* Scrollable Content */}
            <div className="h-full max-h-[85vh] overflow-y-auto p-6">
              {/* Header */}
              <div className="text-center pt-4 mb-4">
                <span className="text-xs font-black tracking-widest uppercase block mb-1" style={{ color: '#C9A962' }}>
                  CHECK POINT {openModal + 1}
                </span>
                <span className="text-lg font-black text-slate-900 leading-tight break-words">
                  {checkItems[openModal].title}
                </span>
              </div>

              {/* Popup Content */}
              {openModal === 0 && <PopupRappol />}
              {openModal === 1 && <PopupPCL />}
              {openModal === 2 && <PopupAbsorption />}

              {/* CTA Button */}
              <div className="pt-2 px-2 pb-4">
                <button
                  onClick={() => setOpenModal(null)}
                  className="w-full text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-sm break-words"
                  style={{ background: 'linear-gradient(135deg, #8B7355 0%, #C9A962 100%)', boxShadow: '0 10px 20px -5px rgba(139, 115, 85, 0.3)' }}
                >
                  나에게 맞는 리프팅 상담받기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
