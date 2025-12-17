# 섹션 관리 가이드 (Section Management Guide)

## 📋 목적
모든 코드 작업 시 수정하기 용이하게 **영역을 명확히 구분**하여 섹션으로 나누어 관리합니다.

---

## 🎯 핵심 원칙

### 1. **명확한 섹션 주석 사용**
```tsx
{/* ========== 섹션 1: 설명 ========== */}
<section className="...">
  {/* 내용 */}
</section>

{/* ========== 섹션 2: 설명 ========== */}
<section className="...">
  {/* 내용 */}
</section>
```

### 2. **시맨틱 HTML 태그 활용**
- `<section>`: 주요 콘텐츠 영역
- `<header>`: 헤더 영역
- `<main>`: 메인 콘텐츠
- `<footer>`: 푸터 영역
- `<div>`: 레이아웃 컨테이너 (섹션 내부)

### 3. **일관된 클래스 구조**
```tsx
<section className="w-full py-{spacing}">
  <div className="w-full max-w-{size} mx-auto px-4">
    {/* 실제 컨텐츠 */}
  </div>
</section>
```

---

## 📐 현재 적용된 섹션 구조 예시

### **ResultPage (c:\Users\USER\Desktop\landing02\src\components\matching\steps\Step6Result.tsx)**

```tsx
{/* ========== 섹션 1: 상담 신청 완료 ========== */}
<section className="w-full text-white text-center py-20 md:py-28"
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
  <div className="w-full max-w-4xl mx-auto px-4">
    {/* 체크 아이콘 */}
    {/* 메인 메시지 */}
    {/* 특별 선물 안내 */}
  </div>
</section>

{/* ========== 섹션 2: 매칭 결과 헤더 및 알림 ========== */}
<section className="w-full py-8 md:py-12">
  <div className="w-full max-w-6xl mx-auto px-4">
    {/* 매칭 결과 헤더 */}
    {/* 윤곽수술 알림 */}
  </div>
</section>

{/* ========== 섹션 3: 리뷰 카드 ========== */}
<section className="w-full pb-8 md:pb-12">
  <div className="w-full max-w-6xl mx-auto px-4">
    {/* Swiper 캐러셀 */}
  </div>
</section>

{/* ========== 섹션 4: 하단 액션 버튼 ========== */}
<section className="w-full py-12 md:py-16">
  <div className="w-full max-w-6xl mx-auto px-4">
    {/* 다시 매칭하기 / 전문가 상담 받기 버튼 */}
  </div>
</section>
```

---

## 🔍 섹션 내부 요소 주석 가이드

### **서브 섹션 주석**
```tsx
{/* 체크 아이콘 */}
<div className="inline-flex items-center justify-center ...">
  {/* SVG */}
</div>

{/* 메인 메시지 */}
<h1 className="...">
  {/* 텍스트 */}
</h1>
```

### **조건부 렌더링 주석**
```tsx
{/* 윤곽수술 알림 */}
{userData.hasContouringExp && (
  <div className="bg-orange-50 ...">
    {/* 경고 메시지 */}
  </div>
)}
```

---

## 📊 스페이싱 가이드

### **섹션 간 간격**
- **Section 1 (Hero)**: `py-20 md:py-28` (넉넉한 상하 여백)
- **Section 2 (Header)**: `py-8 md:py-12` (보통 여백)
- **Section 3 (Content)**: `pb-8 md:pb-12` (하단만 여백, 섹션2와 자연스럽게 연결)
- **Section 4 (CTA)**: `py-12 md:py-16` (강조를 위한 큰 여백)

### **컨테이너 최대 너비**
- **Hero/Full-width**: `max-w-4xl` (좁은 중앙 정렬)
- **Content**: `max-w-6xl` (넓은 콘텐츠 영역)

---

## ✅ 체크리스트

새로운 컴포넌트나 페이지를 만들 때:

- [ ] 각 섹션에 명확한 주석 추가 (`{/* ========== 섹션 N: 설명 ========== */}`)
- [ ] `<section>` 태그로 시맨틱하게 감싸기
- [ ] 일관된 컨테이너 구조 사용 (`w-full` → `max-w-{size} mx-auto px-4`)
- [ ] 반응형 스페이싱 적용 (`py-8 md:py-12`)
- [ ] 섹션 내부 요소에도 간단한 주석 추가
- [ ] 관련 기능끼리 그룹핑하여 하나의 섹션으로 구성

---

## 🚀 이점

1. **유지보수 용이**: 어디를 수정해야 할지 한눈에 파악
2. **협업 효율**: 다른 개발자가 코드 구조를 빠르게 이해
3. **리팩토링 간편**: 섹션 단위로 이동/삭제/수정 가능
4. **일관성 유지**: 프로젝트 전체에 동일한 패턴 적용

---

## 📝 작성일
2025-12-17

## 📌 관련 파일
- `src/components/matching/steps/Step6Result.tsx` - 4개 섹션 구조 예시
- `src/pages/ResultPage.tsx` - 페이지 레벨 구조
- `src/components/layout/TopHeader.tsx` - 고정 헤더 구조

---

**💡 Tip**: 새로운 기능 추가 시 항상 "이 기능은 어느 섹션에 속하는가?"를 먼저 고민하고, 필요하면 새로운 섹션을 만드세요!
