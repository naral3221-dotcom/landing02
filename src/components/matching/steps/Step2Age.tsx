import React, { useState } from 'react';

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
            <div className="text-center mb-10 space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    고객님의 <br className="md:hidden" />
                    <span className="text-blue-600">연령대를 선택해주세요</span>
                </h3>
                <p className="text-slate-500 text-sm">
                    연령별 맞춤형 후기를 찾아드립니다.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {['20', '30', '40', '50'].map((ageOption) => (
                    <button
                        key={ageOption}
                        onClick={() => setAge(ageOption)}
                        className={`
              py-8 rounded-2xl font-bold text-xl transition-all duration-200 border-2
              ${age === ageOption
                                ? 'bg-blue-500 text-white border-blue-500 shadow-md transform scale-[1.02]'
                                : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                            }
            `}
                    >
                        {ageOption}대
                    </button>
                ))}
            </div>

            <div className="pt-4">
                <button
                    onClick={handleNext}
                    disabled={!age}
                    className={`
            w-full py-4 rounded-full font-bold text-lg transition-all
            ${age
                            ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }
          `}
                >
                    다음 단계로 (2/5)
                </button>
            </div>
        </div>
    );
};