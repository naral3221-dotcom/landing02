import React, { useState } from 'react';
import { User, Phone } from 'lucide-react';

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
            <div className="text-center mb-10 space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                    정확한 분석을 위해<br className="md:hidden" />
                    <span className="text-blue-600">기본 정보를 입력해주세요</span>
                </h3>
                <p className="text-slate-500 text-sm">
                    입력하신 정보는 상담 매칭 외 다른 용도로 사용되지 않습니다.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* 이름 입력 (아이콘 분리형 디자인) */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">이름</label>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white">
                        <div className="bg-slate-50 px-4 py-4 border-r border-slate-100 text-slate-400">
                            <User className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="성함을 입력해주세요"
                            className="w-full px-4 py-4 outline-none text-slate-900 placeholder-slate-300"
                        />
                    </div>
                </div>

                {/* 연락처 입력 (아이콘 분리형 디자인) */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">연락처</label>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white">
                        <div className="bg-slate-50 px-4 py-4 border-r border-slate-100 text-slate-400">
                            <Phone className="w-5 h-5" />
                        </div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={13}
                            placeholder="010-0000-0000"
                            className="w-full px-4 py-4 outline-none text-slate-900 placeholder-slate-300"
                        />
                    </div>
                </div>

                <div className="pt-8">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`
              w-full py-4 rounded-full font-bold text-lg transition-all
              ${isValid
                                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                                : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
                            }
            `}
                    >
                        다음 (연령 선택)
                    </button>
                </div>
            </form>
        </div>
    );
};