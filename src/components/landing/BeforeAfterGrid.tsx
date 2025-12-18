import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageIcon } from 'lucide-react';

/* ============================================================================
   BEFORE/AFTER GRID SECTION
   - 전후 사진 그리드 (Real Story)
   - 외부 UI 컴포넌트 의존성 없음 (독립적)
   - 모바일 전용 (430px)
   ============================================================================ */

/* ========== Data ========== */
const cases = Array.from({ length: 10 }).map((_, i) => {
  const caseNum = i + 1;
  return {
    id: caseNum,
    title: `Case ${caseNum}`,
    beforeSrc: `/b&a/${caseNum}-b-1.jpg`,
    afterSrc: `/b&a/${caseNum}-a-1.jpg`
  };
});

/* ========== Sub Components ========== */
const ImageSlot = ({ src, alt, type }: { src: string; alt: string; type: 'BEFORE' | 'AFTER' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden">

      {/* --- Label (BEFORE / AFTER) --- */}
      <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm z-10
        ${type === 'BEFORE' ? 'bg-black/60 text-white' : 'text-white'}`}
        style={type === 'AFTER' ? { backgroundColor: 'rgba(180, 140, 60, 0.85)' } : undefined}>
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
        /* --- Placeholder (이미지 없을 때) --- */
        <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs font-medium">사진 준비중</span>
          <span className="text-[10px] opacity-70 mt-1">{src.split('/').pop()}</span>
        </div>
      )}
    </div>
  );
};

/* ========== Main Component ========== */
export const BeforeAfterGrid = () => {
  return (
    <section className="pt-16 pb-24 bg-white select-none">
      <div className="px-4">

        {/* ========== Header ========== */}
        <div className="text-center mb-16 px-4">
          <span className="inline-block mb-4 px-4 py-1.5 text-[15px] font-medium rounded-full"
            style={{ border: '1px solid #C9A962', color: '#8B7355', backgroundColor: 'rgba(212, 184, 106, 0.1)' }}>
            Real Story
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 break-words">
            놀라운 변화의 시작
          </h2>
          <p className="text-slate-500 break-keep text-[20px]">
            투명브이리프팅의 100% 리얼 전후사진을 확인하세요.
          </p>
        </div>

        {/* ========== Grid ========== */}
        <div className="grid grid-cols-1 gap-6">
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (idx % 2) * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden bg-white"
                style={{ boxShadow: '0 20px 40px -10px rgba(180, 150, 80, 0.15)', border: '1px solid rgba(212, 184, 106, 0.3)' }}>

                {/* --- Before 영역 --- */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageSlot src={item.beforeSrc} alt={`${item.title} Before`} type="BEFORE" />
                </div>

                {/* --- After 영역 --- */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageSlot src={item.afterSrc} alt={`${item.title} After`} type="AFTER" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ========== Disclaimer ========== */}
        <div className="mt-12 text-center px-4">
          <p className="text-slate-400 text-xs break-keep">
            * 수술 결과는 개인에 따라 차이가 있을 수 있으며, 부작용이 발생할 수 있습니다.
          </p>
        </div>

      </div>
    </section>
  );
};
