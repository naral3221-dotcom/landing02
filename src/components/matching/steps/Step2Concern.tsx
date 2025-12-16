import React from 'react';
import { Check } from 'lucide-react'; // lucide-react 아이콘 사용

// 선택 가능한 고민 부위 목록
const CONCERN_OPTIONS = [
    { id: 'nasolabial', label: '팔자주름', target: 'mid' },
    { id: 'marionette', label: '입가주름', target: 'lower' },
    { id: 'sagging', label: '볼처짐/긴중안부', target: 'mid' },
    { id: 'sunken', label: '볼꺼짐/땅콩형', target: 'mid' },
    { id: 'doublechin', label: '이중턱/턱선', target: 'lower' },
    { id: 'fullface', label: '얼굴전체', target: ['mid', 'lower'] },
];

interface Props {
    selectedTags: string[]; // 현재 선택된 태그들 (상위 컴포넌트에서 관리)
    onToggleTag: (tag: string) => void; // 선택/해제 함수
    onNext: () => void; // 다음 단계로 이동
}

export const Step2ConcernSelection: React.FC<Props> = ({ selectedTags, onToggleTag, onNext }) => {
    return (
        <div className="w-full max-w-3xl mx-auto animate-fadeIn">
            <div className="text-center mb-8 space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    가장 고민되는 부위를 <br className="md:hidden" />
                    <span className="text-blue-600">모두 선택해주세요</span>
                </h3>
                <p className="text-slate-500 text-sm md:text-base">
                    중복 선택이 가능합니다.
                </p>
            </div>

            {/* 버튼 그리드 영역 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                {CONCERN_OPTIONS.map((option) => {
                    const isSelected = selectedTags.includes(option.label);

                    return (
                        <button
                            key={option.id}
                            onClick={() => onToggleTag(option.label)}
                            className={`
                relative group flex flex-col items-center justify-center 
                p-4 min-h-[110px] md:min-h-[140px] rounded-2xl border-2 transition-all duration-200 ease-in-out
                active:scale-95
                ${isSelected
                                    ? 'border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500'
                                    : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50 shadow-sm'
                                }
              `}
                        >
                            {/* 체크 아이콘 (우측 상단 고정) */}
                            <div className={`
                absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center
                transition-colors duration-200 z-10
                ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-300 group-hover:bg-slate-200'}
              `}>
                                <Check size={14} strokeWidth={3} />
                            </div>

                            {/* 텍스트 라벨 */}
                            <div className={`
                text-base md:text-lg font-bold break-keep text-center transition-colors px-2
                ${isSelected ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}
              `}>
                                {option.label.split('/').map((text, i) => (
                                    <span key={i} className="block leading-tight">
                                        {text}
                                    </span>
                                ))}
                            </div>

                            {/* 장식용 하단 바 (선택 시 강조) */}
                            <div className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-t-full transition-all
                ${isSelected ? 'bg-blue-400' : 'bg-transparent'}
               `} />

                        </button>
                    );
                })}
            </div>

            {/* 다음 단계 버튼 */}
            <div className="flex justify-center">
                <button
                    onClick={onNext}
                    disabled={selectedTags.length === 0}
                    className={`
            w-full md:w-auto px-12 py-4 rounded-full font-bold text-lg transition-all
            ${selectedTags.length > 0
                            ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }
          `}
                >
                    다음 단계로 (3/5)
                </button>
            </div>
        </div>
    );
};