// 위자드 상태
let currentStep = 1;
const totalSteps = 6;
const wizardData = {};

// 위자드 시작
function startWizard() {
    currentStep = 1;
    showScreen('wizard-screen');
    updateWizardUI();
}

// 다음 단계
function nextStep() {
    // 현재 단계 데이터 수집
    if (!collectStepData(currentStep)) {
        return;
    }
    
    // 마지막 단계 (제안서 확인)
    if (currentStep === 5) {
        generateProposalPreview();
        currentStep = 6;
        updateWizardUI();
        return;
    }
    
    // 제안서 확인 후 판독 시작
    if (currentStep === 6) {
        const proposal = document.getElementById('generatedProposal').value;
        localStorage.setItem('n2b_proposal', proposal);
        localStorage.setItem('n2b_wizard_data', JSON.stringify(wizardData));
        analyzeAndShowResults(proposal);
        return;
    }
    
    currentStep++;
    updateWizardUI();
}

// 이전 단계
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
    }
}

// UI 업데이트
function updateWizardUI() {
    // 진행률
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `Step ${currentStep}/${totalSteps}`;
    
    // 단계 표시
    document.querySelectorAll('.wizard-step').forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
    
    // 버튼 표시
    const prevBtn = document.getElementById('prevButton');
    const nextBtn = document.getElementById('nextButton');
    
    prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    
    if (currentStep === 6) {
        nextBtn.textContent = '🔍 판독 시작';
    } else if (currentStep === 5) {
        nextBtn.textContent = '제안서 확인 →';
    } else {
        nextBtn.textContent = '다음 →';
    }
}

// 단계별 데이터 수집
function collectStepData(step) {
    switch(step) {
        case 1: // 기업 유형
            const companyType = document.querySelector('input[name="companyType"]:checked');
            if (!companyType) {
                alert('기업 유형을 선택해주세요.');
                return false;
            }
            wizardData.companyType = companyType.value;
            break;
            
        case 2: // 기술 분야
            const techFields = Array.from(document.querySelectorAll('input[name="techField"]:checked'))
                .map(input => input.value);
            
            if (techFields.length === 0) {
                alert('최소 1개 이상의 기술 분야를 선택해주세요.');
                return false;
            }
            
            // 기타 선택 시 커스텀 입력
            if (techFields.includes('기타')) {
                const customField = document.getElementById('customField').value.trim();
                if (customField) {
                    techFields[techFields.indexOf('기타')] = customField;
                }
            }
            
            wizardData.techField = techFields.join(', ');
            break;
            
        case 3: // 개발 단계
            const stage = document.querySelector('input[name="stage"]:checked');
            if (!stage) {
                alert('개발 단계를 선택해주세요.');
                return false;
            }
            wizardData.stage = stage.value;
            break;
            
        case 4: // 팀 구성
            const team = Array.from(document.querySelectorAll('input[name="team"]:checked'))
                .map(input => input.value);
            
            if (team.length === 0) {
                alert('최소 1개 이상의 팀 구성을 선택해주세요.');
                return false;
            }
            
            wizardData.team = team.join(', ');
            break;
            
        case 5: // 자금 규모
            const funding = document.querySelector('input[name="funding"]:checked');
            if (!funding) {
                alert('필요한 자금 규모를 선택해주세요.');
                return false;
            }
            wizardData.funding = funding.value;
            break;
    }
    
    return true;
}

// 제안서 미리보기 생성
function generateProposalPreview() {
    const proposal = generateProposal(wizardData);
    document.getElementById('generatedProposal').value = proposal;
}

// 기타 선택 시 커스텀 입력 표시
document.addEventListener('change', function(e) {
    if (e.target.name === 'techField' && e.target.value === '기타') {
        document.getElementById('customFieldInput').style.display = 
            e.target.checked ? 'block' : 'none';
    }
});
