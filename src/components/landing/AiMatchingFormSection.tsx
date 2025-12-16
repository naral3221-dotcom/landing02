import { forwardRef } from 'react';
// import { ConsultationForm } from './ConsultationForm'; // 기존 폼 삭제
import { AiMatchingSystem } from '../matching'; // ✨ 새로 만든 매칭 시스템 불러오기

export const AiMatchingFormSection = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="py-16 md:py-24 relative overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />

            {/* 배경 데코레이션 (파란색 블러) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-400/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-8 mx-auto relative z-10 flex flex-col md:flex-row items-start justify-center gap-8 md:gap-16">

                {/* 좌측 텍스트 영역 */}
                <div className="w-full md:w-1/3 text-center md:text-left space-y-4 md:space-y-6 md:sticky md:top-32 pt-4">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight break-words text-slate-900">
                        정확한 CASE 매칭을 위해 <br />
                        <span className="text-blue-600">정보를 입력해주세요</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg break-keep leading-relaxed">
                        단순 상담이 아닙니다.<br />
                        <strong>빅데이터 기반 AI 시스템</strong>이<br className="md:hidden" />
                        고객님과 가장 유사한<br className="hidden md:block" />
                        <strong>성공 사례와 솔루션</strong>을 찾아드립니다.
                    </p>

                    {/* 신뢰도 문구 추가 */}
                    <div className="hidden md:block pt-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            현재 실시간 분석 시스템 가동 중
                        </div>
                    </div>
                </div>

                {/* 우측 폼 영역 (여기를 AI 매칭 시스템으로 교체!) */}
                {/* 기존 max-w-md에서 max-w-2xl로 넓혀서 결과 화면이 시원하게 보이게 수정함 */}
                <div className="w-full md:w-2/3 max-w-2xl">
                    <AiMatchingSystem />
                </div>
            </div>
        </section >
    );
});

AiMatchingFormSection.displayName = 'AiMatchingFormSection';