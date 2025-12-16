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
            <div className="text-center mb-10 space-y-4">
                {/* 신뢰 뱃지 */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-bold text-green-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        실시간 AI 분석
                    </div>
                    <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
                        🔒 정보 보호
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    정확한 분석을 위해<br className="md:hidden" />
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">기본 정보를 입력해주세요</span>
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                    입력하신 정보는 <strong className="text-slate-700">상담 매칭 외 다른 용도로 사용되지 않습니다.</strong>
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
                    <div className="flex items-center border-2 border-slate-200/50 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all group">
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-4 border-r border-slate-100 text-slate-400 group-focus-within:text-blue-500 transition-colors">
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
                    <div className="flex items-center border-2 border-slate-200/50 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all group">
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-4 border-r border-slate-100 text-slate-400 group-focus-within:text-blue-500 transition-colors">
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
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform'
                                : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
                            }
            `}
                    >
                        {isValid && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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