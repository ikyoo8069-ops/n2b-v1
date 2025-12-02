// 화면 전환 함수들
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

function showLanding() {
    showScreen('landing-screen');
}

function showMethodSelect() {
    showScreen('method-screen');
}

function showDirectInput() {
    showScreen('direct-screen');
}

function showAnalyzing() {
    showScreen('analyzing-screen');
    
    // 분석 단계 애니메이션
    setTimeout(() => {
        const steps = document.querySelectorAll('.analyzing-step');
        steps[2].classList.remove('active');
        steps[2].textContent = '✓ 정책 매칭 완료';
        
        const newStep = document.createElement('div');
        newStep.className = 'analyzing-step active';
        newStep.textContent = '⏳ 결과 생성 중...';
        document.querySelector('.analyzing-steps').appendChild(newStep);
        
        setTimeout(() => {
            showResults();
        }, 1500);
    }, 2000);
}

function showResults() {
    showScreen('result-screen');
}

// 샘플 로드
function loadSample() {
    const sampleProposal = `우리 회사는 창업 2년차 AI 스타트업입니다.

AI 기반 스마트 제조 솔루션을 개발하고 있으며, 딥러닝을 활용한 실시간 품질 예측 기술을 보유하고 있습니다.

현재 시제품이 완성된 상태이며, 기존 대비 불량률 30% 감소, 생산성 20% 향상을 목표로 합니다.

팀은 CEO와 개발자 3명으로 구성되어 있으며, AI 및 제조 분야의 전문성을 보유하고 있습니다.

향후 양산 및 사업화를 위해 3-5억원 규모의 R&D 지원이 필요한 상황입니다.`;

    document.getElementById('directProposal').value = sampleProposal;
    showDirectInput();
}

// 직접 입력에서 분석 시작
function startAnalysis() {
    const proposal = document.getElementById('directProposal').value.trim();
    
    if (proposal.length < 100) {
        alert('제안서를 최소 100자 이상 입력해주세요.');
        return;
    }
    
    // 로컬 스토리지에 저장
    localStorage.setItem('n2b_proposal', proposal);
    
    // 분석 시작
    analyzeAndShowResults(proposal);
}

// 분석 및 결과 표시
function analyzeAndShowResults(proposal) {
    showAnalyzing();
    
    // 정책 매칭 수행
    const matches = matchPolicies(proposal);
    
    // 결과 화면에 표시
    setTimeout(() => {
        displayResults(matches);
    }, 3500);
}

// 결과 표시
function displayResults(matches) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';
    
    matches.forEach((match, index) => {
        const rank = ['🥇', '🥈', '🥉'][index];
        
        const card = document.createElement('div');
        card.className = 'policy-card';
        card.innerHTML = `
            <div class="policy-header">
                <div class="policy-title">
                    <span class="policy-rank">${rank}</span>
                    <h3>${match.name}</h3>
                    <div class="org">${match.organization}</div>
                </div>
                <div class="match-score">
                    <div class="score">${match.matchRate}%</div>
                    <div class="label">매칭률</div>
                </div>
            </div>
            
            <div class="policy-info">
                <div class="info-item">
                    <div class="label">지원금액</div>
                    <div class="value">${match.amount}</div>
                </div>
                <div class="info-item">
                    <div class="label">지원기간</div>
                    <div class="value">${match.duration}</div>
                </div>
                <div class="info-item">
                    <div class="label">신청마감</div>
                    <div class="value">${match.deadline}</div>
                </div>
            </div>
            
            <div class="policy-keywords">
                ${match.keywords.map(k => `<span class="keyword">${k}</span>`).join('')}
            </div>
            
            <div class="policy-action">
                <button class="detail-button" onclick="window.open('${match.url}', '_blank')">
                    상세 정보 보기 →
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// 결과 공유
function shareResult() {
    const url = window.location.href;
    const text = '정책자금 판독기로 나에게 맞는 정책을 찾았어요!';
    
    if (navigator.share) {
        navigator.share({
            title: '정책자금 판독기',
            text: text,
            url: url
        }).catch(err => console.log('공유 실패:', err));
    } else {
        // 클립보드에 복사
        navigator.clipboard.writeText(url).then(() => {
            alert('링크가 복사되었습니다!');
        });
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('N2B v1.0 시작!');
});
