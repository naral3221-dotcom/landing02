import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

export interface Step4Data {
    hasContouringExp: boolean | null; // true: 경험있음, false: 없음
    priority: string; // 우선순위 선택값
}

interface Props {
    onNext: (data: Step4Data) => void;
    defaultValues?: Partial<Step4Data>;
}

const PRIORITIES = [
    '리프팅 효과와 유지기간',
    '시술 가격',
    '통증과 부작용 여부',
    '회복 기간 (붓기/멍 등)',
    '의료진의 경험과 실력',
];

export const Step4Question: React.FC<Props> = ({ onNext, defaultValues }) => {
    const [hasContouringExp, setHasContouringExp] = useState<boolean | null>(defaultValues?.hasContouringExp ?? null);
    const [priority, setPriority] = useState<string>(defaultValues?.priority || '');

    const isValid = hasContouringExp !== null && priority !== '';

    const handleSubmit = () => {
        if (isValid) {
            onNext({ hasContouringExp, priority });
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto animate-fadeIn py-4">
            {/* 헤더 개선: 뱃지 추가 */}
            <div className="text-center mb-12 space-y-4">
                {/* 신뢰 뱃지 */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1" style={{ backgroundColor: 'rgba(212, 184, 106, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)', color: '#8B7355' }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#C9A962' }} />
                        실시간 AI 분석
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(212, 184, 106, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)', color: '#8B7355' }}>
                        STEP 4 OF 5
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    마지막으로 <br className="md:hidden" />
                    <span style={{ background: 'linear-gradient(90deg, #8B7355, #C9A962)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>두 가지만 더 확인해주세요</span>
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                    과거 시술 이력을 알면 더 정확한 예측이 가능합니다.
                </p>
            </div>

            <div>
                {/* Q1. 윤곽수술 경험 여부 */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: 'rgba(212, 184, 106, 0.2)', color: '#8B7355' }}>Q1</span>
                        <label className="text-lg font-bold text-slate-800">과거 윤곽수술을 하셨나요?</label>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setHasContouringExp(true)}
                            className={`
                                flex-1 py-4 rounded-xl font-bold border-2 transition-all duration-200
                                ${hasContouringExp === true
                                    ? 'shadow-sm'
                                    : 'border-slate-100 bg-white text-slate-400 hover:bg-slate-50'
                                }
                            `}
                            style={hasContouringExp === true ? { borderColor: '#C9A962', backgroundColor: 'rgba(212, 184, 106, 0.1)', color: '#8B7355' } : {}}
                        >
                            네, 했어요
                        </button>
                        <button
                            onClick={() => setHasContouringExp(false)}
                            className={`
                                flex-1 py-4 rounded-xl font-bold border-2 transition-all duration-200
                                ${hasContouringExp === false
                                    ? 'shadow-sm'
                                    : 'border-slate-100 bg-white text-slate-400 hover:bg-slate-50'
                                }
                            `}
                            style={hasContouringExp === false ? { borderColor: '#C9A962', backgroundColor: 'rgba(212, 184, 106, 0.1)', color: '#8B7355' } : {}}
                        >
                            아니요
                        </button>
                    </div>

                    {/* 안내 메시지 */}
                    {hasContouringExp === true && (
                        <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-xl border border-orange-100 animate-fadeIn mt-4">
                            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-orange-800 leading-snug break-keep">
                                윤곽수술 후 처짐은 일반적인 노화와 피부 구조가 다릅니다. <br />
                                <strong>윤곽 후 관리 케이스</strong>를 우선적으로 찾아드릴게요.
                            </span>
                        </div>
                    )}
                </div>

                {/* 구분선 + 여백 */}
                <div className="py-1">
                    <div className="w-full h-px bg-slate-200" />
                </div>

                {/* Q2. 우선순위 선택 (UI 수정됨) */}
                <div className="mt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: 'rgba(212, 184, 106, 0.2)', color: '#8B7355' }}>Q2</span>
                        <label className="text-lg font-bold text-slate-800">가장 중요하게 생각하는 점은?</label>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {PRIORITIES.map((item) => (
                            <button
                                key={item}
                                onClick={() => setPriority(item)}
                                className={`
                                    w-full text-left px-5 py-4 rounded-2xl border-2 transition-all flex items-center gap-3 group
                                    ${priority === item
                                        ? 'font-bold shadow-md'
                                        : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
                                    }
                                `}
                                style={priority === item ? { borderColor: '#C9A962', backgroundColor: 'rgba(212, 184, 106, 0.1)', color: '#5C4A1F' } : {}}
                            >
                                <div className={`
                                    shrink-0 w-5 h-5 rounded-full flex items-center justify-center border transition-all
                                    ${priority === item
                                        ? 'text-white'
                                        : 'bg-slate-100 border-slate-200 text-transparent group-hover:border-slate-300'
                                    }
                                `}
                                    style={priority === item ? { backgroundColor: '#C9A962', borderColor: '#C9A962' } : {}}
                                >
                                    <Check className="w-3 h-3" strokeWidth={3} />
                                </div>
                                <span className="break-keep leading-snug flex-1">{item}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 다음 단계 버튼 */}
            <div className="pt-12 flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={`
                        w-full py-4 rounded-full font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group
                        ${isValid
                            ? 'text-white hover:shadow-2xl hover:scale-105 transform'
                            : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
                        }
                    `}
                    style={isValid ? { background: 'linear-gradient(135deg, #8B7355 0%, #C9A962 100%)', boxShadow: '0 10px 30px -5px rgba(139, 115, 85, 0.4)' } : {}}
                >
                    {isValid && (
                        <div className="absolute inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))' }} />
                    )}
                    <span className="relative z-10">내 맞춤 결과 분석하기</span>
                </button>
            </div>
        </div>
    );
};