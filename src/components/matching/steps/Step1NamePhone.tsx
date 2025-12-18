import React, { useState } from 'react';
import { User, Phone, ArrowRight } from 'lucide-react';

export interface Step1Data {
    name: string;
    phone: string;
}

interface Props {
    onNext: (data: Step1Data) => void;
    defaultValues?: Partial<Step1Data>;
}

export const Step1NamePhone: React.FC<Props> = ({ onNext, defaultValues }) => {
    const [name, setName] = useState(defaultValues?.name || '');
    const [phone, setPhone] = useState(defaultValues?.phone || '');

    // 연락처 자동 하이픈
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        let formatted = rawValue;

        if (rawValue.length > 3 && rawValue.length <= 7) {
            formatted = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
        } else if (rawValue.length > 7) {
            formatted = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 11)}`;
        }
        setPhone(formatted);
    };

    const isValid = name.length > 0 && phone.length >= 10;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onNext({ name, phone });
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto animate-fadeIn">
            {/* 헤더 개선: 뱃지 추가 */}
            <div className="text-center mb-14 md:mb-10 space-y-4">
                {/* 신뢰 뱃지 */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1" style={{ backgroundColor: 'rgba(212, 184, 106, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)', color: '#8B7355' }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#C9A962' }} />
                        실시간 AI 분석
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(212, 184, 106, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)', color: '#8B7355' }}>
                        🔒 정보 보호
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    정확한 분석을 위해<br className="md:hidden" />
                    <span style={{ background: 'linear-gradient(90deg, #8B7355, #C9A962)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>기본 정보를 입력해주세요</span>
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                    입력하신 정보는<br />
                    <strong className="text-slate-700">상담 매칭 외 다른 용도로 사용되지 않습니다.</strong>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* 이름 입력 (글라스모피즘 + 체크마크) */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                        이름
                        {name.length > 0 && (
                            <span className="text-green-500 text-xs flex items-center gap-1 animate-fadeIn">
                                ✓ 입력완료
                            </span>
                        )}
                    </label>
                    <div className="flex items-center border-2 border-slate-200/50 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg focus-within:ring-2 transition-all group" style={{ '--tw-ring-color': 'rgba(201, 169, 98, 0.5)' } as React.CSSProperties} onFocus={(e) => e.currentTarget.style.borderColor = '#C9A962'} onBlur={(e) => e.currentTarget.style.borderColor = ''}>
                        <div className="bg-gradient-to-br from-slate-50 px-4 py-4 border-r border-slate-100 text-slate-400 group-focus-within:text-amber-600 transition-colors" style={{ background: 'linear-gradient(to bottom right, #fafaf9, rgba(212, 184, 106, 0.1))' }}>
                            <User className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="성함을 입력해주세요"
                            className="w-full px-4 py-4 outline-none text-slate-900 placeholder-slate-300 bg-transparent"
                        />
                    </div>
                </div>

                {/* 연락처 입력 (글라스모피즘 + 체크마크) */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                        연락처
                        {phone.length >= 10 && (
                            <span className="text-green-500 text-xs flex items-center gap-1 animate-fadeIn">
                                ✓ 입력완료
                            </span>
                        )}
                    </label>
                    <div className="flex items-center border-2 border-slate-200/50 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg focus-within:ring-2 transition-all group" style={{ '--tw-ring-color': 'rgba(201, 169, 98, 0.5)' } as React.CSSProperties} onFocus={(e) => e.currentTarget.style.borderColor = '#C9A962'} onBlur={(e) => e.currentTarget.style.borderColor = ''}>
                        <div className="bg-gradient-to-br from-slate-50 px-4 py-4 border-r border-slate-100 text-slate-400 group-focus-within:text-amber-600 transition-colors" style={{ background: 'linear-gradient(to bottom right, #fafaf9, rgba(212, 184, 106, 0.1))' }}>
                            <Phone className="w-5 h-5" />
                        </div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={13}
                            placeholder="010-0000-0000"
                            className="w-full px-4 py-4 outline-none text-slate-900 placeholder-slate-300 bg-transparent"
                        />
                    </div>
                </div>

                <div className="pt-8">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`
              w-full py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group
              ${isValid
                                ? 'text-white shadow-lg hover:shadow-2xl hover:scale-105 transform'
                                : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
                            }
            `}
                        style={isValid ? { background: 'linear-gradient(135deg, #8B7355 0%, #C9A962 100%)', boxShadow: '0 10px 30px -5px rgba(139, 115, 85, 0.4)' } : {}}
                    >
                        {isValid && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2), rgba(139, 115, 85, 0.2))' }} />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            다음 (연령 선택)
                            {isValid && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};