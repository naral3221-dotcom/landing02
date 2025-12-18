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
                    <div className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1" style={{ backgroundColor: 'rgba(212, 184, 106, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)', color: '#8B7355' }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#C9A962' }} />
                        실시간 AI 분석
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(212, 184, 106, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)', color: '#8B7355' }}>
                        STEP 2 OF 5
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    고객님의 <br className="md:hidden" />
                    <span style={{ background: 'linear-gradient(90deg, #8B7355, #C9A962)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>연령대를 선택해주세요</span>
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
                                ? 'text-white shadow-lg transform scale-[1.02]'
                                : 'bg-white/80 backdrop-blur-sm text-slate-500 border-slate-200/50 hover:bg-slate-50 hover:shadow-lg'
                            }
            `}
                        style={age === ageOption ? { background: 'linear-gradient(135deg, #8B7355 0%, #C9A962 100%)', borderColor: '#C9A962' } : {}}
                    >
                        {age === ageOption && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2), rgba(139, 115, 85, 0.2))' }} />
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
                            ? 'text-white shadow-lg hover:shadow-2xl hover:scale-105 transform'
                            : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
                        }
          `}
                    style={age ? { background: 'linear-gradient(135deg, #8B7355 0%, #C9A962 100%)', boxShadow: '0 10px 30px -5px rgba(139, 115, 85, 0.4)' } : {}}
                >
                    {age && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2), rgba(139, 115, 85, 0.2))' }} />
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