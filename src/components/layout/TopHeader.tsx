import logoImage from '@/assets/5986604ddbbbb494de4b65764b340209c23f1260.png';
import homeIcon from '@/assets/ICON/ico_home.png';
import callIcon from '@/assets/ICON/ico_call.png';
import kakaoIcon from '@/assets/ICON/ico_kakao.png';

/* ============================================================================
   TOP HEADER
   - 상단 고정 헤더 (로고 + 홈/전화/카카오 아이콘)
   - 800px 컨테이너에 맞춤
   ============================================================================ */

export const TopHeader = () => {
    return (
        <header
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-white border-b border-slate-100 h-16 shadow-sm"
            style={{ width: '100%', maxWidth: '800px' }}
        >
            <div className="px-4 h-full flex justify-between items-center relative">

                {/* 1. 홈 아이콘 */}
                <section className="tohome flex-shrink-0 z-10">
                    <a href="https://balancelab.kr/sub/lift09.php" className="block hover:opacity-70 transition-opacity">
                        <img
                            src={homeIcon}
                            alt="홈페이지로 이동"
                            className="w-5 h-5 object-contain"
                            style={{ filter: 'brightness(0)' }}
                        />
                    </a>
                </section>

                {/* 2. 로고 (중앙) */}
                <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                    <img
                        src={logoImage}
                        alt="밸런스랩 로고"
                        className="h-8 w-auto object-contain"
                        style={{ filter: 'brightness(0)' }}
                    />
                </h1>

                {/* 3. 상담 아이콘들 */}
                <section className="contacts flex items-center gap-3 flex-shrink-0 z-10">
                    <a href="tel:1661-8581" className="block hover:opacity-70 transition-opacity">
                        <img
                            src={callIcon}
                            alt="전화 상담"
                            className="w-5 h-5 object-contain"
                            style={{ filter: 'brightness(0)' }}
                        />
                    </a>

                    <a
                        href="http://pf.kakao.com/_SSyxmxj/chat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-70 transition-opacity"
                    >
                        <img
                            src={kakaoIcon}
                            alt="카카오톡 상담"
                            className="w-5 h-5 object-contain"
                            style={{ filter: 'brightness(0)' }}
                        />
                    </a>
                </section>

            </div>
        </header>
    );
};
