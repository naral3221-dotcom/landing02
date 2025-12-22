# 프로젝트 초기화

현재 프로젝트에 AI 팀 시스템을 설정합니다.

## 실행 내용

다음 파일들을 `C:\Lacal_workspace\project\AGENT\project-template\`에서 현재 프로젝트로 복사하세요:

1. **`.mcp.json`** - AI 팀 (GPT + Gemini) 서버 연결
2. **`.claude/CLAUDE.md`** - 코딩 규칙 (자동 적용)
3. **`.claude/commands/`** - 슬래시 커맨드 (/ai 등)
4. **`.claude/agents/`** - 전문 에이전트

## 복사 명령어

```bash
xcopy "C:\Lacal_workspace\project\AGENT\project-template\.claude" ".claude\" /E /I /H /Y
copy "C:\Lacal_workspace\project\AGENT\project-template\.mcp.json" ".\" /Y
```

## 설정 완료 후 사용 가능한 기능

| 기능 | 사용법 | 비용 |
|------|--------|------|
| 일반 작업 | 그냥 요청 | 무료 |
| 전문 에이전트 | 자동 호출됨 | 무료 |
| AI 팀 리뷰 | `/ai 리뷰 [파일]` | 유료 |
| AI 팀 디버그 | `/ai 디버그 [에러]` | 유료 |
| AI 팀 랜딩 | `/ai 랜딩 [설명]` | 유료 |
