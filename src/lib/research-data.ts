export type ResearchPaper = {
  slug: string;
  category: "AI" | "HCI" | "Biology" | "Psychology";
  categoryKo: string;
  accent: string;
  eyebrow: string;
  title: string;
  titleKo: string;
  authors: string;
  source: string;
  year: string;
  readTime: string;
  difficulty: "입문" | "중급" | "심화";
  thesis: string;
  abstract: string;
  keywords: string[];
  keyPoints: { number: string; title: string; body: string }[];
  method: { label: string; value: string; note: string }[];
  limitation: string;
  question: string;
  quote: string;
  presentationReady: boolean;
  progress: number;
};

export const papers: ResearchPaper[] = [
  {
    slug: "alphafold-3",
    category: "Biology",
    categoryKo: "생명과학",
    accent: "#91c846",
    eyebrow: "이번 주의 논문",
    title: "Accurate structure prediction of biomolecular interactions with AlphaFold 3",
    titleKo: "단백질을 넘어, 생명 분자의 상호작용을 예측하다",
    authors: "Josh Abramson et al.",
    source: "Nature · Vol. 630",
    year: "2024",
    readTime: "12분",
    difficulty: "중급",
    thesis:
      "AlphaFold 3는 단백질 하나의 모양을 맞히는 문제를 넘어, 단백질·DNA·RNA·리간드가 함께 만날 때의 구조를 하나의 모델로 예측한다.",
    abstract:
      "생명 현상은 단일 분자보다 분자 사이의 상호작용에서 일어납니다. 연구진은 확산 기반 구조 생성 방식을 도입해 여러 종류의 생체 분자를 같은 표현 안에서 다뤘고, 다양한 상호작용 예측 벤치마크에서 기존 전문 모델들을 앞서는 결과를 보였습니다.",
    keywords: ["단백질 구조", "확산 모델", "신약 개발", "분자 상호작용"],
    keyPoints: [
      {
        number: "01",
        title: "문제의 범위를 넓혔다",
        body: "단백질 단독 구조가 아니라 DNA, RNA, 작은 분자까지 포함한 복합체를 한 번에 모델링합니다.",
      },
      {
        number: "02",
        title: "구조를 생성한다",
        body: "좌표를 직접 회귀하는 대신, 노이즈에서 분자 구조를 점진적으로 복원하는 확산 모듈을 사용합니다.",
      },
      {
        number: "03",
        title: "활용의 문을 열었다",
        body: "약물 후보와 표적 단백질의 결합을 더 넓은 범위에서 탐색할 수 있는 기반을 제시합니다.",
      },
    ],
    method: [
      { label: "입력", value: "서열 + 화학 구조", note: "여러 분자 유형을 통합 표현" },
      { label: "핵심 모델", value: "Pairformer", note: "분자 간 관계를 반복 업데이트" },
      { label: "생성", value: "Diffusion", note: "노이즈에서 3D 좌표를 복원" },
      { label: "평가", value: "다중 벤치마크", note: "분자 유형별 정확도를 비교" },
    ],
    limitation:
      "정적인 구조 예측은 실제 세포 안에서 일어나는 시간에 따른 변화와 에너지 상태를 모두 설명하지 못합니다. 예측 신뢰도가 낮은 영역을 실험적 사실처럼 받아들이지 않는 해석 기준도 필요합니다.",
    question:
      "‘구조를 잘 맞힌다’는 것이 곧 ‘약이 잘 듣는다’는 뜻은 아니다. 이 둘 사이에는 어떤 검증 단계가 더 필요할까?",
    quote:
      "이 논문의 진짜 변화는 정확도 하나가 아니라, 서로 다른 분자 문제를 같은 언어로 다루기 시작했다는 데 있다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "attention-is-all-you-need",
    category: "AI",
    categoryKo: "인공지능",
    accent: "#2b9ed0",
    eyebrow: "기초가 되는 논문",
    title: "Attention Is All You Need",
    titleKo: "순서를 처리하는 새로운 문법, 트랜스포머",
    authors: "Ashish Vaswani et al.",
    source: "NeurIPS",
    year: "2017",
    readTime: "9분",
    difficulty: "입문",
    thesis:
      "트랜스포머는 순환 구조 없이 어텐션만으로 문장 속 단어 관계를 계산해, 더 효율적인 병렬 학습과 긴 문맥 처리를 가능하게 했다.",
    abstract:
      "기존 번역 모델은 문장을 앞에서부터 차례로 읽는 구조에 크게 의존했습니다. 이 논문은 각 단어가 다른 모든 단어를 직접 참고하게 하고, 여러 관점의 관계를 동시에 학습하는 구조를 제안합니다.",
    keywords: ["Transformer", "Self-attention", "NLP", "병렬 학습"],
    keyPoints: [
      { number: "01", title: "순환을 없앴다", body: "토큰을 순서대로 처리하지 않아 학습을 병렬화할 수 있습니다." },
      { number: "02", title: "관계를 직접 본다", body: "각 토큰이 문장 전체에서 중요한 토큰을 선택적으로 참고합니다." },
      { number: "03", title: "관점을 나눴다", body: "멀티헤드 어텐션이 서로 다른 종류의 관계를 동시에 포착합니다." },
    ],
    method: [
      { label: "구조", value: "Encoder–Decoder", note: "어텐션 블록을 반복" },
      { label: "관계", value: "Self-attention", note: "토큰 간 중요도를 계산" },
      { label: "순서", value: "Positional encoding", note: "위치 정보를 별도로 주입" },
      { label: "과제", value: "기계 번역", note: "영–독, 영–불 번역 평가" },
    ],
    limitation:
      "모든 토큰 쌍을 비교하는 기본 어텐션은 문맥 길이가 늘어날수록 계산량과 메모리 사용량이 빠르게 커집니다.",
    question:
      "모델이 단어 사이의 ‘관계’를 학습했다는 것과 문장의 ‘의미’를 이해했다는 것은 같은 말일까?",
    quote: "트랜스포머의 핵심은 기억을 없앤 것이 아니라, 필요한 기억에 바로 접근하는 길을 만든 것이다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "calm-technology",
    category: "HCI",
    categoryKo: "HCI",
    accent: "#f28b32",
    eyebrow: "디자인 고전",
    title: "Designing Calm Technology",
    titleKo: "주의를 빼앗지 않는 기술은 어떻게 설계되는가",
    authors: "Mark Weiser & John Seely Brown",
    source: "Xerox PARC",
    year: "1996",
    readTime: "7분",
    difficulty: "입문",
    thesis:
      "좋은 기술은 사용자의 주의를 계속 요구하지 않고, 필요할 때만 주변에서 중심으로 자연스럽게 이동한다.",
    abstract:
      "기술이 늘어날수록 알림과 인터페이스가 사람의 중심 주의를 경쟁적으로 차지합니다. 저자들은 정보가 주변부에 머물다가 필요할 때만 전면으로 오는 ‘차분한 기술’을 설계 원칙으로 제시합니다.",
    keywords: ["Calm tech", "Attention", "Ubiquitous computing", "인터랙션"],
    keyPoints: [
      { number: "01", title: "주변부를 활용한다", body: "모든 정보를 중심 화면에 올리지 않고 인지의 주변부에 둡니다." },
      { number: "02", title: "이동이 자연스럽다", body: "중요도가 바뀔 때 정보가 주변과 중심 사이를 부드럽게 오갑니다." },
      { number: "03", title: "통제감을 남긴다", body: "사용자가 기술의 상태를 이해하고 개입할 여지를 보장합니다." },
    ],
    method: [
      { label: "형식", value: "개념적 에세이", note: "설계 원칙과 사례 제시" },
      { label: "관점", value: "주의의 중심·주변", note: "인지 자원 배분에 초점" },
      { label: "사례", value: "Dangling String", note: "네트워크 상태를 주변부로 표현" },
      { label: "목표", value: "평온한 정보 환경", note: "정보량보다 관계를 설계" },
    ],
    limitation:
      "차분함의 기준은 상황과 사용자마다 다릅니다. 주변부의 신호가 접근성 요구나 긴급 상황에서는 오히려 정보를 놓치게 할 수 있습니다.",
    question:
      "사용자가 덜 보게 만드는 디자인과 사용자가 더 잘 이해하게 만드는 디자인은 언제 충돌할까?",
    quote: "인터페이스의 성숙함은 얼마나 많이 보여주느냐보다, 언제 물러날 줄 아느냐에서 드러난다.",
    presentationReady: false,
    progress: 75,
  },
  {
    slug: "choice-overload",
    category: "Psychology",
    categoryKo: "심리학",
    accent: "#b88bd0",
    eyebrow: "행동과학",
    title: "When Choice is Demotivating",
    titleKo: "선택지가 많을수록 더 좋은 선택을 할까",
    authors: "Sheena S. Iyengar & Mark R. Lepper",
    source: "Journal of Personality and Social Psychology",
    year: "2000",
    readTime: "8분",
    difficulty: "중급",
    thesis:
      "선택지가 많으면 관심은 끌 수 있지만, 실제 선택과 만족으로 이어지는 과정에서는 오히려 부담이 될 수 있다.",
    abstract:
      "연구는 잼 시식과 과제 선택 상황을 통해 선택지의 수가 참여자의 관심, 실제 행동, 만족도에 어떻게 다른 영향을 주는지 관찰했습니다. 풍부한 선택은 눈길을 끌었지만 결정 비용도 함께 키웠습니다.",
    keywords: ["선택 과부하", "의사결정", "행동경제학", "동기"],
    keyPoints: [
      { number: "01", title: "관심과 행동은 다르다", body: "많은 선택지는 사람을 모으지만 실제 구매까지 보장하지 않습니다." },
      { number: "02", title: "비교 비용이 생긴다", body: "대안이 늘수록 포기한 선택에 대한 생각과 평가 부담이 커집니다." },
      { number: "03", title: "맥락이 중요하다", body: "선택의 전문성, 선호의 명확성, 결정의 무게에 따라 효과가 달라집니다." },
    ],
    method: [
      { label: "연구", value: "현장 + 실험", note: "실제 소비와 과제 상황을 결합" },
      { label: "독립변수", value: "선택지 수", note: "제한된 조건과 확장 조건 비교" },
      { label: "관찰", value: "관심·선택·만족", note: "여러 단계의 행동을 측정" },
      { label: "해석", value: "동기 저하", note: "선택 비용의 가능성 제시" },
    ],
    limitation:
      "선택 과부하는 언제나 발생하는 보편 법칙이 아닙니다. 제품 친숙도, 선택지의 차이, 사용자의 목표에 따라 효과의 크기와 방향이 달라질 수 있습니다.",
    question:
      "좋은 큐레이션은 선택지를 줄이는 일일까, 아니면 비교 기준을 선명하게 만드는 일일까?",
    quote: "사람에게 필요한 것은 더 많은 선택지가 아니라, 선택을 끝낼 수 있는 명확한 기준일 수 있다.",
    presentationReady: false,
    progress: 45,
  },
];

export const getPaper = (slug: string) =>
  papers.find((paper) => paper.slug === slug);
