import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const reviews = [
  {
    id: "item-1",
    question: "눈 성형 (매몰법) - 20대 여성",
    content: "처음에는 걱정이 많았는데 원장님이 정말 꼼꼼하게 봐주셨어요. 붓기도 생각보다 빨리 빠지고 라인이 너무 자연스러워서 친구들이 어디서 했냐고 계속 물어봐요! 상담 실장님도 친절하셔서 편안하게 결정할 수 있었습니다. 강력 추천해요!"
  },
  {
    id: "item-2",
    question: "코 수술 (코끝+콧대) - 20대 남성",
    content: "남자라 티 나는 건 싫고 자연스럽게 오똑해지고 싶었는데 딱 원하던 라인입니다. 수술 당일에도 케어 잘 해주시고 사후 관리도 철저해서 좋았습니다. 자신감이 많이 생겼어요."
  },
  {
    id: "item-3",
    question: "안면윤곽 3종 - 30대 여성",
    content: "윤곽은 큰 수술이라 병원 고르는데만 6개월 걸렸어요. 오페라를 선택한 건 안전 시스템 때문이었는데 결과도 대만족입니다. 얼굴형이 부드러워지니까 인상이 확 달라졌다는 소리 많이 들어요."
  },
  {
    id: "item-4",
    question: "지방흡입 (복부) - 30대 여성",
    content: "다이어트로도 안 빠지던 살들이 정리되니까 옷 입는 재미가 생겼어요. 흉터 걱정했는데 거의 안 보이고 탄력도 잘 유지되는 것 같아요. 올 여름 비키니 도전합니다!"
  },
  {
    id: "item-5",
    question: "리프팅 시술 - 40대 여성",
    content: "수술은 무섭고 처진 살은 고민이라 리프팅 받았는데 즉각적인 효과가 보이네요. 통증도 참을 만했고 일상생활 바로 가능해서 좋았어요. 주기적으로 받으러 올 예정입니다."
  }
];

export const ReviewAccordion = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-6 md:px-8 mx-auto max-w-3xl">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 break-words">
            Real Reviews
          </h2>
          <p className="text-slate-500 break-keep">
            고객님들이 직접 작성해주신 솔직한 후기입니다.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {reviews.map((review) => (
            <AccordionItem 
              key={review.id} 
              value={review.id}
              className="border border-slate-200 rounded-lg px-4 bg-slate-50 data-[state=open]:bg-white data-[state=open]:shadow-md data-[state=open]:border-blue-200 transition-all duration-300"
            >
              <AccordionTrigger className="text-slate-700 hover:text-blue-600 hover:no-underline font-medium py-6 text-left text-sm md:text-base break-words pr-4">
                {review.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-sm md:text-base break-words">
                {review.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
