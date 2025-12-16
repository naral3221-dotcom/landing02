import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Props {
    onNext: (age: string) => void;
    defaultAge?: string;
}

export const Step2Age: React.FC<Props> = ({ onNext, defaultAge }) => {
    const [age, setAge] = useState(defaultAge || '');

    const handleNext = () => {
        if (age) onNext(age);
    };

    return (
        <div className="w-full max-w-xl mx-auto animate-fadeIn">
            {/* 헤더 개선: 뱃지 추가 */}
            <div className="text-center mb-10 space-y-4">
                {/* 신뢰 뱃지 */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-bold text-green-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        실시간 AI 분석
                    </div>
                    <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
                        STEP 2 OF 5
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    고객님의 <br className="md:hidden" />
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">연령대를 선택해주세요</span>
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                    연령별 맞춤형 후기를 찾아드립니다.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {['20', '30', '40', '50'].map((ageOption) => (
                    <button
                        key={ageOption}
                        onClick={() => setAge(ageOption)}
                        className={`
              py-8 rounded-2xl font-bold text-xl transition-all duration-200 border-2 relative overflow-hidden group
              ${age === ageOption
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-500 shadow-lg transform scale-[1.02]'
                                : 'bg-white/80 backdrop-blur-sm text-slate-500 border-slate-200/50 hover:border-blue-300 hover:bg-slate-50 hover:shadow-lg'
                            }
            `}
                    >
                        {age === ageOption && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <span className="relative z-10">{ageOption}대</span>
                    </button>
                ))}
            </div>

            <div className="pt-4">
                <button
                    onClick={handleNext}
                    disabled={!age}
                    className={`
            w-full py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group
            ${age
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform'
                            : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
                        }
          `}
                >
                    {age && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        다음 (고민 선택)
                        {age && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </span>
                </button>
            </div>
        </div>
    );
};