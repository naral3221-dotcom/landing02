import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

export const ConsultationForm = () => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    concern: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    if (!formData.name || !formData.phone) {
      toast.error('이름과 연락처를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.');
      setFormData({ name: '', phone: '', concern: '' });
      setAgreed(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white border-slate-200 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 p-6 text-center">
        <CardTitle className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider break-words">
          Free Consultation
        </CardTitle>
        <CardDescription className="text-blue-50 font-medium text-sm md:text-base break-words">
          지금 신청하고 특별한 혜택을 받아보세요
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-medium text-sm md:text-base">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700 font-medium text-sm md:text-base">연락처</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="concern" className="text-slate-700 font-medium text-sm md:text-base">관심 시술 (선택)</Label>
            <Input
              id="concern"
              placeholder="예: 눈매교정, 코 성형 등"
              value={formData.concern}
              onChange={(e) => setFormData({...formData, concern: e.target.value})}
              className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="privacy" 
              checked={agreed}
              onCheckedChange={(c) => setAgreed(c as boolean)}
              className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white shrink-0 mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="privacy"
                className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 break-words"
              >
                개인정보 수집 및 이용에 동의합니다.
              </label>
              <p className="text-xs text-slate-400 break-words">
                수집된 정보는 상담 목적으로만 사용됩니다.
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-6 text-base md:text-lg shadow-lg shadow-blue-900/10 transition-all duration-300 hover:scale-[1.02] break-words"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
                처리중...
              </>
            ) : (
              '상담 신청하기'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
