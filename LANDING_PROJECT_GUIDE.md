# 🚀 투명브이 랜딩페이지 + AI 매칭 시스템 완벽 가이드

> **프로젝트 완료일**: 2025-12-19
> **목적**: DB 수집형 랜딩페이지 + AI 매칭 결과 페이지 (일회용 토큰 보안)
> **URL**: https://balancelab.kr/Landings/tvlanding01-1/

---

## 📋 목차

1. [프로젝트 구조](#1-프로젝트-구조)
2. [기술 스택](#2-기술-스택)
3. [핵심 기능](#3-핵심-기능)
4. [개발 환경 설정](#4-개발-환경-설정)
5. [빌드 및 배포](#5-빌드-및-배포)
6. [PHP 백엔드 연동](#6-php-백엔드-연동)
7. [자주 발생한 에러 & 해결법](#7-자주-발생한-에러--해결법)
8. [주의사항 체크리스트](#8-주의사항-체크리스트)
9. [다음 랜딩 제작 시 순서](#9-다음-랜딩-제작-시-순서)

---

## 1. 프로젝트 구조

### 폴더 구조
```
C:\Users\USER\Desktop\
├── landing02\                    # 메인 랜딩페이지 (React + Vite)
│   ├── src\
│   │   ├── components\
│   │   │   ├── landing\          # 일반 랜딩 섹션
│   │   │   └── matching\         # AI 매칭 시스템
│   │   │       ├── index.tsx     # 메인 매칭 컴포넌트
│   │   │       └── steps\        # 6단계 폼
│   │   ├── data\
│   │   │   └── reviews\          # 후기 데이터 (20y-a.ts 등)
│   │   └── utils\
│   │       └── paths.ts          # 경로 유틸리티
│   ├── public\
│   │   └── match\                # 전후 이미지 (webp)
│   ├── index.html                # 광고 태그 포함
│   ├── vite.config.ts            # base: /Landings/tvlanding01-1/
│   └── package.json
│
├── publish\
│   ├── resultpage\               # 결과 페이지 (React + Vite)
│   │   ├── src\
│   │   │   ├── components\
│   │   │   │   ├── result\      # 결과 표시 컴포넌트
│   │   │   │   ├── AccessGuard.tsx  # 토큰 검증
│   │   │   │   └── ReviewContentRenderer.tsx
│   │   │   └── utils\
│   │   │       └── paths.ts
│   │   ├── index.html            # GTM 포함
│   │   └── vite.config.ts        # base: /Landings/tvlanding01-1/result/
│   │
│   └── inc\                      # PHP 백엔드 파일
│       ├── form_update_tvlanding.php      # 폼 제출 처리
│       ├── success_tvlanding.php          # 리다이렉트 처리
│       ├── verify_token_tvlanding.php     # 토큰 검증 API
│       └── setup_tokens_table.php         # DB 테이블 생성 (일회용)
```

### FTP 배포 구조
```
/www/Landings/
├── tvlanding01-1/                # 메인 랜딩 (빌드 결과물)
│   ├── index.html
│   ├── assets/
│   └── match/                    # 이미지 파일들
│       └── 20y/ab type/...
│
├── tvlanding01-1/result/         # 결과 페이지 (빌드 결과물)
│   ├── index.html
│   └── assets/
│
└── inc/                          # 공유 PHP 파일
    ├── form_update_tvlanding.php
    ├── success_tvlanding.php
    └── verify_token_tvlanding.php
```

---

## 2. 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Vite 6** (빌드 도구)
- **Tailwind CSS** (스타일링)
- **Framer Motion** (애니메이션)
- **React Router** (라우팅 - 결과페이지만)
- **Lucide React** (아이콘)

### Backend
- **PHP** (Gnuboard5 기반)
- **MySQL** (board3 테이블 + g5_board_new_tokens 테이블)

### 광고 추적
- Google Tag Manager (GTM-TQXZWKLX)
- Google Analytics (G-4HX67VWEL1)
- Google Ads (AW-16544305243)
- Facebook Pixel (4개 계정)
- TikTok Pixel (D4EHT5BC77UBVM8PB1QG)

---

## 3. 핵심 기능

### 3.1 AI 매칭 시스템 (6단계)

#### Step 1: 이름/연락처
- 필수 입력: 이름, 전화번호
- 전화번호 자동 하이픈 처리

#### Step 2: 연령대 선택
- 20대 / 30대 / 40대 / 50대 이상
- 연령별 후기 데이터 필터링

#### Step 3: 관심 부위 선택 (다중 선택)
- 20대: 8개 옵션
- 30대: 7개 옵션
- 40대: 10개 옵션
- 50대: 3개 옵션

#### Step 4: 시술 경험 여부
- YES / NO

#### Step 5: 분석 & 게이트
- **Phase 1**: 로딩 애니메이션 (4초)
  - 얼굴형 분석 중...
  - 유사 연령대 검색 중...
  - 윤곽/피부 타입 매칭 중...
  - 최적 케이스 선별 완료!

- **Phase 2**: 게이트 화면
  - 블러 처리된 전/후 이미지 미리보기
  - 개인정보 수집 동의 체크박스
  - "결과 확인 및 상담신청하기" 버튼
  - **여기서 DB 제출 발생**

#### Step 6: 결과 페이지 (별도 도메인)
- 일회용 토큰으로 접근
- AI 매칭된 후기 10개 표시
- 모달로 전체 후기 열람

### 3.2 보안 시스템 (일회용 토큰)

#### 토큰 생성 (Step5 → DB 제출 시)
```typescript
// 1. 랜덤 토큰 생성
const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
  .map(b => b.toString(16).padStart(2, '0'))
  .join('');

// 2. 토큰 해시 (SHA-256)
const tokenHash = crypto.subtle.digest('SHA-256', encoder.encode(token));

// 3. DB 저장 (PHP)
INSERT INTO g5_board_new_tokens (
  token_hash, user_name, user_age, user_tags,
  user_exp, user_priority, used, created_at
) VALUES (...);

// 4. 결과 페이지 URL 생성
const resultUrl = `/Landings/tvlanding01-1/result/?token=${encodeURIComponent(token)}&name=...`;
```

#### 토큰 검증 (결과 페이지 진입 시)
```php
// verify_token_tvlanding.php

// 1. 토큰 해시 계산
$token_hash = hash('sha256', $token);

// 2. DB 조회 (10분 이내 + 미사용)
SELECT * FROM g5_board_new_tokens
WHERE token_hash = '$token_hash'
AND used = 0
AND created_at > DATE_SUB(NOW(), INTERVAL 10 MINUTE);

// 3. 검증 성공 시 used=1로 변경
UPDATE g5_board_new_tokens SET used = 1, used_at = NOW();
```

---

## 4. 개발 환경 설정

### 4.1 랜딩 페이지 설정

```bash
cd C:\Users\USER\Desktop\landing02
npm install
npm run dev  # http://localhost:5173
```

#### vite.config.ts
```typescript
export default defineConfig({
  base: '/Landings/tvlanding01-1/',  // 배포 경로
  build: {
    outDir: 'build',  // 빌드 폴더명
  }
});
```

#### src/utils/paths.ts (경로 유틸리티)
```typescript
export const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  if (path.startsWith(base)) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${cleanBase}/${cleanPath}`;
};
```

### 4.2 결과 페이지 설정

```bash
cd C:\Users\USER\Desktop\publish\resultpage
npm install
npm run dev  # http://localhost:5174
```

#### vite.config.ts
```typescript
export default defineConfig({
  base: '/Landings/tvlanding01-1/result/',  // 배포 경로
  build: {
    outDir: 'dist',
  }
});
```

---

## 5. 빌드 및 배포

### 5.1 빌드 순서

```bash
# 1. 랜딩 페이지 빌드
cd C:\Users\USER\Desktop\landing02
npm run build
# → build/ 폴더 생성

# 2. 결과 페이지 빌드
cd C:\Users\USER\Desktop\publish\resultpage
npm run build
# → dist/ 폴더 생성
```

### 5.2 FTP 업로드

#### 랜딩 페이지
```
로컬: C:\Users\USER\Desktop\landing02\build\
FTP:  /www/Landings/tvlanding01-1/
```

#### 결과 페이지
```
로컬: C:\Users\USER\Desktop\publish\resultpage\dist\
FTP:  /www/Landings/tvlanding01-1/result/
```

#### PHP 파일
```
로컬: C:\Users\USER\Desktop\publish\inc\
FTP:  /www/Landings/inc/

업로드 파일:
- form_update_tvlanding.php
- success_tvlanding.php
- verify_token_tvlanding.php
```

### 5.3 DB 테이블 생성 (최초 1회)

```bash
# 1. setup_tokens_table.php 업로드
로컬: C:\Users\USER\Desktop\publish\inc\setup_tokens_table.php
FTP:  /www/Landings/inc/

# 2. 브라우저에서 실행
https://balancelab.kr/Landings/inc/setup_tokens_table.php

# 3. 실행 후 즉시 삭제 (보안)
FTP에서 setup_tokens_table.php 파일 삭제
```

---

## 6. PHP 백엔드 연동

### 6.1 form_update_tvlanding.php (폼 제출)

#### 주요 기능
- Gnuboard5 board3 테이블에 상담 신청 저장
- 토큰 생성 및 g5_board_new_tokens 테이블 저장
- 결과 페이지로 리다이렉트

#### DB 필드 매핑
```php
$bo_table = 'board3';              // 게시판 테이블
$wr_name = $_POST['wr_name'];      // 이름
$wr_7 = $_POST['wr_7'];            // 전화번호
$wr_3 = $_POST['age'];             // 연령대
$wr_5 = 'tvlanding01-1';           // 랜딩 키
$wr_10 = 'AI매칭_투명브이';        // 구분자
```

#### 토큰 저장
```php
// URL에서 토큰 추출
$result_url = $_POST['result_url'];
parse_str(parse_url($result_url, PHP_URL_QUERY), $query_params);
$token = urldecode($query_params['token']);
$token_hash = hash('sha256', $token);

// DB 저장
sql_query("INSERT INTO {$g5['board_new_table']}_tokens
           (token_hash, user_name, user_age, user_tags, user_exp, user_priority, used, created_at)
           VALUES
           ('{$token_hash}', '{$user_name}', '{$user_age}', '{$user_tags}', {$user_exp}, '{$user_priority}', 0, NOW())
           ON DUPLICATE KEY UPDATE created_at = NOW()");
```

### 6.2 verify_token_tvlanding.php (토큰 검증 API)

#### CORS 설정
```php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
```

#### 검증 로직
```php
// 1. 토큰 해시
$token_hash = hash('sha256', $token);

// 2. DB 조회 (10분 이내 + 미사용)
$sql = "SELECT * FROM {$g5['board_new_table']}_tokens
        WHERE token_hash = '{$token_hash}'
        AND used = 0
        AND created_at > DATE_SUB(NOW(), INTERVAL 10 MINUTE)
        LIMIT 1";

// 3. 검증 성공 시 used=1 업데이트
sql_query("UPDATE {$g5['board_new_table']}_tokens
           SET used = 1, used_at = NOW()
           WHERE token_hash = '{$token_hash}'");

// 4. 응답
echo json_encode([
    'valid' => true,
    'data' => [
        'name' => $result['user_name'],
        'age' => $result['user_age'],
        'tags' => $result['user_tags'],
        'exp' => $result['user_exp'],
        'priority' => $result['user_priority']
    ]
]);
```

### 6.3 success_tvlanding.php (리다이렉트)

```php
// 결과 페이지로 리다이렉트
if( isset($_POST['redirect_to_result']) && $_POST['redirect_to_result'] === 'true' ) {
    $result_url = $_POST['result_url'];
    echo "<script>window.location.href = '{$result_url}';</script>";
    exit;
}
```

---

## 7. 자주 발생한 에러 & 해결법

### 7.1 이미지 경로 404 에러

#### 증상
```
GET /Landings/tvlanding01-1/public/match/20y/ab type/6/6-a-1.webp 404
```

#### 원인
- `public/` 접두사가 경로에 포함됨
- 후기 데이터에 `public\match\...` 형식으로 저장되어 있음

#### 해결
```typescript
// Step5Analysis.tsx & ReviewContentRenderer.tsx
const cleanPath = imagePath
  .replace(/\\/g, '/')           // 백슬래시 → 슬래시
  .replace(/^public\//, '/');    // public/ 제거
const finalPath = getAssetPath(cleanPath);
```

### 7.2 Step5 블러 이미지 안 보임

#### 증상
- 게이트 화면에서 전/후 이미지가 회색 박스로만 표시

#### 원인
- 후기 데이터에 `<box>✅시술 전</box>` 태그 포함
- 정규식이 태그 없는 버전만 매칭

#### 해결
```typescript
// 정규식에 box 태그 옵션 추가
const beforeSectionMatch = content.match(
  /(<box>)?✅시술 전(<\/box>)?[\s\S]*?(?=(<box>)?✅시술 후|$)/
);
```

### 7.3 토큰 검증 실패 (Invalid token)

#### 증상
```
alert('접근 권한이 없거나 이미 확인한 결과입니다.')
```

#### 원인 1: 테이블 없음
```sql
-- g5_board_new_tokens 테이블이 생성되지 않음
```

**해결**: setup_tokens_table.php 실행

#### 원인 2: 토큰 만료
```sql
-- 10분 경과 또는 이미 사용됨 (used=1)
```

**해결**: 새로 매칭 진행

#### 원인 3: URL 인코딩 문제
```typescript
// 토큰이 URL 인코딩되지 않음
const resultUrl = `/result/?token=${token}`;  // ❌
const resultUrl = `/result/?token=${encodeURIComponent(token)}`;  // ✅
```

### 7.4 PHP HTTP 500 에러

#### 증상
```
https://balancelab.kr/Landings/inc/form_update_tvlanding.php
HTTP ERROR 500
```

#### 원인
```php
// common.php 경로 오류
include_once($_SERVER['DOCUMENT_ROOT'].'/inc/common.php');  // ❌
```

#### 해결
```php
include_once($_SERVER['DOCUMENT_ROOT'].'/common.php');  // ✅
```

### 7.5 결과 페이지 모달 이미지 404

#### 증상
- 후기 모달에서 이미지가 로딩되지 않음

#### 원인
- ReviewContentRenderer.tsx에 getAssetPath() 미적용

#### 해결
```typescript
import { getAssetPath } from '@/utils/paths';

const cleanPath = trimmed.replace(/\\/g, '/').replace(/^public\//, '/');
const finalPath = getAssetPath(cleanPath);

<img src={finalPath} alt="Review" />
```

### 7.6 cafe24 phpMyAdmin 접근 불가

#### 증상
```
보안 취약점 강화를 위해 [MySQL 웹어드민] 서비스를 중단되었습니다.
```

#### 해결
- setup_tokens_table.php 스크립트 사용
- 또는 HeidiSQL 같은 외부 클라이언트 사용

---

## 8. 주의사항 체크리스트

### 8.1 빌드 전 확인

- [ ] `vite.config.ts`의 `base` 경로 확인
- [ ] 광고 태그가 `index.html`에 포함되었는지 확인
- [ ] 이미지 파일이 `public/match/` 폴더에 있는지 확인
- [ ] `getAssetPath()`가 모든 이미지 경로에 적용되었는지 확인

### 8.2 배포 전 확인

- [ ] PHP 파일의 `common.php` 경로가 정확한지 확인
- [ ] `form_update_tvlanding.php`의 `$bo_table` 값 확인 (board3)
- [ ] FTP 경로가 정확한지 확인
  - 랜딩: `/www/Landings/tvlanding01-1/`
  - 결과: `/www/Landings/tvlanding01-1/result/`
  - PHP: `/www/Landings/inc/`

### 8.3 배포 후 확인

- [ ] 메인 페이지 접속 확인
- [ ] AI 매칭 전체 플로우 테스트
  - Step 1 → 2 → 3 → 4 → 5 (로딩 → 게이트)
  - 상담 신청 → DB 저장 확인
  - 결과 페이지 리다이렉트 확인
- [ ] 토큰 검증 작동 확인
  - 정상 접근: 결과 표시
  - 재접근: 차단 메시지
  - 직접 URL 접근: 차단
- [ ] 광고 픽셀 작동 확인 (GTM 디버그 모드)

### 8.4 보안 체크

- [ ] `setup_tokens_table.php` 삭제 확인 (사용 후)
- [ ] 토큰 만료 시간 확인 (10분)
- [ ] 일회용 토큰 검증 확인 (used=1)
- [ ] SQL Injection 방지 확인 (prepared statements 사용 권장)

---

## 9. 다음 랜딩 제작 시 순서

### 9.1 사전 준비

1. **프로젝트 폴더 복사**
   ```bash
   C:\Users\USER\Desktop\landing02\ → landing03\
   C:\Users\USER\Desktop\publish\resultpage\ → resultpage2\
   ```

2. **설정 파일 수정**
   ```typescript
   // vite.config.ts
   base: '/Landings/tvlanding02/'  // 새 경로로 변경
   ```

3. **PHP 파일 복사**
   ```bash
   form_update_tvlanding.php → form_update_tvlanding02.php
   success_tvlanding.php → success_tvlanding02.php
   verify_token_tvlanding02.php (새로 만들 필요 없음, 공통 사용 가능)
   ```

### 9.2 개발 순서

#### Step 1: 랜딩 페이지 UI 작업
- Hero 섹션
- 특징 섹션
- 전후 비교
- CTA 섹션

#### Step 2: AI 매칭 폼 설정
- `src/data/matching-options.ts` 수정
  - 연령별 관심부위 옵션
  - 우선순위 태그 매핑
- `src/data/reviews/` 후기 데이터 추가

#### Step 3: PHP 연동
- `form_update_tvlanding02.php` 수정
  - `$wr_5` 값 변경 (랜딩 키)
  - `$wr_10` 값 변경 (구분자)
- React에서 폼 액션 URL 변경

#### Step 4: 광고 태그 추가
- `index.html`에 GTM, Facebook Pixel 등 추가

#### Step 5: 빌드 및 배포
```bash
npm run build
```

#### Step 6: 테스트
- 전체 플로우 테스트
- 에러 로그 확인 (F12 → Console)
- DB 저장 확인

### 9.3 자동화 팁

#### package.json에 스크립트 추가
```json
{
  "scripts": {
    "build": "vite build",
    "build:landing": "cd C:/Users/USER/Desktop/landing02 && npm run build",
    "build:result": "cd C:/Users/USER/Desktop/publish/resultpage && npm run build",
    "build:all": "npm run build:landing && npm run build:result"
  }
}
```

#### FTP 업로드 자동화 (선택)
- FileZilla CLI 또는 Node.js ftp 패키지 사용
- `.env` 파일에 FTP 정보 저장

---

## 10. 참고 자료

### 10.1 중요 파일 위치

```
핵심 컴포넌트:
- src/components/matching/index.tsx          # 메인 매칭 로직
- src/components/matching/steps/Step5Analysis.tsx  # 게이트 화면
- src/utils/paths.ts                         # 경로 유틸리티

후기 데이터:
- src/data/reviews/20y-a.ts                  # 20대 A타입
- src/data/reviews/30y-a.ts                  # 30대 A타입
- src/data/reviews/40y-a.ts                  # 40대 A타입
- src/data/reviews/50y-ab.ts                 # 50대 AB타입

PHP 백엔드:
- C:\Users\USER\Desktop\publish\inc\form_update_tvlanding.php
- C:\Users\USER\Desktop\publish\inc\verify_token_tvlanding.php
- C:\Users\USER\Desktop\publish\inc\success_tvlanding.php
```

### 10.2 디버깅 로그

#### 콘솔 로그 위치
```typescript
// Step5Analysis.tsx (이미지 로딩 디버깅)
console.log('[Step5] Before image:', beforeImg);
console.log('[Step5] After image:', afterImg);

// AccessGuard.tsx (토큰 검증 디버깅)
console.error('토큰 검증 오류:', error);
```

#### 프로덕션 빌드 시 제거
```bash
# console.log 제거 후 재빌드
npm run build
```

---

## 📞 문제 발생 시 체크 포인트

1. **이미지가 안 보일 때**
   - F12 → Network 탭에서 이미지 URL 확인
   - `public/` 접두사 있는지 확인
   - `getAssetPath()` 적용 여부 확인

2. **토큰 검증 실패 시**
   - F12 → Console에서 에러 메시지 확인
   - DB 테이블 존재 확인
   - 토큰 만료 시간 확인 (10분)

3. **PHP 500 에러 시**
   - PHP 에러 로그 확인 (`/www/error_log`)
   - `common.php` 경로 확인
   - DB 연결 확인

4. **빌드 실패 시**
   - `node_modules` 삭제 후 `npm install` 재실행
   - `package-lock.json` 삭제 후 재설치
   - Node.js 버전 확인 (v18 이상 권장)

---

## ✅ 최종 체크리스트

- [ ] 모든 이미지에 `getAssetPath()` 적용
- [ ] `vite.config.ts`의 `base` 경로 정확
- [ ] 광고 태그 삽입 완료
- [ ] PHP 파일 경로 정확 (`/common.php`)
- [ ] DB 테이블 생성 완료
- [ ] FTP 업로드 완료
- [ ] 전체 플로우 테스트 완료
- [ ] 토큰 보안 작동 확인
- [ ] `setup_tokens_table.php` 삭제

---

## 📝 버전 관리

### v1.0.0 (2025-12-19)
- 초기 배포
- AI 매칭 시스템 구현
- 일회용 토큰 보안 적용
- 광고 태그 통합

---

**작성자**: Claude AI
**프로젝트 기간**: 2025-12-19
**다음 랜딩 제작 시 이 문서를 참고하세요!**
