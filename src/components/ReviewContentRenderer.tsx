import React from 'react';

interface Props {
    content: string;
}

export const ReviewContentRenderer: React.FC<Props> = ({ content }) => {
    // 0. 줄바꿈이 있는 태그 처리 (태그 내부에서 줄바꿈 시 태그를 닫고 다시 열어줌)
    // 예: <high>첫줄\n둘째줄</high> -> <high>첫줄</high>\n<high>둘째줄</high>
    const preprocessed = content.replace(/<(b|high|orange|blue)>([\s\S]*?)<\/\1>/gi, (match, tag, body) => {
        if (body.match(/\r?\n/)) {
            return `<${tag}>${body.replace(/\r?\n/g, `</${tag}>\n<${tag}>`)}</${tag}>`;
        }
        return match;
    });

    // 1. 태그 제거 및 줄바꿈으로 분리
    const lines = preprocessed
        .replace(/\r/g, '') // \r 제거 (줄바꿈 정리)
        .split('\n');

    // 2. 그리드 모드 상태 관리 (이미지를 묶어서 보여주기 위함)
    let inGrid = false;
    let gridImages: string[] = [];

    // 렌더링 결과를 담을 배열
    const renderedOutput: React.ReactNode[] = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
            renderedOutput.push(<br key={`br-${index}`} className="hidden md:block" />);
            return;
        }

        // --- A. Grid(이미지 모음) 처리 로직 ---
        if (trimmed.toLowerCase() === '<grid>') {
            inGrid = true;
            gridImages = []; // 그리드 시작
            return;
        }
        if (trimmed.toLowerCase() === '</grid>') {
            inGrid = false;
            // 그리드 닫힐 때 모아둔 이미지들을 2열 그리드로 렌더링
            if (gridImages.length > 0) {
                renderedOutput.push(
                    <div key={`grid-${index}`} className="grid grid-cols-2 gap-2 my-4">
                        {gridImages.map((src, imgIdx) => (
                            <div key={imgIdx} className="rounded-xl overflow-hidden shadow-sm border border-slate-100 aspect-[4/5] bg-slate-50">
                                <img
                                    src={src}
                                    alt="Review"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                );
            }
            return;
        }

        // --- B. 텍스트 효과 처리 로직 (이미지 인식보다 우선) ---

        // 1. <box>박스 스타일</box>
        if (trimmed.startsWith('<box>') && trimmed.endsWith('</box>')) {
            const text = trimmed.replace(/<\/?box>/g, '');
            renderedOutput.push(
                <div key={`box-${index}`} className="inline-block bg-slate-100 text-slate-800 font-bold px-4 py-2 rounded-lg my-4 text-sm md:text-base border border-slate-200">
                    {text}
                </div>
            );
            return;
        }

        // 2. <title>소제목</title>
        if (trimmed.includes('<title>')) {
            const text = trimmed.replace(/<\/?title>/g, '');
            renderedOutput.push(
                <h3 key={`title-${index}`} className="text-lg md:text-xl font-bold text-slate-900 mt-8 mb-2 border-b border-slate-100 pb-2 inline-block">
                    {text}
                </h3>
            );
            return;
        }

        // --- C. 이미지 경로 감지 (윈도우 경로 \ 포함) ---
        // 태그(<)나 괄호(()로 시작하지 않으며, 확장자가 있거나 public\로 시작하는 경우
        const isImagePath = !trimmed.startsWith('<') && !trimmed.startsWith('(') &&
            (trimmed.match(/\.(jpg|jpeg|png|gif|webp)$/i) || trimmed.startsWith('public\\'));

        if (inGrid && isImagePath) {
            // 그리드 내부라면 이미지 배열에 추가 (경로 보정: public 제거, \ -> /)
            const cleanPath = trimmed.replace(/\\/g, '/').replace(/^public\//, '/');
            gridImages.push(cleanPath);
            return;
        }

        if (!inGrid && isImagePath) {
            // 그리드 밖의 단독 이미지
            const cleanPath = trimmed.replace(/\\/g, '/').replace(/^public\//, '/');
            renderedOutput.push(
                <img
                    key={`img-${index}`}
                    src={cleanPath}
                    alt="Review"
                    className="rounded-xl w-full object-cover shadow-md my-4"
                />
            );
            return;
        }

        // 3. 일반 텍스트 (인라인 스타일 파싱 적용)
        renderedOutput.push(
            <p key={`p-${index}`} className="text-slate-600 leading-relaxed text-sm md:text-base break-keep">
                {parseInlineStyles(trimmed)}
            </p>
        );
    });

    return <div className="text-center">{renderedOutput}</div>;
};

// 인라인 스타일 변환 헬퍼 함수
const parseInlineStyles = (text: string) => {
    // 태그 포맷: <tag>내용</tag>
    // 정규식 설명: (<(tag)> ... </tag>) 그룹을 캡처해서 split
    const parts = text.split(/((?:<(?:b|high|orange|blue)>).*?(?:<\/(?:b|high|orange|blue)>))/gi);

    return parts.map((part, i) => {
        if (part.match(/^<high>/i)) {
            const content = part.replace(/^<high>|(<\/high>)$/ig, '');
            return <span key={i} className="bg-yellow-200 text-yellow-900 px-1 rounded mx-0.5 font-bold shadow-sm">{content}</span>;
        }
        if (part.match(/^<orange>/i)) {
            const content = part.replace(/^<orange>|(<\/orange>)$/ig, '');
            return <span key={i} className="text-orange-500 font-bold">{content}</span>;
        }
        if (part.match(/^<blue>/i)) {
            const content = part.replace(/^<blue>|(<\/blue>)$/ig, '');
            return <span key={i} className="text-blue-600 font-bold">{content}</span>;
        }
        if (part.match(/^<b>/i)) {
            const content = part.replace(/^<b>|(<\/b>)$/ig, '');
            return <strong key={i} className="text-slate-900 font-black">{content}</strong>;
        }
        return part;
    });
};