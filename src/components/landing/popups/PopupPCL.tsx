import { Activity, Feather, Timer } from "lucide-react"; // 아이콘 사용

// 이미지 불러오기 (파일명이 한글, 공백이 포함되어 있어도 그대로 import 가능합니다)
// 만약 에러가 난다면 파일명을 영어(pcl_graph_1.png 등)로 바꾸고 여기도 바꿔주세요.
import graphImage1 from "@/assets/PCL 그래프 1.png";
import graphImage2 from "@/assets/PCL 그래프 2.png";
import graphImage3 from "@/assets/PCL 그래프 3.png";

export const PopupPCL = () => {
    return (
        <div className="py-4 md:py-6 space-y-6 md:space-y-8 px-2 md:px-4">

            {/* 1. Header Section (Rappol과 동일한 인트로 스타일) */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col items-center text-center bg-slate-50/50">
                    <span className="text-blue-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-2 block">
                        PCL THREAD
                    </span>
                    <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">
                        프리미엄 PCL 소재 사용
                    </h3>
                    <p className="text-slate-600 font-medium text-sm md:text-base break-keep">
                        더 오래가고 더 자연스러운 효과를 경험하세요
                    </p>
                </div>
            </div>

            {/* 2. Content Grid (01, 02번 카드) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                {/* Card 01: 인장강도 */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6 flex flex-col items-center text-center group hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-2 mb-4 md:mb-6 self-start">
                        <span className="bg-blue-100 text-blue-600 font-black text-xs px-2 py-1 rounded-md">01</span>
                        <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                            인장강도 <Activity size={16} className="text-blue-400" />
                        </h4>
                    </div>

                    <div className="w-full bg-slate-50 rounded-xl p-4 mb-4 md:mb-6 flex items-center justify-center border border-slate-100">
                        {/* 그래프 이미지 1 */}
                        <img src={graphImage1} alt="인장강도 그래프" className="w-full h-auto max-w-[200px] mix-blend-multiply" />
                    </div>

                    <p className="text-slate-700 font-bold text-base md:text-lg mb-1">유연한 탄성</p>
                    <p className="text-slate-500 text-sm break-keep">피부의 자연스러운 움직임 가능</p>
                </div>

                {/* Card 02: 질량과 분자량 */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6 flex flex-col items-center text-center group hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-2 mb-4 md:mb-6 self-start">
                        <span className="bg-blue-100 text-blue-600 font-black text-xs px-2 py-1 rounded-md">02</span>
                        <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                            질량과 분자량 <Feather size={16} className="text-blue-400" />
                        </h4>
                    </div>

                    <div className="w-full bg-slate-50 rounded-xl p-4 mb-4 md:mb-6 flex items-center justify-center border border-slate-100">
                        {/* 그래프 이미지 2 */}
                        <img src={graphImage2} alt="질량과 분자량 그래프" className="w-full h-auto max-w-[200px] mix-blend-multiply" />
                    </div>

                    <p className="text-slate-700 font-bold text-base md:text-lg mb-1">이물감 없는 부드러움</p>
                    <p className="text-slate-500 text-sm break-keep">불편함 없이 자연스러운 착용감</p>
                </div>
            </div>

            {/* 3. Bottom Section (03번 카드 - 강조형) */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 font-black text-xs px-2 py-1 rounded-md">03</span>
                            <h4 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                                리프팅 지속력 <Timer size={18} className="text-blue-500" />
                            </h4>
                        </div>
                        <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                            <span className="text-blue-600 text-xs font-bold">Long-Lasting Effect</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                        {/* 그래프 이미지 3 (크게 배치) */}
                        <div className="w-full md:w-1/2 bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-center">
                            <img src={graphImage3} alt="리프팅 지속력 그래프" className="w-full h-auto max-w-[280px] mix-blend-multiply" />
                        </div>

                        <div className="w-full md:w-1/2 text-left space-y-2">
                            <p className="text-lg md:text-xl font-bold text-slate-800 leading-snug">
                                <span className="text-blue-600 border-b-2 border-blue-200">일반 실 대비 PCL 실</span>은<br />
                                인체내 천천히 흡수되어
                            </p>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed break-keep">
                                오랫동안 유지되는 강력한 리프팅 효과를<br className="hidden md:block" />
                                기대할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};