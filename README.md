# 💎 N2B v1.0 - 정책자금 판독기

3초 만에 당신에게 맞는 정책을 찾아드립니다.

## 🎯 주요 기능

### ✅ 5단계 질문 입력 도우미
- 기업 유형 선택
- 기술 분야 선택
- 개발 단계 선택
- 팀 구성 선택
- 자금 규모 선택

### ✅ 자동 제안서 생성
- 질문 답변을 기반으로 제안서 자동 작성
- NOT-BUT-BECAUSE 구조
- 수정 가능

### ✅ AI 정책 매칭
- 10개 정책 데이터베이스
- 키워드 기반 매칭
- 위자드 데이터 활용
- TOP 3 추천

### ✅ 상세 결과 표시
- 매칭률 %
- 지원금액
- 신청마감일
- 관련 키워드

## 📁 파일 구조

```
n2b-v1/
├── index.html          # 메인 페이지
├── css/
│   └── style.css       # 스타일시트
├── js/
│   ├── app.js          # 메인 로직
│   ├── wizard.js       # 질문 위자드
│   ├── generator.js    # 제안서 생성
│   └── matcher.js      # 정책 매칭
├── data/
│   └── policies.json   # 정책 데이터베이스 (10개)
└── README.md
```

## 🚀 로컬 실행

### 1. 파일 다운로드
전체 폴더를 다운로드합니다.

### 2. 로컬 서버 실행
```bash
# Python 3
python -m http.server 8000

# 또는 VS Code Live Server 사용
```

### 3. 브라우저에서 열기
```
http://localhost:8000
```

## 🌐 GitHub Pages 배포

### 1. GitHub 저장소 생성
```bash
git init
git add .
git commit -m "v1.0 초기 버전"
git branch -M main
git remote add origin https://github.com/당신아이디/n2b-v1.git
git push -u origin main
```

### 2. GitHub Pages 활성화
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, Folder: / (root)
4. Save

### 3. 접속
```
https://당신아이디.github.io/n2b-v1/
```

## 📊 데이터베이스 확장

`data/policies.json` 파일에 정책 추가:

```json
{
  "id": 11,
  "name": "신규 정책명",
  "organization": "담당 부처",
  "amount": "최대 X억원",
  "duration": "X년",
  "deadline": "YYYY년 MM월 DD일",
  "keywords": ["키워드1", "키워드2"],
  "url": "https://...",
  "type": "Type2_자금연구",
  "targetCompany": ["스타트업", "중소기업"],
  "targetStage": ["개발중", "시제품완성"],
  "fundingRange": ["3-5억", "5-10억"]
}
```

## 🎨 커스터마이징

### 색상 변경
`css/style.css`에서:
```css
/* 메인 그라데이션 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 원하는 색상으로 변경 */
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### 텍스트 수정
`index.html`에서 원하는 텍스트 수정

## 📈 다음 단계 (v1.5)

- [ ] 회원 시스템
- [ ] 유료 상세 분석
- [ ] 결과 저장 기능
- [ ] 이메일 리포트
- [ ] 선정 확률 예측

## 🐛 버그 리포트

issues 탭에 버그를 리포트해주세요.

## 📝 라이선스

MIT License

## 👨‍💻 개발자

N2B v1.0 - 2025

---

**🎉 v1.0 완성!**

이제 테스트를 시작하세요!
