import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

export interface Step3Data {
    hasContouringExp: boolean | null; // true: 경험있음, false: 없음
    priority: string; // 우선순위 선택값
}

interface Props {
    onNext: (data: Step3Data) => void;
    defaultValues?: Partial<Step3Data>;
}

const PRIORITIES = [
    '리프팅 효과와 유지기간',
    '시술 가격',
    '통증과 부작용 여부',
    '회복 기간 (붓기/멍 등)',
    '의료진의 경험과 실력',
];

export const Step3Question: React.FC<Props> = ({ onNext, defaultValues }) => {
    const [hasContouringExp, setHasContouringExp] = useState<boolean | null>(defaultValues?.hasContouringExp ?? null);
    const [priority, setPriority] = useState<string>(defaultValues?.priority || '');

    const isValid = hasContouringExp !== null && priority !== '';

    const handleSubmit = () => {
        if (isValid) {
            onNext({ hasContouringExp, priority });
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto animate-fadeIn">
            <div className="text-center mb-10 space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    마지막으로 <br className="md:hidden" />
                    <span className="text-blue-600">두 가지만 더 확인해주세요</span>
                </h3>
                <p className="text-slate-500 text-sm">
                    과거 시술 이력을 알면 더 정확한 예측이 가능합니다.
                </p>
            </div>

            <div className="space-y-10">
                {/* Q1. 윤곽수술 경험 여부 */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">Q1</span>
                        <label className="text-lg font-bold text-slate-800">과거 윤곽수술을 하셨나요?</label>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setHasContouringExp(true)}
                            className={`
                                flex-1 py-4 rounded-xl font-bold border-2 transition-all duration-200
                                ${hasContouringExp === true
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                                    : 'border-slate-100 bg-white text-slate-400 hover:border-blue-200 hover:bg-slate-50'
                                }
                            `}
                        >
                            네, 했어요
                        </button>
                        <button
                            onClick={() => setHasContouringExp(false)}
                            className={`
                                flex-1 py-4 rounded-xl font-bold border-2 transition-all duration-200
                                ${hasContouringExp === false
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                                    : 'border-slate-100 bg-white text-slate-400 hover:border-blue-200 hover:bg-slate-50'
                                }
                            `}
                        >
                            아니요
                        </button>
                    </div>

                    {/* 안내 메시지 */}
                    {hasContouringExp === true && (
                        <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-xl border border-orange-100 animate-fadeIn">
                            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-orange-800 leading-snug break-keep">
                                윤곽수술 후 처짐은 일반적인 노화와 피부 구조가 다릅니다. <br />
                                <strong>윤곽 후 관리 케이스</strong>를 우선적으로 찾아드릴게요.
                            </span>
                        </div>
                    )}
                </div>

                <div className="w-full h-px bg-slate-100" />

                {/* Q2. 우선순위 선택 (UI 수정됨) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">Q2</span>
                        <label className="text-lg font-bold text-slate-800">가장 중요하게 생각하는 점은?</label>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {PRIORITIES.map((item) => (
                            <button
                                key={item}
                                onClick={() => setPriority(item)}
                                className={`
                                    w-full text-left px-6 py-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 group
                                    ${priority === item
                                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold shadow-md'
                                        : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200 hover:bg-slate-50'
                                    }
                                `}
                            >
                                <span className="break-keep leading-snug">{item}</span>
                                <div className={`
                                    flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all
                                    ${priority === item
                                        ? 'bg-blue-500 border-blue-500 text-white'
                                        : 'bg-slate-100 border-slate-200 text-transparent group-hover:border-blue-200'
                                    }
                                `}>
                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 다음 단계 버튼 */}
            <div className="pt-10 flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={`
                        w-full py-4 rounded-full font-bold text-lg transition-all shadow-lg
                        ${isValid
                            ? 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl transform hover:-translate-y-1'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }
                    `}
                >
                    내 맞춤 결과 분석하기
                </button>
            </div>
        </div>
    );
};