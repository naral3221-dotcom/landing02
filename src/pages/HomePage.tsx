import { useRef, useState, useEffect } from 'react';
import { Hero } from '../components/landing/Hero';
import { HookingInfo } from '../components/landing/HookingInfo';
import { BeforeAfterGrid } from '../components/landing/BeforeAfterGrid';
import { DbCtaSection } from '../components/landing/DbCtaSection';
import { AiMatchingFormSection } from '../components/landing/AiMatchingFormSection';
import { Scan, Phone, MapPin } from 'lucide-react';
import { TopHeader } from '../components/layout/TopHeader';

/* ============================================================================
   HOME PAGE
   - 메인 랜딩 페이지
   - 외부 UI 컴포넌트 의존성 없음 (독립적)
   - 모바일 전용 (430px)
   ============================================================================ */

export default function HomePage() {

  /* ========== Refs & State ========== */
  const formRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  /* ========== Handlers ========== */
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ========== Effects ========== */
  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => { if (formRef.current) observer.unobserve(formRef.current); };
  }, []);

  const shouldShowSticky = showSticky && !isFormVisible;

  /* ========== Render ========== */
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 pb-20">

      {/* ================================================================
          HEADER
          ================================================================ */}
      <TopHeader />

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}
      <main className="pt-16">

        {/* --- Hero Section --- */}
        <Hero />

        {/* --- Hooking Info Section --- */}
        <HookingInfo />

        {/* --- Before/After Grid Section --- */}
        <BeforeAfterGrid />

        {/* --- DB CTA Section --- */}
        <DbCtaSection onScrollToForm={scrollToForm} />

        {/* --- AI Matching Form Section --- */}
        <AiMatchingFormSection ref={formRef} />

      </main>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      <footer className="py-12" style={{ backgroundColor: '#FDFCF7', borderTop: '1px solid rgba(212, 184, 106, 0.2)' }}>
        <div className="px-4 text-center">

          {/* --- Contact Info --- */}
          <div className="flex flex-col justify-center items-center gap-4 mb-8">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="p-3 bg-white rounded-full shrink-0 shadow-sm" style={{ border: '1px solid rgba(212, 184, 106, 0.3)' }}>
                <Phone size={20} style={{ color: '#C9A962' }} />
              </div>
              <div className="text-left">
                <div className="text-xs text-slate-400 font-medium">전화상담</div>
                <div className="font-bold text-base text-slate-800">02-1234-5678</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <div className="p-3 bg-white rounded-full shrink-0 shadow-sm" style={{ border: '1px solid rgba(212, 184, 106, 0.3)' }}>
                <MapPin size={20} style={{ color: '#C9A962' }} />
              </div>
              <div className="text-left">
                <div className="text-xs text-slate-400 font-medium">위치</div>
                <div className="font-bold text-base text-slate-800">서울 강남구 테헤란로 123</div>
              </div>
            </div>
          </div>

          {/* --- 사업자 정보 --- */}
          <div className="text-slate-500 text-xs leading-6 mb-6 break-keep opacity-80">
            <span className="font-bold text-slate-600">밸런스랩 의원</span>
            <span className="mx-2 text-slate-300">|</span>
            사업자등록번호: 123-45-67890
            <span className="mx-2 text-slate-300">|</span>
            대표자: 홍길동
          </div>

          {/* --- 카피라이트 --- */}
          <div className="text-slate-400 text-[10px]">
            © 2025 BALANCE LAB Plastic Surgery. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ================================================================
          STICKY CTA BAR
          ================================================================ */}
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-50 p-4 bg-white/80 backdrop-blur-md transition-transform duration-300 ${shouldShowSticky ? 'translate-y-0' : 'translate-y-[120%]'}`}
        style={{ width: '100%', maxWidth: '800px', borderTop: '1px solid rgba(212, 184, 106, 0.3)' }}
      >
        <button
          onClick={scrollToForm}
          className="w-full flex items-center justify-center text-white text-lg font-bold py-6 rounded-xl shadow-lg transition-colors hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #8B7355 0%, #C9A962 100%)', boxShadow: '0 10px 30px -5px rgba(139, 115, 85, 0.3)' }}
        >
          <Scan className="mr-2 h-5 w-5" />
          내 케이스 AI 매칭하기
        </button>
      </div>
    </div>
  );
}
