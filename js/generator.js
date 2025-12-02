// 제안서 자동 생성 (템플릿 기반)
function generateProposal(data) {
    const { companyType, techField, stage, team, funding } = data;
    
    // 기업 유형별 설명
    const companyDesc = {
        '예비창업자': '예비 창업 단계에 있는',
        '스타트업': '창업 2년차의 스타트업으로',
        '중소기업': '중소기업으로서',
        '대학/연구소': '대학 연구팀으로'
    };
    
    // 단계별 설명
    const stageDesc = {
        '아이디어': '혁신적인 아이디어를 보유하고 있으며',
        '개발중': '시제품을 개발 중이며',
        '시제품완성': '시제품이 완성된 상태이며',
        '양산준비': '양산을 준비하는 단계이며',
        '판매중': '이미 제품을 판매하고 있으며'
    };
    
    // NOT 섹션 (현재 상황/문제점)
    let notSection = '';
    if (companyType === '예비창업자' || stage === '아이디어') {
        notSection = `현재 제품 개발 및 사업화를 위한 초기 자금이 부족한 상황입니다. 은행 대출은 담보와 실적 부족으로 어려운 상황이며, `;
    } else if (stage === '개발중' || stage === '시제품완성') {
        notSection = `시제품 개발은 완료되었으나, 양산 및 시장 진입을 위한 추가 개발과 사업화 자금이 필요한 상황입니다. `;
    } else {
        notSection = `사업 확장 및 기술 고도화를 위한 R&D 투자가 필요하지만, 자체 자금만으로는 한계가 있는 상황입니다. `;
    }
    
    // BUT 섹션 (강점)
    let butSection = `우리는 ${techField} 분야의 전문 기술력을 보유하고 있습니다. `;
    
    if (team.includes('박사급')) {
        butSection += `박사급 연구진을 포함한 전문 팀이 구성되어 있으며, `;
    } else if (team.includes('개발자')) {
        butSection += `숙련된 개발팀이 구성되어 있으며, `;
    }
    
    butSection += `${stageDesc[stage]} 기술 경쟁력을 갖추고 있습니다. `;
    
    // BECAUSE 섹션 (목표/비전)
    const fundingDesc = {
        '1억미만': '1억원 미만',
        '1-3억': '1억원에서 3억원',
        '3-5억': '3억원에서 5억원',
        '5-10억': '5억원에서 10억원',
        '10억이상': '10억원 이상'
    };
    
    let becauseSection = `향후 ${fundingDesc[funding]} 규모의 R&D 지원을 통해 기술 개발을 완성하고, `;
    
    if (stage === '아이디어' || stage === '개발중') {
        becauseSection += `제품 출시 및 시장 진입을 목표로 하고 있습니다. `;
    } else {
        becauseSection += `시장 확대 및 매출 성장을 목표로 하고 있습니다. `;
    }
    
    becauseSection += `이를 통해 일자리 창출 및 관련 산업 생태계 활성화에 기여하고자 합니다.`;
    
    // 최종 제안서 조합
    const proposal = `우리는 ${companyDesc[companyType]} ${techField} 분야에서 활동하고 있습니다.

${notSection}

${butSection}

${becauseSection}

주요 기술 분야: ${techField}
현재 단계: ${stage}
팀 구성: ${team}
필요 자금: ${fundingDesc[funding]}`;
    
    return proposal;
}

// Claude API를 사용한 고급 제안서 생성 (선택사항)
async function generateProposalWithAI(data) {
    try {
        const prompt = `다음 정보로 정책자금 신청을 위한 제안서를 작성해주세요 (300-500자):

기업 유형: ${data.companyType}
기술 분야: ${data.techField}
개발 단계: ${data.stage}
팀 구성: ${data.team}
필요 자금: ${data.funding}

NOT-BUT-BECAUSE 구조로 작성하되:
- NOT: 현재 문제/부족한 점
- BUT: 우리의 강점/기술력
- BECAUSE: 지원이 필요한 이유와 비전

정책자금 신청서 톤으로 전문적이고 구체적으로 작성해주세요.`;

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                messages: [{
                    role: "user",
                    content: prompt
                }]
            })
        });
        
        const result = await response.json();
        return result.content[0].text;
    } catch (error) {
        console.error('AI 생성 실패:', error);
        // 실패 시 템플릿 기반으로 폴백
        return generateProposal(data);
    }
}
