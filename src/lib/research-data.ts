export type ResearchPaper = {
  slug: string;
  category:
    | "immune"
    | "fatigue"
    | "antioxidant"
    | "metabolism"
    | "sleep"
    | "circulation";
  categoryKo: string;
  accent: string;
  image: string;
  eyebrow: string;
  title: string;
  titleKo: string;
  authors: string;
  source: string;
  sourceUrl: string;
  year: string;
  readTime: string;
  difficulty: "입문" | "중급" | "심화";
  evidenceCode: "B" | "C" | "D" | "F";
  evidenceLabel: string;
  studyType: string;
  subject: string;
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

export const evidenceGuide = [
  { code: "B", label: "사람 대상 연구", note: "섭취·중재 결과를 직접 관찰" },
  { code: "C", label: "동물 연구", note: "사람에게 같은 결과를 보장하지 않음" },
  { code: "D", label: "세포 연구", note: "작용 가능성을 탐색하는 초기 단계" },
  { code: "F", label: "리뷰 논문", note: "기존 연구를 모아 해석한 자료" },
];

export const papers: ResearchPaper[] = [
  {
    slug: "cordyceps-immunomodulatory-review",
    category: "immune",
    categoryKo: "면역",
    accent: "#c7824d",
    image: "/research/cordyceps-hero.webp",
    eyebrow: "이번 주의 핵심 논문",
    title:
      "An Immunomodulatory Mushroom, Cordyceps militaris, and Its Constituents",
    titleKo: "제왕충초와 주요 성분은 면역 반응을 어떻게 조절하는가",
    authors: "Eun-Ju Yang 외 6명",
    source: "Phytotherapy Research · PMID 41432716",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41432716/",
    year: "2026",
    readTime: "11분",
    difficulty: "중급",
    evidenceCode: "F",
    evidenceLabel: "리뷰 논문",
    studyType: "시험관·동물·일부 임상 연구 검토",
    subject: "제왕충초 추출물·코디세핀·다당류",
    thesis:
      "이 리뷰는 제왕충초 추출물, 코디세핀, 다당류가 서로 다른 면역 환경에서 보인 반응을 기존 연구별로 나눠 검토한다.",
    abstract:
      "연구진은 제왕충초(Cordyceps militaris)의 면역 관련 문헌을 모아, 정상 상태와 면역이 억제되거나 과도하게 활성화된 상태에서 결과가 어떻게 달라지는지 정리했습니다. 여러 연구 유형이 섞인 리뷰이므로 ‘효과가 입증됐다’고 읽기보다, 어떤 성분과 모델이 반복해서 연구되었는지를 파악하는 자료로 보는 것이 적절합니다.",
    keywords: ["Cordyceps militaris", "면역조절", "코디세핀", "다당류"],
    keyPoints: [
      {
        number: "01",
        title: "하나의 효과가 아니다",
        body: "면역 반응을 무조건 높이는 것이 아니라, 실험 환경과 자극 조건에 따라 관찰된 반응의 방향이 달랐습니다.",
      },
      {
        number: "02",
        title: "성분을 나눠 봐야 한다",
        body: "제왕충초 전체 추출물, 코디세핀, 다당류는 서로 다른 실험과 지표로 평가되었습니다.",
      },
      {
        number: "03",
        title: "근거 수준은 제각각이다",
        body: "세포·동물 연구가 큰 비중을 차지하므로 사람의 섭취 결과로 바로 연결할 수 없습니다.",
      },
    ],
    method: [
      { label: "논문 유형", value: "리뷰", note: "기존 문헌을 선별해 정리" },
      { label: "검토 범위", value: "in vitro · in vivo", note: "일부 임상 자료 포함" },
      { label: "주요 물질", value: "추출물 · 코디세핀", note: "다당류 연구도 별도 검토" },
      { label: "핵심 지표", value: "면역 반응", note: "선천·적응 면역 관련 지표" },
    ],
    limitation:
      "리뷰에 포함된 연구의 대상, 용량, 추출 방식, 평가 지표가 서로 다릅니다. 동물·세포 결과를 사람의 섭취나 제왕충초 담금주 맥락으로 직접 확장할 수 없습니다.",
    question:
      "‘면역조절’이라는 넓은 표현을 사람들에게 설명할 때, 어떤 지표와 연구 단계를 반드시 함께 말해야 할까?",
    quote:
      "이 논문은 효능의 결론이 아니라, 제왕충초 면역 연구의 지도를 그리는 자료에 가깝다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "cordyceps-exercise-recovery-review",
    category: "fatigue",
    categoryKo: "피로·운동",
    accent: "#d39a52",
    image: "/research/cordyceps-botanical.webp",
    eyebrow: "사람 연구 살펴보기",
    title:
      "Current evidence of ergogenic and post-exercise recovery effects of Cordyceps militaris supplementation",
    titleKo: "운동 수행과 회복에 관한 현재의 근거는 어디까지인가",
    authors: "Narrative review",
    source: "PubMed · PMID 41829950",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41829950/",
    year: "2026",
    readTime: "9분",
    difficulty: "중급",
    evidenceCode: "F",
    evidenceLabel: "서술적 리뷰",
    studyType: "사람 대상 보충 연구 검토",
    subject: "Cordyceps militaris 보충",
    thesis:
      "운동 수행과 회복에 관한 사람 대상 연구를 모았지만, 연구 수와 설계 차이 때문에 일관된 결론을 내리기에는 아직 제한이 있다.",
    abstract:
      "이 논문은 운동 전후의 제왕충초 보충과 관련된 사람 연구를 서술적으로 검토합니다. 산소 이용, 피로, 회복 지표가 연구마다 다르고 표본 규모와 섭취 조건도 같지 않아, 가능성과 확립된 근거를 분리해서 읽어야 합니다.",
    keywords: ["운동 수행", "회복", "사람 연구", "보충"],
    keyPoints: [
      { number: "01", title: "사람 연구가 있다", body: "전임상만이 아니라 실제 참여자를 대상으로 한 연구들이 검토되었습니다." },
      { number: "02", title: "지표가 서로 다르다", body: "산소 이용, 피로감, 수행 시간 등 결과를 재는 방식이 연구마다 다릅니다." },
      { number: "03", title: "아직 결론은 이르다", body: "표본과 조건이 작고 다양해 일반화에는 추가 연구가 필요합니다." },
    ],
    method: [
      { label: "논문 유형", value: "서술적 리뷰", note: "사람 연구를 중심으로 검토" },
      { label: "대상", value: "성인 참여자", note: "훈련 수준은 연구마다 다름" },
      { label: "개입", value: "제왕충초 보충", note: "기간·용량·제형이 다양" },
      { label: "결과", value: "수행 · 회복", note: "생리·주관 지표를 함께 평가" },
    ],
    limitation:
      "서술적 리뷰는 검색·선정 과정이 체계적 고찰보다 덜 엄격할 수 있습니다. 제품 구성과 용량의 차이도 결과 비교를 어렵게 합니다.",
    question:
      "사람 대상 연구라는 이유만으로 강한 근거라고 볼 수 있을까? 표본 수와 대조군은 어떻게 확인해야 할까?",
    quote: "‘사람 연구가 있다’와 ‘사람에게 효과가 확립됐다’ 사이에는 큰 간격이 있다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "cordycepin-antioxidant-fatigue",
    category: "fatigue",
    categoryKo: "피로·운동",
    accent: "#ba6a3e",
    image: "/research/cordycepin-abstract.webp",
    eyebrow: "동물 연구",
    title:
      "Cordycepin combined with antioxidant effects improves excessive exercise-induced fatigue",
    titleKo: "코디세핀의 항산화 작용과 과도한 운동 후 피로",
    authors: "Preclinical research team",
    source: "PubMed · PMID 40059099",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40059099/",
    year: "2025",
    readTime: "8분",
    difficulty: "심화",
    evidenceCode: "C",
    evidenceLabel: "동물 연구",
    studyType: "과도한 운동 동물 모델",
    subject: "코디세핀",
    thesis:
      "과도한 운동을 유도한 동물 모델에서 코디세핀 투여 뒤 피로와 산화 스트레스 관련 지표 변화를 관찰했다.",
    abstract:
      "연구진은 실험동물에 과도한 운동 조건을 만들고 코디세핀 투여군과 비교군의 행동·생화학 지표를 측정했습니다. 변화가 관찰되었지만, 이는 통제된 동물 모델의 결과이며 사람의 일상적 피로나 섭취 효과로 번역할 수 없습니다.",
    keywords: ["코디세핀", "피로 모델", "산화 스트레스", "동물 연구"],
    keyPoints: [
      { number: "01", title: "피로를 모델링했다", body: "일상적 피로가 아닌 과도한 운동 조건의 동물 모델입니다." },
      { number: "02", title: "여러 지표를 함께 봤다", body: "행동 변화와 산화 스트레스 관련 생화학 지표를 함께 측정했습니다." },
      { number: "03", title: "사람에게는 미확인이다", body: "용량과 대사 차이 때문에 사람의 섭취 결과로 환산할 수 없습니다." },
    ],
    method: [
      { label: "설계", value: "대조 동물 실험", note: "투여군과 비교군 구성" },
      { label: "모델", value: "과도한 운동", note: "피로 상태를 인위적으로 유도" },
      { label: "물질", value: "코디세핀", note: "제왕충초 전체가 아님" },
      { label: "측정", value: "행동 · 산화 지표", note: "복수의 생화학 지표 평가" },
    ],
    limitation:
      "동물의 운동 모델과 사람의 생활 속 피로는 동일하지 않습니다. 정제된 코디세핀 결과를 제왕충초 원물이나 담금주에 적용해서도 안 됩니다.",
    question:
      "성분 연구와 원물 연구를 같은 말로 설명하지 않으려면 발표 자료에서 무엇을 구분해야 할까?",
    quote: "연구 물질이 코디세핀인지 제왕충초 추출물인지부터 구분해야 해석이 시작된다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "cordyceps-polysaccharides-review",
    category: "immune",
    categoryKo: "면역",
    accent: "#aa8258",
    image: "/research/cordyceps-botanical.webp",
    eyebrow: "성분별 리뷰",
    title: "Cordyceps polysaccharides: A review of their immunomodulatory effects",
    titleKo: "제왕충초 다당류의 면역조절 연구를 한눈에",
    authors: "Review authors",
    source: "Molecules · PMID 39519748",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39519748/",
    year: "2024",
    readTime: "10분",
    difficulty: "심화",
    evidenceCode: "F",
    evidenceLabel: "리뷰 논문",
    studyType: "다당류 관련 문헌 검토",
    subject: "Cordyceps 유래 다당류",
    thesis:
      "제왕충초 유래 다당류 연구를 구조, 추출 방식, 실험 모델에 따라 정리하고 면역 관련 결과의 공통점과 차이를 검토했다.",
    abstract:
      "다당류는 하나의 단일 물질이 아니라 구조와 추출 방식에 따라 달라지는 물질군입니다. 이 리뷰는 서로 다른 다당류를 같은 성분처럼 묶지 않고, 어떤 조건에서 어떤 지표가 연구되었는지를 정리합니다.",
    keywords: ["다당류", "추출 방식", "면역", "리뷰"],
    keyPoints: [
      { number: "01", title: "다당류는 하나가 아니다", body: "분자량과 구조, 추출 과정에 따라 실험 결과가 달라질 수 있습니다." },
      { number: "02", title: "제조 조건이 중요하다", body: "같은 종이라도 배양과 정제 방식이 비교 가능성을 좌우합니다." },
      { number: "03", title: "기전 중심 근거다", body: "사람 대상 효능보다 세포·동물의 작용 경로 연구가 중심입니다." },
    ],
    method: [
      { label: "유형", value: "문헌 리뷰", note: "다당류 관련 연구 종합" },
      { label: "분류", value: "구조 · 분자량", note: "물질 특성별로 구분" },
      { label: "공정", value: "추출 · 정제", note: "제조 조건 차이 검토" },
      { label: "결과", value: "면역 지표", note: "세포·동물 연구 중심" },
    ],
    limitation:
      "논문마다 다당류의 구성과 순도가 다르며 표준화가 부족합니다. 결과를 제왕충초 제품 전체의 특성으로 일반화할 수 없습니다.",
    question:
      "같은 ‘다당류’라는 이름 아래 서로 다른 물질을 비교할 때 어떤 표준 정보가 필요할까?",
    quote: "성분 이름이 같아 보여도 추출과 정제가 다르면 같은 연구 대상으로 보기 어렵다.",
    presentationReady: false,
    progress: 80,
  },
  {
    slug: "cordyceps-infection-model",
    category: "immune",
    categoryKo: "면역",
    accent: "#d08b54",
    image: "/research/cordyceps-hero.webp",
    eyebrow: "감염 모델",
    title:
      "Immunomodulation and protective effects of Cordyceps militaris extract in an infection model",
    titleKo: "감염 모델에서 본 제왕충초 추출물의 면역 반응",
    authors: "Preclinical research team",
    source: "Insects · PMID 39590481",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39590481/",
    year: "2024",
    readTime: "7분",
    difficulty: "심화",
    evidenceCode: "C",
    evidenceLabel: "무척추동물 모델",
    studyType: "Galleria mellonella 유충 감염 모델",
    subject: "제왕충초 추출물",
    thesis:
      "감염된 유충 모델에서 제왕충초 추출물 처리 뒤 생존과 면역 관련 지표 변화를 관찰했다.",
    abstract:
      "이 연구는 사람이나 포유류가 아닌 곤충 유충 감염 모델을 사용합니다. 초기 면역 연구에 유용한 모델이지만, 사람의 질환 예방이나 치료에 관한 근거는 아닙니다.",
    keywords: ["감염 모델", "유충", "추출물", "전임상"],
    keyPoints: [
      { number: "01", title: "특수 모델을 썼다", body: "사람이 아닌 Galleria mellonella 유충을 실험 대상으로 사용했습니다." },
      { number: "02", title: "생존과 면역을 관찰했다", body: "감염 뒤의 생존과 선천 면역 관련 변화를 평가했습니다." },
      { number: "03", title: "초기 탐색 연구다", body: "가능성을 좁히는 단계이며 사람 적용을 말할 수 없습니다." },
    ],
    method: [
      { label: "대상", value: "곤충 유충", note: "Galleria mellonella 모델" },
      { label: "조건", value: "Candida 감염", note: "통제된 감염 환경" },
      { label: "개입", value: "제왕충초 추출물", note: "처리군·비교군 관찰" },
      { label: "결과", value: "생존 · 면역", note: "초기 전임상 지표" },
    ],
    limitation:
      "곤충의 면역계는 사람과 다릅니다. 이 결과는 추출물의 임상 효과나 제품의 효능을 뒷받침하지 않습니다.",
    question:
      "흥미로운 초기 결과를 과장 없이 소개하려면 ‘모델’ 정보를 제목과 슬라이드 어디에 표시해야 할까?",
    quote: "무엇을 관찰했는지만큼, 무엇을 대상으로 관찰했는지가 중요하다.",
    presentationReady: false,
    progress: 65,
  },
  {
    slug: "cordycepin-fatigue-pathway",
    category: "fatigue",
    categoryKo: "피로·운동",
    accent: "#b97446",
    image: "/research/cordycepin-abstract.webp",
    eyebrow: "기전 연구",
    title: "Cordycepin exhibits anti-fatigue effect via TIGAR/SIRT1/PGC-1α signaling",
    titleKo: "코디세핀과 피로 관련 경로: TIGAR/SIRT1/PGC-1α",
    authors: "Preclinical research team",
    source: "PubMed · PMID 36399798",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/36399798/",
    year: "2022",
    readTime: "9분",
    difficulty: "심화",
    evidenceCode: "C",
    evidenceLabel: "동물 연구",
    studyType: "피로 유도 동물 모델",
    subject: "코디세핀",
    thesis:
      "동물 피로 모델에서 코디세핀 투여와 에너지 대사 관련 신호 경로의 변화를 함께 관찰했다.",
    abstract:
      "연구는 피로와 관련된 행동 지표뿐 아니라 TIGAR/SIRT1/PGC-1α 경로의 변화를 측정해 가능한 작용 기전을 제안합니다. 기전 설명은 인과관계를 더 깊게 살피는 단서지만 임상 효능을 뜻하지 않습니다.",
    keywords: ["TIGAR", "SIRT1", "PGC-1α", "에너지 대사"],
    keyPoints: [
      { number: "01", title: "경로를 추적했다", body: "행동 변화와 함께 에너지 대사 관련 단백질·신호 변화를 확인했습니다." },
      { number: "02", title: "성분 단독 연구다", body: "제왕충초 원물이 아니라 코디세핀을 대상으로 했습니다." },
      { number: "03", title: "기전은 설명 후보이다", body: "관찰된 경로가 사람의 피로 개선을 증명하는 것은 아닙니다." },
    ],
    method: [
      { label: "설계", value: "동물 실험", note: "피로 유도 조건" },
      { label: "물질", value: "코디세핀", note: "정제 성분 투여" },
      { label: "관찰", value: "행동 지표", note: "피로 관련 수행 측정" },
      { label: "기전", value: "신호 경로", note: "TIGAR/SIRT1/PGC-1α" },
    ],
    limitation:
      "동물 모델과 투여량을 사람의 섭취량으로 단순 환산할 수 없으며, 신호 경로 변화만으로 체감 효과를 말할 수 없습니다.",
    question:
      "복잡한 신호 경로를 비전문가에게 설명할 때, 정확성을 잃지 않고 어디까지 단순화할 수 있을까?",
    quote: "경로를 발견했다는 말과 사람에게 효과가 있다는 말은 서로 다른 문장이다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "cordycepin-systematic-review",
    category: "metabolism",
    categoryKo: "대사·흡수",
    accent: "#9f7656",
    image: "/research/cordyceps-botanical.webp",
    eyebrow: "체계적 문헌고찰",
    title: "A systematic review of the biological effects of cordycepin",
    titleKo: "코디세핀 생물학적 효과: 체계적 문헌고찰",
    authors: "Systematic review team",
    source: "Molecules · PMID 34641429",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/34641429/",
    year: "2021",
    readTime: "12분",
    difficulty: "심화",
    evidenceCode: "F",
    evidenceLabel: "체계적 고찰",
    studyType: "코디세핀 연구의 체계적 검색·정리",
    subject: "코디세핀",
    thesis:
      "코디세핀의 생물학적 작용을 다룬 기존 연구를 체계적으로 모아 연구 영역과 근거의 공백을 정리했다.",
    abstract:
      "체계적 고찰은 정해진 기준으로 문헌을 찾고 분류한다는 장점이 있지만, 포함된 원 연구의 질보다 강한 결론을 만들 수는 없습니다. 이 자료는 연구 지형과 반복되는 기전을 파악하는 데 적합합니다.",
    keywords: ["체계적 고찰", "코디세핀", "생물학적 작용", "근거 지도"],
    keyPoints: [
      { number: "01", title: "검색 기준이 있다", body: "정해진 절차로 문헌을 찾고 포함·제외 기준을 적용했습니다." },
      { number: "02", title: "연구 지형을 보여준다", body: "어떤 작용과 모델에 연구가 집중됐는지 확인할 수 있습니다." },
      { number: "03", title: "원 연구의 한계를 가진다", body: "대부분 전임상이라면 고찰의 결론도 그 범위를 넘을 수 없습니다." },
    ],
    method: [
      { label: "유형", value: "체계적 고찰", note: "사전 기준에 따른 문헌 검색" },
      { label: "대상", value: "코디세핀 연구", note: "다양한 실험 모델 포함" },
      { label: "분류", value: "작용 영역", note: "생물학적 결과별 정리" },
      { label: "목적", value: "근거 지도", note: "공통점과 연구 공백 확인" },
    ],
    limitation:
      "포함 연구의 상당수가 세포·동물 단계이며 연구 간 이질성이 큽니다. 체계적 고찰이라는 형식 자체가 임상 근거를 보장하지 않습니다.",
    question:
      "리뷰 논문의 등급은 어떤 원 연구가 포함됐는지에 따라 어떻게 달라져야 할까?",
    quote: "정리 방식이 체계적이어도, 재료가 전임상이라면 결론 역시 전임상의 경계를 갖는다.",
    presentationReady: false,
    progress: 70,
  },
  {
    slug: "cordyceps-cellular-energy-exercise",
    category: "antioxidant",
    categoryKo: "항산화·에너지",
    accent: "#c08a56",
    image: "/research/cordyceps-hero.webp",
    eyebrow: "에너지 대사 연구",
    title:
      "Beneficial effect of Cordyceps militaris on exercise performance through cellular energy production",
    titleKo: "세포 에너지 생산과 운동 수행: 동물 연구",
    authors: "Preclinical research team",
    source: "PubMed · PMID 33312018",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/33312018/",
    year: "2020",
    readTime: "8분",
    difficulty: "중급",
    evidenceCode: "C",
    evidenceLabel: "동물 연구",
    studyType: "운동 수행 동물 모델",
    subject: "제왕충초 추출물",
    thesis:
      "운동 동물 모델에서 제왕충초 투여 뒤 수행과 세포 에너지 관련 지표의 변화를 비교했다.",
    abstract:
      "연구는 운동 수행과 에너지 생산 관련 생화학 지표를 함께 관찰해 가능한 연결고리를 제안했습니다. 통제된 동물 연구이므로 사람의 운동 능력이나 제품 섭취 효과에 관한 결론은 아닙니다.",
    keywords: ["운동 수행", "세포 에너지", "ATP", "동물 연구"],
    keyPoints: [
      { number: "01", title: "수행과 대사를 연결했다", body: "운동 결과와 세포 에너지 관련 지표를 함께 평가했습니다." },
      { number: "02", title: "추출물 연구다", body: "제왕충초 추출물의 조성과 투여 조건을 함께 확인해야 합니다." },
      { number: "03", title: "사람 연구가 필요하다", body: "동물의 변화가 사람 운동 수행에 재현되는지는 별도 검증 대상입니다." },
    ],
    method: [
      { label: "대상", value: "실험동물", note: "운동 수행 모델" },
      { label: "개입", value: "제왕충초 추출물", note: "대조군과 비교" },
      { label: "결과", value: "운동 수행", note: "지속 시간 등 행동 지표" },
      { label: "기전", value: "에너지 생산", note: "세포 대사 지표 평가" },
    ],
    limitation:
      "동물의 운동 수행 변화는 사람에게 직접 적용할 수 없고, 연구 추출물과 실제 제품의 성분 구성도 같다고 볼 수 없습니다.",
    question:
      "운동 수행 데이터를 설명할 때 절대 변화, 상대 변화, 표본 수 중 무엇을 먼저 보여줘야 할까?",
    quote: "수행 지표와 생화학 지표가 함께 움직여도, 사람의 체감 효과는 별도의 질문이다.",
    presentationReady: false,
    progress: 55,
  },
  {
    slug: "cordyceps-exercise-human-trial",
    category: "fatigue",
    categoryKo: "피로·운동",
    accent: "#e19352",
    image: "/research/cordyceps-botanical.webp",
    eyebrow: "사람 대상 무작위 연구",
    title:
      "Cordyceps militaris Improves Tolerance to High Intensity Exercise After Acute and Chronic Supplementation",
    titleKo: "제왕충초 함유 혼합물과 고강도 운동 수행: 사람 연구",
    authors: "Hirsch 외 연구진",
    source: "Journal of Dietary Supplements · PMID 27408987",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27408987/",
    year: "2016",
    readTime: "8분",
    difficulty: "중급",
    evidenceCode: "B",
    evidenceLabel: "사람 대상 무작위 연구",
    studyType: "이중눈가림·위약대조 반복측정 연구",
    subject: "건강한 성인 28명 · 제왕충초 함유 버섯 혼합물",
    thesis:
      "건강한 성인을 대상으로 제왕충초가 들어간 버섯 혼합물 섭취 전후의 고강도 운동 지표를 위약과 비교했다.",
    abstract:
      "연구는 1주 섭취 뒤 전체 참여자를, 추가 3주 섭취 뒤 일부 참여자를 다시 평가했습니다. 일부 운동 지표의 변화 가능성을 보여주지만, 표본이 작고 ‘정제 코디세핀’이나 ‘제왕충초 단독’ 연구가 아니라는 점이 해석의 핵심입니다.",
    keywords: ["사람 연구", "무작위", "운동 수행", "버섯 혼합물"],
    keyPoints: [
      { number: "01", title: "사람에게 직접 시험했다", body: "동물 모델이 아니라 건강한 성인의 운동 반응을 비교했습니다." },
      { number: "02", title: "단독 성분 연구는 아니다", body: "제왕충초가 포함된 혼합물이라 어떤 성분이 결과에 기여했는지 분리하기 어렵습니다." },
      { number: "03", title: "규모가 작다", body: "장기 섭취 분석은 더 적은 참여자로 진행돼 재현 연구가 필요합니다." },
    ],
    method: [
      { label: "대상", value: "성인 28명", note: "건강한 참여자" },
      { label: "설계", value: "무작위·위약대조", note: "반복측정 이중눈가림" },
      { label: "개입", value: "버섯 혼합물", note: "제왕충초 함유, 코디세핀 단독 아님" },
      { label: "결과", value: "VO₂max · 수행시간", note: "고강도 운동 관련 지표" },
    ],
    limitation:
      "표본이 작고 보충제가 혼합 제형입니다. 일부 참여자만 장기 섭취를 완료했으므로 코디세핀 자체의 효능이나 일반인의 일상적 피로 개선으로 확대할 수 없습니다.",
    question:
      "혼합 제품 연구를 설명할 때 성분별 기여도를 모른다는 사실을 얼마나 앞부분에 밝혀야 할까?",
    quote: "사람 연구라는 강점보다 먼저, 무엇을 얼마나 섭취했는지를 확인해야 한다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "cordyceps-sleep-negative-trial",
    category: "sleep",
    categoryKo: "수면·사람 연구",
    accent: "#8d7e76",
    image: "/research/cordycepin-abstract.webp",
    eyebrow: "효과가 확인되지 않은 연구",
    title:
      "Cordyceps militaris Was Ineffective in the Treatment of Sleep Disturbance in Patients With Major Depressive Disorder",
    titleKo: "수면장애 무작위 연구에서 효과가 확인되지 않은 제왕충초",
    authors: "Li 외 연구진",
    source: "Frontiers in Psychiatry · PMID 34858228",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/34858228/",
    year: "2021",
    readTime: "8분",
    difficulty: "입문",
    evidenceCode: "B",
    evidenceLabel: "사람 대상 무작위 연구",
    studyType: "6주 이중눈가림·위약대조 임상시험",
    subject: "수면장애가 있는 주요우울장애 환자 59명",
    thesis:
      "표준 치료에 제왕충초를 추가한 군과 위약군을 비교했지만, 6주 뒤 수면 개선의 뚜렷한 차이는 확인되지 않았다.",
    abstract:
      "이 연구는 긍정적 결과만큼 중요한 ‘차이가 없었던 결과’를 보여줍니다. 특정 환자군과 치료 조건에서 진행됐으므로 모든 수면 문제에 대한 결론은 아니지만, 제왕충초가 언제나 도움이 된다는 식의 해석을 경계하게 합니다.",
    keywords: ["사람 연구", "수면", "무작위", "부정적 결과"],
    keyPoints: [
      { number: "01", title: "차이가 확인되지 않았다", body: "주요 수면 지표에서 제왕충초 추가군의 우월성이 나타나지 않았습니다." },
      { number: "02", title: "특정 환자군 연구다", body: "주요우울장애 치료를 받는 환자를 대상으로 한 결과입니다." },
      { number: "03", title: "부정적 결과도 근거다", body: "효과가 없었던 조건을 함께 기록해야 전체 근거가 왜곡되지 않습니다." },
    ],
    method: [
      { label: "대상", value: "환자 59명", note: "주요우울장애와 수면장애" },
      { label: "설계", value: "무작위·위약대조", note: "6주 이중눈가림" },
      { label: "개입", value: "표준치료 + 제왕충초", note: "위약 추가군과 비교" },
      { label: "결과", value: "수면 지표", note: "군 간 뚜렷한 개선 차이 없음" },
    ],
    limitation:
      "특정 정신건강 환자군과 병용 치료 조건의 연구입니다. 표본과 기간이 제한적이며 건강한 사람의 수면이나 다른 제형에 그대로 적용할 수 없습니다.",
    question:
      "효과가 나타나지 않은 논문을 데이터베이스 전면에 함께 보여주는 것이 왜 중요한가?",
    quote: "좋은 데이터베이스는 기대한 답뿐 아니라, 차이가 없었던 조건도 보존한다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "cordyceps-immune-healthy-adults",
    category: "immune",
    categoryKo: "면역",
    accent: "#cb7445",
    image: "/research/cordyceps-hero.webp",
    eyebrow: "사람 대상 면역 연구",
    title:
      "The Immune-Enhancing Effects of Cordyceps militaris in Healthy Korean Men",
    titleKo: "건강한 성인에서 관찰한 제왕충초와 면역 지표",
    authors: "Kang 외 연구진",
    source: "Journal of Medicinal Food · PMID 26284906",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26284906/",
    year: "2015",
    readTime: "8분",
    difficulty: "중급",
    evidenceCode: "B",
    evidenceLabel: "사람 대상 무작위 연구",
    studyType: "4주 이중눈가림·위약대조 연구",
    subject: "건강한 한국 성인 · 제왕충초 캡슐",
    thesis:
      "건강한 성인이 제왕충초 캡슐을 4주간 섭취했을 때 자연살해세포 활성 등 일부 면역 지표의 변화를 위약군과 비교했다.",
    abstract:
      "이 논문은 감염 예방이나 질병 치료를 측정한 연구가 아니라 혈액의 면역 관련 지표를 본 연구입니다. 사람 연구라는 점은 중요하지만, 생체지표의 변화와 실제 건강 결과는 같은 의미가 아닙니다.",
    keywords: ["사람 연구", "면역 지표", "NK 세포", "위약대조"],
    keyPoints: [
      { number: "01", title: "건강 결과가 아닌 지표다", body: "질병 발생보다 혈액 내 면역 관련 수치를 평가했습니다." },
      { number: "02", title: "위약과 비교했다", body: "무작위 배정과 눈가림을 사용해 비교의 신뢰도를 높였습니다." },
      { number: "03", title: "제품 조건이 중요하다", body: "연구 제형과 용량이 다른 제품에 같은 결과를 기대할 수 없습니다." },
    ],
    method: [
      { label: "대상", value: "건강한 성인", note: "한국인 참여자" },
      { label: "설계", value: "무작위·위약대조", note: "4주 이중눈가림" },
      { label: "개입", value: "제왕충초 캡슐", note: "정해진 용량으로 섭취" },
      { label: "결과", value: "면역 생체지표", note: "NK 세포 활성 등" },
    ],
    limitation:
      "면역 지표 변화가 감염 감소나 질병 예방을 의미하지는 않습니다. 대상과 기간이 제한적이며 연구 제형을 다른 제품이나 코디세핀 단독에 적용할 수 없습니다.",
    question:
      "‘면역 지표가 변했다’를 ‘면역력이 좋아졌다’로 바꾸지 않으려면 어떤 표현이 필요할까?",
    quote: "생체지표의 변화는 건강 효과를 추정하는 단서이지, 건강 효과 그 자체가 아니다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "cordycepin-bioavailability-review",
    category: "metabolism",
    categoryKo: "대사·흡수",
    accent: "#9c765c",
    image: "/research/cordycepin-abstract.webp",
    eyebrow: "흡수와 전달의 한계",
    title:
      "Cordycepin: A review of strategies to improve the bioavailability and efficacy",
    titleKo: "코디세핀은 몸 안에서 얼마나 오래 남는가",
    authors: "Deng 외 연구진",
    source: "Phytotherapy Research · PMID 37329165",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/37329165/",
    year: "2023",
    readTime: "11분",
    difficulty: "심화",
    evidenceCode: "F",
    evidenceLabel: "리뷰 논문",
    studyType: "코디세핀 생체이용률·전달 전략 검토",
    subject: "코디세핀의 분해·흡수·약물전달",
    thesis:
      "코디세핀은 체내 효소에 의해 빠르게 대사될 수 있어, 실험실에서 보인 작용이 실제 섭취 효과로 이어지는 과정에 큰 장벽이 있다.",
    abstract:
      "이 리뷰는 코디세핀의 낮은 생체이용률 문제와 이를 보완하려는 효소 억제, 유도체, 전달체 연구를 정리합니다. ‘세포에서 작용했다’와 ‘먹었을 때 유효 농도에 도달한다’ 사이를 이해하는 핵심 자료입니다.",
    keywords: ["코디세핀", "생체이용률", "대사", "약물전달"],
    keyPoints: [
      { number: "01", title: "빠른 분해가 장벽이다", body: "체내 대사 효소가 코디세핀의 유지 시간과 농도에 영향을 줍니다." },
      { number: "02", title: "실험 농도와 섭취는 다르다", body: "세포 연구의 농도가 경구 섭취 뒤 몸에서 그대로 재현된다고 볼 수 없습니다." },
      { number: "03", title: "전달 기술은 연구 중이다", body: "유도체와 전달체는 가능성을 높이려는 전략이지 완성된 임상 해답이 아닙니다." },
    ],
    method: [
      { label: "유형", value: "서술적 리뷰", note: "약동학·전달 연구 종합" },
      { label: "문제", value: "빠른 대사", note: "생체이용률 저하 가능성" },
      { label: "전략", value: "억제제 · 유도체", note: "약물전달체 포함" },
      { label: "의미", value: "번역 가능성", note: "전임상에서 사람으로 가는 간격" },
    ],
    limitation:
      "생체이용률을 높이는 기술 다수는 전임상 단계입니다. 전달 전략의 가능성이 일반 식품이나 기존 제품의 효능을 증명하지 않습니다.",
    question:
      "효능 연구를 소개할 때 실제 흡수와 대사 정보를 어디까지 함께 보여줘야 할까?",
    quote: "몸속에 도달하는 양을 모르면, 실험실의 강한 반응만으로 섭취 효과를 말할 수 없다.",
    presentationReady: true,
    progress: 100,
  },
  {
    slug: "cordycepin-rat-pharmacokinetics",
    category: "metabolism",
    categoryKo: "대사·흡수",
    accent: "#a8906a",
    image: "/research/cordyceps-botanical.webp",
    eyebrow: "약동학 동물 연구",
    title:
      "Pharmacokinetic studies of adenosine and cordycepin, active components of Cordyceps sinensis in rat",
    titleKo: "쥐에서 추적한 코디세핀의 흡수와 소실",
    authors: "Tsai 외 연구진",
    source: "Journal of Agricultural and Food Chemistry · PMID 20302371",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/20302371/",
    year: "2010",
    readTime: "7분",
    difficulty: "심화",
    evidenceCode: "C",
    evidenceLabel: "동물 약동학 연구",
    studyType: "쥐 혈중 농도·대사 추적",
    subject: "아데노신·코디세핀",
    thesis:
      "쥐에서 코디세핀의 혈중 농도를 시간에 따라 추적해 빠른 소실과 대사 억제 조건의 차이를 관찰했다.",
    abstract:
      "연구는 어떤 생리 작용보다 ‘투여한 성분이 몸 안에서 어떻게 사라지는가’를 측정했습니다. 오래된 전임상 연구지만, 코디세핀 효능 자료를 읽을 때 흡수와 대사를 별도 질문으로 확인해야 하는 이유를 보여줍니다.",
    keywords: ["약동학", "혈중 농도", "코디세핀", "동물 연구"],
    keyPoints: [
      { number: "01", title: "시간에 따른 농도를 봤다", body: "투여 뒤 혈중 농도와 소실 속도를 추적했습니다." },
      { number: "02", title: "대사 억제 조건을 비교했다", body: "효소 억제제가 코디세핀의 대사 양상에 미치는 영향을 살폈습니다." },
      { number: "03", title: "사람 용량은 알 수 없다", body: "쥐의 약동학을 사람의 섭취량이나 효과로 직접 환산할 수 없습니다." },
    ],
    method: [
      { label: "대상", value: "실험용 쥐", note: "사람 연구 아님" },
      { label: "물질", value: "코디세핀", note: "아데노신과 함께 평가" },
      { label: "측정", value: "혈중 농도", note: "시간별 약동학 분석" },
      { label: "비교", value: "대사 억제 조건", note: "효소 억제제 병용" },
    ],
    limitation:
      "동물의 대사 속도와 경로는 사람과 다를 수 있습니다. 투여 방식도 일반적인 식품 섭취와 다르므로 임상 효능이나 안전 용량을 알려주지 않습니다.",
    question:
      "효능보다 먼저 체내 농도를 설명하면 독자가 연구를 더 정확하게 해석할 수 있을까?",
    quote: "작용 가능성과 실제 노출량은 서로 다른 데이터다.",
    presentationReady: false,
    progress: 70,
  },
  {
    slug: "cordycepin-human-platelets-in-vitro",
    category: "circulation",
    categoryKo: "순환·혈소판",
    accent: "#b96755",
    image: "/research/cordycepin-abstract.webp",
    eyebrow: "사람 유래 세포 연구",
    title:
      "Cordycepin inhibits human platelet aggregation in a cAMP- and cGMP-dependent manner",
    titleKo: "사람 혈소판 시험관 연구에서 본 코디세핀",
    authors: "Cho 외 연구진",
    source: "European Journal of Pharmacology · PMID 17229422",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/17229422/",
    year: "2007",
    readTime: "7분",
    difficulty: "심화",
    evidenceCode: "D",
    evidenceLabel: "사람 유래 세포 연구",
    studyType: "분리한 사람 혈소판 시험관 실험",
    subject: "사람 혈소판·코디세핀",
    thesis:
      "사람에게 코디세핀을 먹인 연구가 아니라, 분리한 사람 혈소판에 코디세핀을 직접 처리해 응집과 신호 변화를 관찰했다.",
    abstract:
      "‘human platelet’이라는 표현 때문에 임상시험처럼 보일 수 있지만 실제로는 시험관 연구입니다. 코디세핀의 가능한 작용 경로를 탐색하는 데 의미가 있으나, 출혈 위험이나 심혈관 효과를 사람에게서 확인한 자료는 아닙니다.",
    keywords: ["혈소판", "시험관", "코디세핀", "응집"],
    keyPoints: [
      { number: "01", title: "사람 연구가 아니다", body: "사람 몸 안이 아니라 채취·분리한 혈소판에 직접 성분을 처리했습니다." },
      { number: "02", title: "작용 경로를 탐색했다", body: "응집 반응과 세포 내 신호 변화를 함께 관찰했습니다." },
      { number: "03", title: "임상 의미는 미확인이다", body: "섭취 뒤 같은 농도와 반응이 나타나는지는 알 수 없습니다." },
    ],
    method: [
      { label: "재료", value: "사람 혈소판", note: "체외에서 분리" },
      { label: "개입", value: "코디세핀 직접 처리", note: "여러 실험 농도" },
      { label: "결과", value: "혈소판 응집", note: "신호 전달 지표 포함" },
      { label: "단계", value: "시험관 연구", note: "임상시험 아님" },
    ],
    limitation:
      "시험관 농도와 경구 섭취 뒤 혈중 농도는 다릅니다. 이 논문으로 심혈관 질환 예방·치료나 약물 병용 안전성을 판단할 수 없습니다.",
    question:
      "논문 제목에 ‘human’이 있어도 사람 대상 임상시험이 아닐 수 있다는 점을 어떻게 가장 쉽게 보여줄까?",
    quote: "사람에게서 얻은 세포와 사람에게 투여한 연구는 같은 근거가 아니다.",
    presentationReady: false,
    progress: 60,
  },
];

export const getPaper = (slug: string) =>
  papers.find((paper) => paper.slug === slug);
