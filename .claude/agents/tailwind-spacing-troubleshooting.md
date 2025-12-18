# Tailwind CSS Spacing 트러블슈팅 가이드

## 작성일
2025-12-18

## 발생한 문제

### 증상
- `mt-4` (margin-top) 클래스가 적용되지 않음
- 개발자 도구에서 확인 시 `margin-top: 0px`로 표시됨
- 부모 요소의 `space-y-*` 클래스가 자식 요소의 margin을 덮어씀

### 발생 상황
```tsx
// Step4Question.tsx
<div className="space-y-10">  {/* 부모: 자식 간 40px 간격 */}
    <div className="space-y-4">Q1 영역</div>
    <div className="w-full h-px bg-slate-100" />  {/* 구분선 */}
    <div className="space-y-4 mt-4">  {/* mt-4가 무시됨! */}
        Q2 영역
    </div>
</div>
```

## 원인 분석

### Root Cause: Tailwind의 `space-y-*` 동작 방식

**`space-y-*`는 자식 요소들 사이에 margin을 자동으로 주입합니다:**
```css
/* space-y-10의 실제 CSS */
.space-y-10 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(2.5rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(2.5rem * var(--tw-space-y-reverse));
}
```

**문제점:**
- `space-y-10`이 자식 요소의 `margin-top`을 `40px`로 강제 설정
- 자식 요소에 `mt-4`(16px)를 설정해도 `space-y-10`의 40px가 우선 적용됨
- CSS Specificity가 동일하지만, 생성 순서상 `space-y-*`가 나중에 적용됨

### 개발자 도구에서 확인된 증거
```
계산됨 (Computed):
margin-bottom: 16px    ← mb-4 적용됨 (부모 space-y와 충돌 안함)
margin-top: 0px        ← mt-4 무시됨 (부모 space-y가 덮어씀)
```

## 해결 방법

### Solution 1: `!important` 플래그 사용 (즉시 해결)
```tsx
<div className="w-full h-px bg-slate-100 !my-6" />
```

**장점:**
- Tailwind의 `!` prefix로 `!important` 적용
- `space-y-*`의 margin을 강제로 오버라이드
- 간단하고 빠른 해결

**단점:**
- `!important` 남용은 CSS 유지보수성 저하
- 다른 곳에서 또 오버라이드하려면 복잡해짐

**사용 시기:**
- 부모의 `space-y-*`를 유지하면서 특정 자식만 다른 간격이 필요할 때

### Solution 2: `space-y-*` 대신 개별 margin 사용
```tsx
// Before
<div className="space-y-10">
    <div>Q1</div>
    <div>구분선</div>
    <div>Q2</div>
</div>

// After
<div>
    <div className="mb-10">Q1</div>
    <div className="my-6">구분선</div>
    <div>Q2</div>
</div>
```

**장점:**
- 각 요소의 간격을 개별적으로 제어 가능
- CSS 충돌 없음

**단점:**
- 코드가 더 장황해짐
- 일관성 있는 간격 유지가 어려움

### Solution 3: padding-top 사용
```tsx
<div className="space-y-4 !pt-4">
```

**장점:**
- margin 대신 padding으로 내부 여백 추가
- `space-y-*`와 충돌하지 않음

**단점:**
- 배경색이 있는 요소에는 다르게 보일 수 있음
- margin과 padding의 의미가 다름

### Solution 4: space-y-* 완전 제거 + 개별 margin ⭐ 추천
```tsx
// Before: space-y-8이 자식들의 margin을 강제 설정
<div className="space-y-8">
    <div className="space-y-5">Q1</div>
    <div className="py-6"><div className="h-px bg-slate-200" /></div>
    <div className="space-y-5">Q2</div>
</div>

// After: 부모 space-y 제거 + 각 섹션에 개별 margin 적용
<div>
    <div className="space-y-5 mb-6">Q1</div>
    <div className="py-6"><div className="h-px bg-slate-200" /></div>
    <div className="space-y-5 mt-6">Q2</div>
</div>
```

