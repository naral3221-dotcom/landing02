# Tailwind CSS JIT 컴파일러 트러블슈팅 가이드

## 📅 작성일
2025-12-17

## 🎯 발생한 문제

### 증상
- React 컴포넌트에서 `bg-blue-600` 같은 Tailwind 유틸리티 클래스가 적용되지 않음
- 개발자 도구 확인 시 `background-color: rgba(0, 0, 0, 0)` (투명)으로 표시됨
- 같은 파일 내 다른 곳에서는 `bg-blue-600`이 정상 작동함

### 발생 상황
```tsx
// Step6Result.tsx Line 136
<div className="bg-blue-600 px-5 py-4 ...">
  {/* 파란 배경이 적용되지 않음 */}
</div>
```

## 🔍 원인 분석

### Root Cause: Tailwind CSS v4 JIT 컴파일러의 동작 방식

**Tailwind CSS v4는 JIT (Just-In-Time) 컴파일 방식을 사용합니다:**
- 실제로 **코드에서 사용된 클래스만** CSS 파일에 생성
- 초기 빌드 시점에 전체 코드를 스캔하여 사용된 클래스 목록 생성
- 사용되지 않은 클래스는 최종 CSS에 포함되지 않음

### 문제가 발생한 시나리오

1. **초기 코드 상태** (개발 시작 시)
   ```tsx
   <div className="bg-white px-5 py-4 ...">  // bg-white 사용
   ```
   - Tailwind는 `bg-white` 클래스를 index.css에 생성
   - `bg-blue-600`은 코드에 없으므로 생성하지 않음

2. **코드 수정** (나중에 변경)
   ```tsx
   <div className="bg-blue-600 px-5 py-4 ...">  // bg-blue-600으로 변경
   ```
   - HMR (Hot Module Replacement)로 컴포넌트는 리로드됨
   - **하지만** Tailwind의 JIT 컴파일러는 전체 재스캔을 하지 않음
   - 결과: `bg-blue-600` 클래스가 index.css에 존재하지 않음

3. **확인된 증거**
   ```bash
   # index.css 분석 결과
   Line 95:  --color-blue-600: oklch(.546 .245 262.881);  ✓ CSS 변수는 정의됨
   Line 1579: .bg-blue-600/80 { ... }                    ✓ opacity variant 존재
   Line 2348: .text-blue-600 { ... }                     ✓ text-blue-600 존재
   Line 3134: .data-[state=checked]:bg-blue-600 { ... }  ✓ conditional variant 존재

   ❌ BUT: .bg-blue-600 { background-color: ... } 클래스는 존재하지 않음!
   ```

### 왜 다른 곳에서는 작동했나?

같은 파일의 Line 259, 288에서 `bg-blue-600`이 정상 작동한 이유:
- 해당 라인들은 **초기 개발 시점부터** `bg-blue-600`을 사용했음
- Tailwind가 초기 스캔 시 해당 클래스들을 발견하여 생성했음
- 하지만 **standalone `.bg-blue-600` 클래스**는 생성되지 않았고, 특정 조건부 variant만 존재했음

## ✅ 해결 방법

### Solution 1: Inline Style 사용 ⭐ 즉시 해결
```tsx
<div style={{ backgroundColor: '#2563eb' }} className="px-5 py-4 ...">
```

**장점:**
- 즉시 적용, 서버 재시작 불필요
- CSS 클래스 생성 여부와 무관하게 100% 작동
- TypeScript type safety

**단점:**
- Tailwind 유틸리티 클래스 대신 inline style 사용
- 재사용성이 떨어짐

**사용 시기:**
- 긴급하게 수정이 필요할 때
- Tailwind 클래스가 생성되지 않는 문제를 우회해야 할 때

### Solution 2: Dev Server 재시작 (클린한 방법)
```bash
# 현재 dev server 중지 (Ctrl+C)
npm run dev
```

**장점:**
- Tailwind가 전체 코드를 재스캔하여 모든 클래스 생성
- 표준 Tailwind 클래스 사용 가능
- 가장 깔끔한 해결책

**단점:**
- 서버 재시작 필요 (약간의 시간 소요)
- 개발 중단

**사용 시기:**
- 새로운 Tailwind 클래스를 여러 개 추가한 후
- 이상한 스타일 이슈가 지속될 때

### Solution 3: Arbitrary Value 사용
```tsx
<div className="bg-[#2563eb] px-5 py-4 ...">
```

**장점:**
- Tailwind 문법 사용
- 즉시 적용

**단점:**
- JIT 컴파일러가 arbitrary value를 제대로 처리하지 못할 수 있음 (이번 케이스에서 실패)
- 표준 클래스 이름이 아님

**사용 시기:**
- 일회성 커스텀 값이 필요할 때
- 하지만 이번처럼 실패할 수 있으므로 주의

### Solution 4: CSS Variable 사용
```tsx
<div style={{ backgroundColor: 'var(--color-blue-600)' }} className="px-5 py-4 ...">
```

**장점:**
- Tailwind의 CSS 변수 활용
- Design system 일관성 유지

