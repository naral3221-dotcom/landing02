import { Check, CheckCircle2 } from "lucide-react";
import bwFaceImage from "figma:asset/18b523bba4936eb49596c65a9b1eef2c26f6ca78.png";
import colorFaceImage from "figma:asset/10b99bfbaab6fa18809dba70f2c7e1e1c18da622.png";
import threadImage from "figma:asset/a5afc92e4f4eceaf72ca7fd77f8084aaa41c4c48.png";

export const PopupRappol = () => {
    return (
        <div className="py-4 md:py-6 space-y-6 md:space-y-8 px-2 md:px-4">
            {/* 1. Thread Info Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col items-center text-center bg-slate-50/50">
                    <div className="w-full max-w-[280px] md:max-w-xs mb-6 mix-blend-multiply">
                        <img src={threadImage} alt="RAPPO.L Thread" className="w-full h-auto drop-shadow-sm" />
                    </div>

                    <div className="space-y-4 w-full">
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base break-keep">
                            <strong className="text-slate-900">밸런스랩</strong>에서 오랜 연구끝에<br />
                            자체 개발한 <span className="text-blue-600 font-bold">라포엘 실</span>은
                        </p>

                        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm w-full">
                            <p className="text-slate-400 text-xs mb-3 text-center">기존 일반 실 대비</p>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-left text-sm md:text-base font-bold text-slate-800 justify-items-center">
                                <div className="flex items-center gap-1.5 w-full justify-start"><Check size={14} className="text-blue-500 shrink-0" /> Cog 개수 증가</div>
                                <div className="flex items-center gap-1.5 w-full justify-start"><Check size={14} className="text-blue-500 shrink-0" /> 41cm 장실</div>
                                <div className="flex items-center gap-1.5 w-full justify-start"><Check size={14} className="text-blue-500 shrink-0" /> PCL 소재 사용</div>
                                <div className="flex items-center gap-1.5 w-full justify-start"><Check size={14} className="text-blue-500 shrink-0" /> 특허받은 안전성</div>
                            </div>
                        </div>

                        <p className="text-slate-800 font-bold leading-relaxed text-sm md:text-base pt-2">
                            더 뛰어난 <span className="text-blue-600">실리프팅 효과</span>를<br />
                            기대할 수 있습니다
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Comparison Image Section (UI 개선됨) */}
            <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 pb-8">

                    {/* 이미지 영역 */}
                    <div className="flex items-center justify-center gap-4 mb-6 px-4 pt-8">
                        {/* 왼쪽: 기존 방식 */}
                        <div className="flex flex-col items-center gap-3 w-1/2 max-w-[160px]">
                            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 grayscale opacity-70">
                                <img src={bwFaceImage} alt="Existing Method" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[11px] md:text-xs text-slate-400 font-medium line-through decoration-slate-300">
                                기존 방식
                            </span>
                        </div>

                        {/* 오른쪽: 투명 V 리프팅 */}
                        <div className="flex flex-col items-center gap-3 w-1/2 max-w-[160px]">
                            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border-2 border-blue-400 shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)] scale-105 z-10 bg-white">
                                <img src={colorFaceImage} alt="New Method" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent w-[200%] translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                            </div>
                            <span className="text-[11px] md:text-xs text-blue-600 font-bold">
                                투명 V 리프팅
                            </span>
                        </div>
                    </div>

                    {/* 텍스트 설명 영역 (중앙 정렬 & 깔끔하게 정리) */}
                    <div className="flex flex-col items-center text-center px-6 space-y-5">

                        {/* VS 구분선 */}
                        <div className="flex items-center justify-center gap-3 w-full max-w-[180px] opacity-50">
                            <div className="h-[1px] flex-1 bg-slate-400"></div>
                            <span className="text-[10px] font-black text-slate-400 italic tracking-widest bg-slate-50 px-1">VS</span>
                            <div className="h-[1px] flex-1 bg-slate-400"></div>
                        </div>

                        {/* 메인 텍스트 */}
                        <div className="space-y-2">
                            <p className="text-slate-400 text-xs line-through decoration-slate-300">
                                기존 실리프팅: 부분적인 당김
                            </p>
                            <div className="bg-white/80 rounded-xl p-4 border border-blue-100 shadow-sm backdrop-blur-sm">
                                <strong className="text-slate-900 text-lg md:text-xl block mb-1">
                                    투명 V 리프팅
                                </strong>
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed break-keep">
                                    얼굴 전체의 밸런스를 고려하여<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 font-bold inline-block mt-0.5 border-b border-blue-200 pb-0.5">
                                        넓은 면적을 균일하게
                                    </span>
                                    <span className="text-slate-700"> 끌어올립니다.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. 41cm Thread Diagram Section */}
            <div className="space-y-4 pt-4 md:pt-6 border-t border-slate-100">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white group">
                    <div className="relative w-full h-[320px] md:h-auto md:aspect-[16/9] bg-slate-50 overflow-hidden flex items-center justify-center">
                        {/* Background Decorations */}
                        <div className="absolute right-[-10%] bottom-[-20%] w-[80%] h-[120%] border-l-2 border-slate-200 rounded-[40%] transform -rotate-12 blur-[1px]"></div>
                        <div className="absolute right-[-5%] bottom-[-15%] w-[75%] h-[110%] border-l border-slate-200 rounded-[40%] transform -rotate-12"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-0">
                            {/* Normal Thread */}
                            <div className="flex flex-col items-center gap-3 md:gap-2 opacity-60 w-full md:w-auto -mb-6 md:mb-0 shrink-0 z-10">
                                <div className="relative">
                                    <div className="w-40 h-[4px] bg-slate-400 relative rounded-full">
                                        <div className="absolute left-0 w-[4px] h-3 bg-slate-400 -top-[4px] rounded-full" />
                                        <div className="absolute right-0 w-[4px] h-3 bg-slate-400 -top-[4px] rounded-full" />
                                    </div>
                                </div>
                                <span className="text-base md:text-sm text-slate-500 font-bold font-mono whitespace-nowrap">Normal Thread (10cm)</span>
                            </div>

                            {/* Long Thread SVG */}
                            <div className="relative w-full h-full flex items-center justify-center -mt-8 md:-mt-8">
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet">
                                    <defs>
                                        <linearGradient id="threadGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#2563eb" />
                                            <stop offset="50%" stopColor="#0ea5e9" />
                                            <stop offset="100%" stopColor="#2563eb" />
                                        </linearGradient>
                                        <filter id="glowLight">
                                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <path
                                        d="M 20,95 C 60,95 100,40 180,60 S 260,150 290,95"
                                        fill="none"
                                        stroke="url(#threadGradientLight)"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        filter="url(#glowLight)"
                                        className="drop-shadow-md"
                                    />
                                    <path
                                        d="M 20,95 C 60,95 100,40 180,60 S 260,150 290,95"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeDasharray="20 300"
                                        strokeDashoffset="320"
                                        className="animate-[dash_2s_linear_infinite]"
                                    />
                                    <g transform="translate(0, 150)">
                                        <line x1="20" y1="0" x2="290" y2="0" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                                        <line x1="20" y1="-5" x2="20" y2="5" stroke="#94a3b8" strokeWidth="1" />
                                        <line x1="290" y1="-5" x2="290" y2="5" stroke="#94a3b8" strokeWidth="1" />
                                        <text x="155" y="25" textAnchor="middle" fill="#0284c7" fontSize="22" fontWeight="bold" fontFamily="monospace">
                                            41cm Long Thread
                                        </text>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 z-30 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-scan pointer-events-none" />
                </div>

                <div className="bg-blue-50/50 p-4 md:p-5 rounded-xl border border-blue-100">
                    <h4 className="text-sm md:text-lg font-bold text-slate-800 mb-2 md:mb-3 flex items-center gap-2 break-words">
                        <span className="bg-blue-500 w-1.5 h-5 md:h-6 rounded-full inline-block shrink-0"></span>
                        왜 41cm 장실인가요?
                    </h4>
                    <ul className="space-y-2 md:space-y-3">
                        <li className="flex items-start gap-2 md:gap-3 text-slate-600 text-sm md:text-base">
                            <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={16} />
                            <span className="break-words">
                                일반 짧은 실 대비 <strong className="text-slate-900">4~5배 강력한 고정력</strong>
                            </span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3 text-slate-600 text-sm md:text-base">
                            <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={16} />
                            <span className="break-words">
                                더 긴 길이로 <strong className="text-slate-900">더 넓은 면적</strong>을 한 번에 리프팅
                            </span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3 text-slate-600 text-sm md:text-base">
                            <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={16} />
                            <span className="break-words">
                                끊어짐 없이 <strong className="text-slate-900">강력한 V라인</strong> 완성
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};