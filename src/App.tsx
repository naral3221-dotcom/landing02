import React, { useRef, useState, useEffect } from 'react';
import { Hero } from './components/landing/Hero';
import { HookingInfo } from './components/landing/HookingInfo';
import { BeforeAfterGrid } from './components/landing/BeforeAfterGrid';
import { DbCtaSection } from './components/landing/DbCtaSection';
import { ConsultationForm } from './components/landing/ConsultationForm';
import { ReviewAccordion } from './components/landing/ReviewAccordion';
import { Instagram, Facebook, Phone, MapPin, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from 'figma:asset/5986604ddbbbb494de4b65764b340209c23f1260.png';

// [추가됨] 상단 배너 컴포넌트 불러오기
import { TopHeader } from './components/layout/TopHeader';

export default function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button after scrolling past hero (approx 500px)
      setShowSticky(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 pb-20 md:pb-0">

      <TopHeader />

      {/* [수정] 헤더 높이에 맞춰 여백 증가: pt-14 -> pt-16, md:pt-16 -> md:pt-20 */}
      <main className="pt-16 md:pt-20">

        <Hero onScrollToForm={scrollToForm} />

        {/* 3. 후킹성 시술 설명 섹션 */}
        <HookingInfo />

        {/* 4. 전후사진 섹션 */}
        <BeforeAfterGrid />

        {/* 5. DB입력 후킹 섹션 */}
        <DbCtaSection onScrollToForm={scrollToForm} />

        {/* 6. DB입력 섹션 */}
        <section ref={formRef} className="py-16 md:py-24 relative overflow-hidden bg-slate-50">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-400/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

          <div className="container px-4 md:px-8 mx-auto relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight break-words text-slate-900">
                빠른 상담을 위해 <br />
                <span className="text-blue-500">정보를 입력해주세요</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-lg break-keep">
                전문 상담 실장이 확인 후 10분 이내에 <br className="hidden md:block" />
                연락드려 자세한 안내를 도와드립니다.
              </p>

              <div className="flex flex-col gap-3 pt-2 items-center md:items-start">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-white rounded-full shrink-0 shadow-sm border border-slate-100">
                    <Phone size={18} className="text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-slate-400">전화상담</div>
                    <div className="font-bold text-sm md:text-base break-words">02-1234-5678</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-white rounded-full shrink-0 shadow-sm border border-slate-100">
                    <MapPin size={18} className="text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-slate-400">위치</div>
                    <div className="font-bold text-sm md:text-base break-words">서울 강남구 테헤란로 123</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <ConsultationForm />
            </div>
          </div>
        </section>

        {/* 7. 후기 섹션 */}
        <ReviewAccordion />
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-8 md:py-12 border-t border-slate-200">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="w-20 md:w-24 mb-3 md:mb-0 opacity-80 grayscale-0 transition-all mx-auto md:mx-0">
                <img src={logoImage} alt="BALANCE LAB" className="w-full h-auto" />
              </div>
              <p className="text-slate-500 text-[10px] md:text-xs mt-2 break-words">
                사업자등록번호: 123-45-67890 | 대표자: 홍길동 <br />
                서울 강남구 테헤란로 123 밸런스랩 빌딩 3층
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 bg-white rounded-full hover:bg-blue-50 border border-slate-200 transition-colors text-slate-400 hover:text-blue-600 shrink-0 shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2.5 bg-white rounded-full hover:bg-blue-50 border border-slate-200 transition-colors text-slate-400 hover:text-blue-600 shrink-0 shadow-sm">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-200 text-center text-slate-400 text-[10px] md:text-xs break-words">
            © 2024 BALANCE LAB Plastic Surgery. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      <div className={`fixed bottom-0 left-0 w-full z-50 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 transition-transform duration-300 md:hidden ${showSticky ? 'translate-y-0' : 'translate-y-[120%]'}`}>
        <Button
          onClick={scrollToForm}
          className="w-full bg-slate-900 text-white hover:bg-slate-800 text-lg font-bold py-6 rounded-xl shadow-lg shadow-blue-900/10"
        >
          <Scan className="mr-2 h-5 w-5" />
          내 케이스 AI 매칭하기
        </Button>
      </div>
    </div>
  );
}