**단점:**
- inline style 사용
- 약간 장황함

## 🚨 재발 방지 체크리스트

### 개발 중
- [ ] 새로운 Tailwind 색상/유틸리티 클래스를 추가할 때는 **dev server를 재시작**하는 습관 들이기
- [ ] 기존에 없던 Tailwind 클래스를 처음 사용할 때 브라우저에서 제대로 적용되는지 **즉시 확인**
- [ ] 스타일이 적용되지 않으면 개발자 도구로 `background-color: rgba(0, 0, 0, 0)` 같은 투명 값이 있는지 확인

### 문제 발생 시 디버깅 순서
1. **브라우저 개발자 도구** → Elements → Computed Styles 확인
   - `background-color`, `color` 등의 실제 적용값 확인
   - 투명(`rgba(0,0,0,0)`) 또는 예상과 다른 값인지 체크

2. **index.css 파일 검색**
   ```bash
   # 해당 클래스가 생성되었는지 확인
   grep "\.bg-blue-600 " src/index.css
   ```

3. **해결 시도 순서**
   - Quick Fix: inline style 적용 → 즉시 해결
   - Long-term: dev server 재시작 → 표준 Tailwind 클래스로 복구

### 코드 리뷰 시
- [ ] inline style (`style={{ ... }}`)이 있다면 왜 사용했는지 확인
- [ ] Tailwind 클래스 대신 inline style을 쓴 이유가 이 이슈 때문인지 체크
- [ ] 가능하면 dev server 재시작 후 표준 Tailwind 클래스로 변경

## 📊 발생 빈도 & 영향도

**발생 빈도:** 중 (Medium)
- 초기 개발 단계에서 디자인을 많이 변경할 때 자주 발생
- 특히 `bg-white` → `bg-blue-600` 같은 배경색 변경 시

**영향도:** 높음 (High)
- 스타일이 전혀 적용되지 않아 UI가 깨짐
- 흰색 텍스트 on 흰색 배경 → 텍스트가 보이지 않음
- 사용자 경험에 직접적인 영향

## 🔧 프로젝트 설정 정보

### Tailwind CSS 버전
```json
// package.json
{
  "tailwindcss": "*"  // latest (v4.x)
}
```

### 빌드 도구
- **Vite** 6.3.5
- HMR (Hot Module Replacement) 지원
- Tailwind CSS는 `@import "tailwindcss"` 방식으로 사용 (v4 스타일)

### CSS 파일 구조
```
src/
├── styles/
│   └── globals.css      # Tailwind 설정, CSS 변수 정의
└── index.css            # 컴파일된 Tailwind CSS (자동 생성)
```

## 📝 관련 파일

### 문제가 발생했던 파일
- `c:\Users\USER\Desktop\landing02\src\components\matching\steps\Step6Result.tsx`
  - Line 136: 헤더 배경색 (`bg-blue-600` → `style={{ backgroundColor: '#2563eb' }}`)

### 참고 파일
- `src/styles/globals.css` - Tailwind 설정 및 CSS 변수
- `src/index.css` - 컴파일된 CSS (Tailwind가 자동 생성)
- `package.json` - 의존성 버전 정보

## 💡 추가 팁

### Tailwind v4의 특징
- **CSS-first configuration**: `tailwind.config.js` 대신 CSS 파일에서 설정
- **Lightning CSS**: 더 빠른 컴파일 속도
- **더 엄격한 JIT**: 사용되지 않는 클래스를 더 적극적으로 제거

### Hot Reload vs Full Restart
- **HMR (Hot Module Replacement)**: 컴포넌트만 리로드, Tailwind 재스캔 안 함
- **Dev Server Restart**: 전체 재시작, Tailwind가 모든 파일 재스캔

### 유사한 문제가 발생할 수 있는 경우
1. 새로운 커스텀 색상 추가 후
2. `hover:`, `focus:` 같은 variant를 처음 사용할 때
3. 외부 컴포넌트 라이브러리에서 Tailwind 클래스를 사용할 때
4. 동적으로 클래스 이름을 생성할 때 (❌ 피해야 함)
   ```tsx
   // 🚫 잘못된 방법 - Tailwind가 스캔 못함
   const bgColor = `bg-${color}-600`;

   // ✅ 올바른 방법 - 전체 클래스명 작성
   const bgColor = color === 'blue' ? 'bg-blue-600' : 'bg-red-600';
   ```

## 🎓 교훈

1. **Tailwind JIT는 똑똑하지만 완벽하지 않다**
   - 런타임에 새로운 클래스가 필요하면 dev server 재시작 필요

2. **Inline style은 fallback으로 유용하다**
   - 긴급 상황에서 빠른 해결책
   - 하지만 남발하면 Tailwind의 장점을 잃음

3. **문제 재현 가능성을 문서화하라**
   - 이런 문서가 있으면 같은 문제 발생 시 10분 안에 해결 가능
   - 팀원들도 같은 실수를 피할 수 있음

---

**✅ 이 문서를 참고하면 동일한 Tailwind JIT 이슈를 빠르게 해결할 수 있습니다!**
