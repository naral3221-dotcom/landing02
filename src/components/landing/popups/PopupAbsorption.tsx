import { ShieldCheck, Timer, Sparkles } from "lucide-react";

// 이미지 불러오기 (한글 파일명도 import 가능합니다)
import absorptionImage from "@/assets/골라겐 분해 이미지.jpg";

export const PopupAbsorption = () => {
    return (
        <div className="py-4 md:py-6 space-y-6 md:space-y-8 px-2 md:px-4">

            {/* 1. Header Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col items-center text-center bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 shadow-sm">
                        <ShieldCheck size={24} className="text-blue-600" />
                    </div>
                    <span className="text-blue-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-2 block">
                        High Safety
                    </span>
                    <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-2 leading-tight break-keep">
                        인체 100% 흡수
                    </h3>
                    <p className="text-slate-600 font-medium text-sm md:text-base break-keep">
                        콜라겐으로 흡수되어 녹는 실
                    </p>
                </div>
            </div>

            {/* 2. Main Visual & Description */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                {/* 이미지 영역 */}
                <div className="w-full bg-slate-50 border-b border-slate-100 p-6 md:p-10 flex items-center justify-center">
                    <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
                        {/* 이미지 */}
                        <img
                            src={absorptionImage}
                            alt="골라겐 분해 과정"
                            className="w-full h-auto object-cover"
                        />
                        {/* 광택 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* 텍스트 설명 영역 */}
                <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-6">

                    <div className="space-y-3">
                        <h4 className="text-lg md:text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
                            <Sparkles size={18} className="text-yellow-500 fill-yellow-500" />
                            RAPPO.L 실은
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base break-keep">
                            체내에서 <span className="text-blue-600 font-bold">100% 콜라겐으로 자연분해</span>되어<br />
                            피부에 흡수됩니다.
                        </p>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base break-keep pt-2">
                            때문에, 피부 속 <span className="text-red-500 font-bold decoration-red-200 underline underline-offset-4">이물질이 남지 않는</span><br />
                            가장 안전한 소재입니다.
                        </p>
                    </div>

                    {/* 3. Highlight Box (기간 표시) */}
                    <div className="w-full bg-blue-50 rounded-xl p-5 border border-blue-100 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 shadow-inner">
                        <div className="flex items-center gap-2 text-blue-600 font-bold">
                            <Timer size={20} />
                            <span className="text-sm md:text-base">녹는 기간</span>
                        </div>
                        <div className="h-[1px] w-full md:w-[1px] md:h-4 bg-blue-200"></div>
                        <span className="text-slate-800 font-black text-lg md:text-xl tracking-tight">
                            18개월 ~ 24개월
                        </span>
                    </div>

                </div>
            </div>

        </div>
    );
};