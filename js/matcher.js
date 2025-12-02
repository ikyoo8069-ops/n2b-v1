// 정책 데이터베이스 (실제로는 policies.json에서 로드)
let policiesDatabase = [];

// 정책 DB 로드
async function loadPolicies() {
    try {
        const response = await fetch('data/policies.json');
        policiesDatabase = await response.json();
        console.log('정책 DB 로드 완료:', policiesDatabase.length + '개');
    } catch (error) {
        console.error('정책 DB 로드 실패:', error);
        // 폴백: 하드코딩된 데이터 사용
        policiesDatabase = getDefaultPolicies();
    }
}

// 제안서 분석 및 정책 매칭
function matchPolicies(proposal) {
    const wizardData = JSON.parse(localStorage.getItem('n2b_wizard_data') || '{}');
    
    // 각 정책에 점수 부여
    const scoredPolicies = policiesDatabase.map(policy => {
        let score = 0;
        const reasons = [];
        
        // 1. 키워드 매칭 (최대 50점)
        const proposalLower = proposal.toLowerCase();
        let keywordMatches = 0;
        policy.keywords.forEach(keyword => {
            if (proposalLower.includes(keyword.toLowerCase())) {
                score += 12;  // 8 → 12로 증가
                keywordMatches++;
                reasons.push(`"${keyword}" 키워드 일치`);
            }
        });
        
        // 2. 위자드 데이터 매칭 (최대 60점)
        if (wizardData.companyType && policy.targetCompany) {
            if (policy.targetCompany.includes(wizardData.companyType)) {
                score += 25;  // 20 → 25로 증가
                reasons.push('기업 유형 일치');
            }
        }
        
        if (wizardData.stage && policy.targetStage) {
            if (policy.targetStage.includes(wizardData.stage)) {
                score += 25;  // 20 → 25로 증가
                reasons.push('개발 단계 일치');
            }
        }
        
        if (wizardData.funding && policy.fundingRange) {
            if (policy.fundingRange.includes(wizardData.funding)) {
                score += 25;  // 20 → 25로 증가
                reasons.push('자금 규모 일치');
            }
        }
        
        // 3. 기술 분야 매칭 (보너스 점수 증가)
        if (wizardData.techField) {
            const techFields = wizardData.techField.split(',').map(f => f.trim());
            techFields.forEach(field => {
                policy.keywords.forEach(keyword => {
                    if (field.toLowerCase().includes(keyword.toLowerCase()) ||
                        keyword.toLowerCase().includes(field.toLowerCase())) {
                        score += 8;  // 5 → 8로 증가
                    }
                });
            });
        }
        
        // 4. 기본 점수 보정 (최소 50점 보장)
        if (keywordMatches > 0) {
            score += 20;  // 키워드가 하나라도 있으면 기본 20점
        }
        
        // 점수를 100점 만점으로 정규화
        const normalizedScore = Math.min(100, Math.max(50, score));  // 최소 50점 보장
        
        return {
            ...policy,
            matchRate: normalizedScore,
            matchReasons: reasons
        };
    });
    
    // 점수순으로 정렬하고 상위 3개 반환
    return scoredPolicies
        .sort((a, b) => b.matchRate - a.matchRate)
        .slice(0, 3);
}

// 폴백용 기본 정책 데이터
function getDefaultPolicies() {
    return [
        {
            id: 1,
            name: "산업기술 R&D 지원사업",
            organization: "산업통상자원부",
            amount: "최대 10억원",
            duration: "2-3년",
            deadline: "2025년 2월 28일",
            keywords: ["AI", "제조", "스마트팩토리", "산업", "기술개발"],
            url: "https://www.motie.go.kr",
            type: "Type2_자금연구",
            targetCompany: ["스타트업", "중소기업"],
            targetStage: ["개발중", "시제품완성", "양산준비"],
            fundingRange: ["3-5억", "5-10억", "10억이상"]
        },
        {
            id: 2,
            name: "중소기업 기술개발 지원사업",
            organization: "중소벤처기업부",
            amount: "최대 5억원",
            duration: "2년",
            deadline: "2025년 3월 15일",
            keywords: ["기술개발", "제조", "중소기업", "혁신"],
            url: "https://www.mss.go.kr",
            type: "Type2_자금연구",
            targetCompany: ["스타트업", "중소기업"],
            targetStage: ["개발중", "시제품완성"],
            fundingRange: ["1-3억", "3-5억", "5-10억"]
        },
        {
            id: 3,
            name: "AI 기술개발 지원사업",
            organization: "과학기술정보통신부",
            amount: "최대 5억원",
            duration: "2년",
            deadline: "2025년 2월 20일",
            keywords: ["AI", "머신러닝", "딥러닝", "인공지능"],
            url: "https://www.msit.go.kr",
            type: "Type2_자금연구",
            targetCompany: ["스타트업", "중소기업", "대학/연구소"],
            targetStage: ["개발중", "시제품완성"],
            fundingRange: ["3-5억", "5-10억"]
        }
    ];
}

// 페이지 로드 시 정책 DB 로드
document.addEventListener('DOMContentLoaded', function() {
    loadPolicies();
});
