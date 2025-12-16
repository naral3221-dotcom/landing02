import React, { useRef, useState, useEffect } from 'react';
import { Hero } from './components/landing/Hero';
import { HookingInfo } from './components/landing/HookingInfo';
import { BeforeAfterGrid } from './components/landing/BeforeAfterGrid';
import { DbCtaSection } from './components/landing/DbCtaSection';
import { AiMatchingFormSection } from './components/landing/AiMatchingFormSection';
import { Scan, Phone, MapPin } from 'lucide-react'; // SNS 아이콘 제거됨
import { Button } from '@/components/ui/button';
import logoImage from 'figma:asset/5986604ddbbbb494de4b65764b340209c23f1260.png';
import { TopHeader } from './components/layout/TopHeader';

export default function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // 10% 정도 보이면 감지
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const shouldShowSticky = showSticky && !isFormVisible;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 pb-20 md:pb-0">

      <TopHeader />

      <main className="pt-16 md:pt-20">
        <Hero onScrollToForm={scrollToForm} />
        <HookingInfo />
        <BeforeAfterGrid />
        <DbCtaSection onScrollToForm={scrollToForm} />

        {/* 6. AI 매칭 폼 섹션 */}
        <AiMatchingFormSection ref={formRef} />
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="container px-4 mx-auto text-center">

          {/* Contact Info (전화/위치) - AiMatchingFormSection 스타일 적용 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="p-3 bg-white rounded-full shrink-0 shadow-sm border border-slate-100">
                <Phone size={20} className="text-blue-500" />
              </div>
              <div className="text-left">
                <div className="text-xs text-slate-400 font-medium">전화상담</div>
                <div className="font-bold text-base md:text-lg text-slate-800">02-1234-5678</div>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200 mx-2"></div>

            <div className="flex items-center gap-3 text-slate-600">
              <div className="p-3 bg-white rounded-full shrink-0 shadow-sm border border-slate-100">
                <MapPin size={20} className="text-blue-500" />
              </div>
              <div className="text-left">
                <div className="text-xs text-slate-400 font-medium">위치</div>
                <div className="font-bold text-base md:text-lg text-slate-800">서울 강남구 테헤란로 123</div>
              </div>
            </div>
          </div>

          {/* 사업자 정보 및 주소 */}
          <div className="text-slate-500 text-xs leading-6 mb-8 break-keep opacity-80">
            <span className="font-bold text-slate-600">밸런스랩 의원</span>
            <span className="mx-2 text-slate-300">|</span>
            사업자등록번호: 123-45-67890
            <span className="mx-2 text-slate-300">|</span>
            대표자: 홍길동
          </div>

          {/* 카피라이트 */}
          <div className="text-slate-400 text-[10px]">
            © 2025 BALANCE LAB Plastic Surgery. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      <div className={`fixed bottom-0 left-0 w-full z-50 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 transition-transform duration-300 md:hidden ${shouldShowSticky ? 'translate-y-0' : 'translate-y-[120%]'}`}>
        <Button
          onClick={scrollToForm}
          className="w-full bg-slate-900 text-white hover:bg-slate-800 text-lg font-bold py-6 rounded-xl shadow-lg shadow-blue-900/10"
        >
          <Scan className="mr-2 h-5 w-5" />
          내 케이스 AI 매칭하기
        </Button>
      </div>
    </div >
  );
}