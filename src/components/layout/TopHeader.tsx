import logoImage from '@/assets/5986604ddbbbb494de4b65764b340209c23f1260.png';
import homeIcon from '@/assets/ICON/ico_home.png';
import callIcon from '@/assets/ICON/ico_call.png';
import kakaoIcon from '@/assets/ICON/ico_kakao.png';

export const TopHeader = () => {
    return (
        // [수정] h-14 -> h-16 (모바일), md:h-16 -> md:h-20 (PC) 로 높이 확대
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100 h-16 md:h-20 shadow-sm">
            <div className="container mx-auto px-4 h-full flex justify-between items-center relative">

                {/* 1. 홈 아이콘 */}
                <section className="tohome flex-shrink-0 z-10">
                    <a href="https://balancelab.kr/sub/lift09.php" className="block hover:opacity-70 transition-opacity">
                        <img
                            src={homeIcon}
                            alt="홈페이지로 이동"
                            className="w-5 h-5 md:w-6 md:h-6 object-contain"
                            style={{ filter: 'brightness(0)' }}
                        />
                    </a>
                </section>

                {/* 2. 로고 (커진 사이즈 유지) */}
                <h1 className="top-logo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                    <img
                        src={logoImage}
                        alt="밸런스랩 로고"
                        className="h-8 md:h-10 w-auto object-contain"
                        style={{ filter: 'brightness(0)' }}
                    />
                </h1>

                {/* 3. 상담 아이콘들 */}
                <section className="contacts flex items-center gap-3 md:gap-4 flex-shrink-0 z-10">
                    <a href="tel:1661-8581" className="block hover:opacity-70 transition-opacity">
                        <img
                            src={callIcon}
                            alt="전화 상담"
                            className="w-5 h-5 md:w-6 md:h-6 object-contain"
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
                            className="w-5 h-5 md:w-6 md:h-6 object-contain"
                        />
                    </a>
                </section>

            </div>
        </header>
    );
};