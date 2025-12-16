import React, { useMemo } from 'react';
import { MessageCircle, RefreshCw, AlertCircle } from 'lucide-react';

// 👇 [수정됨] 점 3개로 src 폴더까지 이동 후 data 폴더 진입
import { REVIEWS } from '../../../data/review';

// 👇 [수정됨] 점 2개로 components 폴더로 이동 후 파일 접근
import { ReviewContentRenderer } from '../../ReviewContentRenderer';

interface UserData {
    name: string;
    phone: string;
    age: string;
    selectedTags: string[];
    hasContouringExp: boolean | null;
    priority: string;
}

interface Props {
    userData: UserData;
    onRestart: () => void;
}

export const Step6Result: React.FC<Props> = ({ userData, onRestart }) => {

    const matchedReviews = useMemo(() => {
        // REVIEWS가 undefined일 경우를 대비한 안전장치
        if (!REVIEWS) return [];

        let results = [...REVIEWS];

        const scoredResults = results.map((review) => {
            let score = 0;

            const isContouringReview = review.memo?.includes('contouring');
            if (userData.hasContouringExp && isContouringReview) {
                score += 1000;
            }

            if (review.age === userData.age) {
                score += 100;
            }

            // tag 타입 명시 (string)
            const tagMatchCount = review.tags.filter((tag: string) =>
                userData.selectedTags.some(userTag => userTag.includes(tag))
            ).length;
            score += tagMatchCount * 10;

            return { ...review, score, isContouringReview };
        });

        const filtered = scoredResults.filter(item => {
            if (userData.hasContouringExp && item.isContouringReview) return true;
            if (item.age !== userData.age) return false;
            return item.score > 0;
        });

        return filtered.sort((a, b) => b.score - a.score);
    }, [userData]);


    return (
        <div className="w-full max-w-2xl mx-auto animate-fadeIn pb-24">

            {/* 매칭된 결과가 있을 때만 헤더 표시 */}
            {matchedReviews.length > 0 && (
                <div className="text-center mb-10">
                    <div className="inline-block bg-slate-900 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 animate-bounce-slow">
                        🎉 {matchedReviews.length}개의 맞춤 사례를 찾았습니다!
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2">
                        <span className="text-blue-600">{userData.name}</span>님을 위한 <br />
                        솔루션 리포트
                    </h2>
                    <p className="text-slate-500 text-sm">
                        고객님이 중요하게 생각하시는 <br />
                        <span className="font-bold text-slate-700 underline">'{userData.priority}'</span> 위주로 분석했습니다.
                    </p>
                </div>
            )}

            {userData.hasContouringExp && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8 flex items-start gap-3 mx-4 md:mx-0">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-orange-800 break-keep">
                        <strong>윤곽수술 후 처짐 케이스</strong>가 우선적으로 표시됩니다.<br />
                        일반적인 노화와 접근 방식이 다르므로, 비슷한 고민을 가졌던 분들의 후기를 먼저 확인해보세요.
                    </div>
                </div>
            )}

            <div className="space-y-12">
                {matchedReviews.length > 0 ? (
                    matchedReviews.map((review, index) => (
                        <div key={review.id} className="relative bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-wrap gap-2">
                                {index === 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        BEST 매칭
                                    </span>
                                )}
                                {review.memo?.includes('contouring') && (
                                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded">
                                        윤곽 후 관리
                                    </span>
                                )}
                                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                                    {review.age}대
                                </span>
                                {review.tags.map((tag: string) => (
                                    <span key={tag} className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="p-6 md:p-8">
                                <ReviewContentRenderer content={review.content} isFirstReview={index === 0} />
                            </div>

                            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 text-center">
                                <p className="text-xs text-slate-400 mb-2">이 케이스가 마음에 드시나요?</p>
                                <button className="w-full py-3 bg-white border border-blue-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                                    이 후기 모델처럼 상담받기
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl">
                        <p className="text-slate-500">
                            조건에 완벽하게 일치하는 후기가 없습니다.<br />
                            전체 후기를 보여드릴까요?
                        </p>
                        <button onClick={onRestart} className="mt-4 text-blue-600 font-bold underline">
                            조건 다시 선택하기
                        </button>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 z-50 md:sticky md:bottom-4 md:bg-transparent md:border-none md:backdrop-blur-none">
                <div className="max-w-xl mx-auto flex gap-3">
                    <button
                        onClick={onRestart}
                        className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                    >
                        <RefreshCw size={18} />
                        다시하기
                    </button>
                    <button className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-colors animate-pulse-subtle">
                        <MessageCircle size={18} />
                        비용/상담 문의하기
                    </button>
                </div>
            </div>

        </div>
    );
};