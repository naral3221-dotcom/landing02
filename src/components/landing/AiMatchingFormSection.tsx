import { forwardRef } from 'react';
import { motion } from 'motion/react';
// import { ConsultationForm } from './ConsultationForm'; // 기존 폼 삭제
import { AiMatchingSystem } from '../matching'; // ✨ 새로 만든 매칭 시스템 불러오기

export const AiMatchingFormSection = forwardRef<HTMLElement>((_, ref) => {
    return (
        <section ref={ref} className="py-16 md:py-24 relative overflow-hidden bg-slate-50">
            {/* 향상된 그라디언트 배경 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-slate-50" />

            {/* 메시 그리드 패턴 (의료/과학적 느낌) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

            {/* 다층 블러 데코레이션 */}
            <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-cyan-300/10 rounded-full blur-[80px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

            {/* 움직이는 입자 효과 (선택적 - 성능 이슈 시 제거 가능) */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
            <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-25 animate-ping" style={{ animationDuration: '5s', animationDelay: '1.5s' }} />

            <div className="container px-4 md:px-8 mx-auto relative z-10 flex flex-col md:flex-row items-start justify-center gap-8 md:gap-16">

                {/* 좌측 텍스트 영역 - 애니메이션 추가 */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/3 text-center md:text-left space-y-4 md:space-y-6 md:sticky md:top-32 pt-4"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold leading-tight break-words text-slate-900"
                    >
                        정확한 CASE 매칭을 위해 <br />
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">정보를 입력해주세요</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-slate-500 text-base md:text-lg break-keep leading-relaxed"
                    >
                        단순 상담이 아닙니다.<br />
                        <strong className="text-slate-700">빅데이터 기반 AI 시스템</strong>이<br className="md:hidden" />
                        고객님과 가장 유사한<br className="hidden md:block" />
                        <strong className="text-slate-700">성공 사례와 솔루션</strong>을 찾아드립니다.
                    </motion.p>

                    {/* 통계 카운터 추가 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="grid grid-cols-2 gap-4 pt-4"
                    >
                        <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm">
                            <div className="text-2xl font-bold text-blue-600">1,247+</div>
                            <div className="text-xs text-slate-500 mt-1">누적 매칭 성공</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm">
                            <div className="text-2xl font-bold text-cyan-600">98.2%</div>
                            <div className="text-xs text-slate-500 mt-1">만족도</div>
                        </div>
                    </motion.div>

                    {/* 신뢰도 문구 개선 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="block pt-2"
                    >
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            현재 실시간 분석 시스템 가동 중
                        </div>
                    </motion.div>
                </motion.div>

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