**이번 케이스의 최종 해결:**
- 부모의 `space-y-8` 완전 제거
- Q1 섹션에 `mb-6` (하단 24px)
- 구분선 wrapper에 `py-6` (상하 24px padding)
- Q2 섹션에 `mt-6` (상단 24px)
- 총 여백: Q1과 Q2 사이 약 72px의 여유로운 간격

### Solution 5: Wrapper Div + Padding 패턴 ⭐⭐ 가장 추천
```tsx
// 구분선 + 여백을 하나의 wrapper로 감싸기
<div className="py-4">
    <div className="w-full h-px bg-slate-200" />
</div>
```

**장점:**
- padding 값만 바꾸면 위아래 여백을 한번에 조절 가능
- `py-2`, `py-4`, `py-6`, `py-8` 등 원하는 대로 쉽게 변경
- `space-y-*`나 `!important` 충돌 걱정 없음
- 직관적이고 유지보수하기 편함

**사용 예시:**
```tsx
{/* 좁은 간격 */}
<div className="py-2">
    <div className="w-full h-px bg-slate-200" />
</div>

{/* 중간 간격 */}
<div className="py-4">
    <div className="w-full h-px bg-slate-200" />
</div>

{/* 넓은 간격 */}
<div className="py-8">
    <div className="w-full h-px bg-slate-200" />
</div>
```

**사용 시기:**
- 섹션 구분선이 필요할 때
- 위아래 여백을 손쉽게 조절하고 싶을 때
- 부모의 spacing 유틸리티와 충돌을 피하고 싶을 때

## 재발 방지 체크리스트

### 개발 중
- [ ] `space-y-*` 또는 `space-x-*` 사용 시, 자식 요소에 개별 margin이 필요한지 미리 확인
- [ ] 자식 요소의 margin을 커스텀해야 한다면 `!` prefix 사용 고려
- [ ] 복잡한 레이아웃에서는 `space-*` 대신 개별 margin 사용 권장

### 문제 발생 시 디버깅 순서
1. **개발자 도구** → Elements → Computed → margin-top/bottom 값 확인
2. **부모 요소**에 `space-y-*` 또는 `space-x-*`가 있는지 확인
3. **해결책 선택:**
   - Quick Fix: `!mt-*` 또는 `!my-*` 사용
   - Clean Fix: 부모의 `space-*` 제거 후 개별 margin 적용

## 관련 Tailwind 클래스 정리

### Space 유틸리티
| 클래스 | 효과 |
|--------|------|
| `space-y-4` | 자식 간 세로 16px 간격 |
| `space-x-4` | 자식 간 가로 16px 간격 |
| `space-y-reverse` | 역순 정렬 시 사용 |

### Important Modifier
| 클래스 | 효과 |
|--------|------|
| `!mt-4` | `margin-top: 1rem !important` |
| `!my-6` | `margin-top/bottom: 1.5rem !important` |
| `!pt-4` | `padding-top: 1rem !important` |

## 이번 프로젝트 적용 사례

### 파일: Step4Question.tsx
```tsx
// Line 107 - 구분선에 !my-6 적용
<div className="w-full h-px bg-slate-100 !my-6" />

// Q1과 Q2 사이에 추가 여백 확보
// space-y-10 (40px)을 !my-6 (24px)으로 오버라이드
```

## 교훈

1. **`space-y-*`는 편리하지만 유연성이 떨어진다**
   - 모든 자식 요소에 동일한 간격 적용
   - 특정 요소만 다른 간격이 필요하면 `!important` 필요

2. **CSS Specificity 이해가 중요하다**
   - Tailwind의 `space-y-*`와 개별 `mt-*`는 같은 specificity
   - 나중에 생성된 CSS가 우선 적용됨

3. **개발자 도구의 "계산됨" 탭 활용**
   - 실제 적용된 값을 확인하여 어떤 규칙이 우선하는지 파악

---

**이 문서를 참고하면 Tailwind spacing 충돌 이슈를 빠르게 해결할 수 있습니다!**
