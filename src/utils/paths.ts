// Vite base URL을 고려한 경로 생성 유틸리티
export const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  // 이미 base가 포함되어 있으면 그대로 반환
  if (path.startsWith(base)) {
    return path;
  }
  // /로 시작하면 제거
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // base와 path 결합 (base가 /로 끝나면 제거)
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${cleanBase}/${cleanPath}`;
};
