import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Step6Result } from '../components/matching/steps/Step6Result';
import { TopHeader } from '../components/layout/TopHeader';

interface UserData {
  name: string;
  phone: string;
  age: string;
  selectedTags: string[];
  hasContouringExp: boolean | null;
  priority: string;
}

export default function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // URL에서 사용자 데이터 파싱
    const data = searchParams.get('data');

    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data)) as UserData;
        setUserData(parsed);
        console.log('Parsed user data:', parsed); // 디버깅용
      } catch (error) {
        console.error('Failed to parse user data:', error);
        // 파싱 실패 시 홈으로 리다이렉트하지 않고 에러 표시
      }
    }
  }, [searchParams, navigate]);

  const handleRestart = () => {
    navigate('/');
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #eff6ff, #faf5ff, #fdf2f8)' }}>
        <div className="text-slate-600 text-lg font-semibold">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #eff6ff, #faf5ff, #fdf2f8)' }}>
      <TopHeader />

      <main className="pt-16 md:pt-20">
        <Step6Result userData={userData} onRestart={handleRestart} />
      </main>
    </div>
  );
}
