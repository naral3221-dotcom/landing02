import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description: "철저한 안전 관리 시스템과 무사고 경력의 전문 의료진"
  },
  {
    icon: Sparkles,
    title: "Trendy Design",
    description: "개개인의 매력을 살리는 트렌디하고 감각적인 디자인"
  },
  {
    icon: Award,
    title: "Premium Care",
    description: "수술 전 상담부터 수술 후 회복까지 1:1 전담 케어"
  },
  {
    icon: Heart,
    title: "Honest Promise",
    description: "꼭 필요한 수술만 권하는 정직한 진료 원칙 준수"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-900/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why Choose Us?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            단순한 성형을 넘어, 당신의 삶에 자신감을 더해드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 hover:border-pink-500/50 transition-colors duration-300 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 shadow-lg text-pink-500 group-hover:text-pink-400 transition-colors">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
