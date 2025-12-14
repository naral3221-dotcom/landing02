import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from 'lucide-react';

// 데이터 생성 (1~10번 케이스)
const cases = Array.from({ length: 10 }).map((_, i) => {
  const caseNum = i + 1;
  return {
    id: caseNum,
    title: `Case ${caseNum}`,
    beforeSrc: `/b&a/${caseNum}-b-1.jpg`,
    afterSrc: `/b&a/${caseNum}-a-1.jpg`
  };
});

// 개별 이미지 컴포넌트
const ImageSlot = ({ src, alt, type }: { src: string; alt: string; type: 'BEFORE' | 'AFTER' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden">
      {/* 라벨 (BEFORE / AFTER) */}
      <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm z-10 
        ${type === 'BEFORE' ? 'bg-black/60 text-white' : 'bg-blue-600/80 text-white'}`}>
        {type}
      </div>

      {!imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover transition-all duration-500
            ${type === 'BEFORE'
              ? 'group-hover:scale-110 group-hover:grayscale-[0.5] group-active:scale-110 group-active:grayscale-[0.5]'
              : 'group-hover:scale-110 group-active:scale-110'}
          `}
        />
      ) : (
        // 이미지가 아직 없을 때 보여줄 화면 (Placeholder)
        <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs font-medium">사진 준비중</span>
          {/* 디버깅용: 나중에 사진 넣으면 이 줄은 지우셔도 됩니다 */}
          <span className="text-[10px] opacity-70 mt-1">{src.split('/').pop()}</span>
        </div>
      )}
    </div>
  );
};

export const BeforeAfterGrid = () => {
  return (
    <section className="pt-16 pb-24 bg-white select-none">
      <div className="container px-6 md:px-8 mx-auto">
        <div className="text-center mb-16 px-4">
          <Badge variant="outline" className="mb-4 border-blue-500 text-blue-600 bg-blue-50 text-[15px]">Real Story</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 break-words text-[30px]">
            놀라운 변화의 시작
          </h2>
          <p className="text-slate-500 break-keep text-[20px]">
            투명브이리프팅의 100% 리얼 전후사진을 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12">
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (idx % 2) * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden shadow-xl shadow-slate-200/50 bg-white border border-slate-100">

                {/* Before 영역 */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageSlot src={item.beforeSrc} alt={`${item.title} Before`} type="BEFORE" />
                </div>

                {/* After 영역 */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageSlot src={item.afterSrc} alt={`${item.title} After`} type="AFTER" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center px-4">
          <p className="text-slate-400 text-xs break-keep">
            * 수술 결과는 개인에 따라 차이가 있을 수 있으며, 부작용이 발생할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};