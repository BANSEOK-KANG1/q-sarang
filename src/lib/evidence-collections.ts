import type { ResearchPaper } from "@/lib/research-data";

export type EvidenceCollection = {
  slug: "human-studies" | "preclinical-studies" | "reviews";
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  evidenceCodes: ResearchPaper["evidenceCode"][];
  searchTerms: string[];
  meaning: string;
  boundary: string;
  checks: string[];
};

export const evidenceCollections: EvidenceCollection[] = [
  {
    slug: "human-studies",
    label: "사람 대상 연구",
    eyebrow: "HUMAN STUDIES",
    title: "제왕충초 사람 연구는 어디까지 확인됐을까",
    description:
      "제왕충초·코디세핀을 실제 참여자에게 살핀 연구만 모아 대상, 비교군, 기간, 제형과 결과의 한계를 함께 확인합니다.",
    evidenceCodes: ["B"],
    searchTerms: ["제왕충초 사람 연구", "동충하초 임상 연구", "코디세핀 인체 연구"],
    meaning:
      "사람을 대상으로 직접 관찰했다는 뜻입니다. 다만 사람 연구라는 사실만으로 모든 제품이나 모든 사람에게 같은 결과가 확립되는 것은 아닙니다.",
    boundary:
      "표본 수, 대조군, 연구 기간, 사용한 원료·추출물·제형을 확인한 범위 안에서만 읽습니다.",
    checks: ["누가 참여했는가", "무엇과 비교했는가", "어떤 제형을 얼마나 사용했는가"],
  },
  {
    slug: "preclinical-studies",
    label: "동물·세포 연구",
    eyebrow: "PRECLINICAL STUDIES",
    title: "제왕충초 동물·세포 연구를 사람 결과와 구분하는 법",
    description:
      "동물 모델과 세포 실험에서 관찰된 가능성을 사람의 섭취 결과나 제품 효능으로 바로 옮기지 않도록 연구 대상을 먼저 구분합니다.",
    evidenceCodes: ["C", "D"],
    searchTerms: ["제왕충초 동물 연구", "코디세핀 세포 연구", "동충하초 전임상 연구"],
    meaning:
      "기전과 가능성을 탐색하는 전임상 단계입니다. 통제된 실험 조건에서 무엇이 변했는지를 살피는 데 의미가 있습니다.",
    boundary:
      "동물의 용량이나 세포의 농도를 사람의 섭취량으로 환산하지 않으며, 질병 예방·치료나 제품 효과로 단정하지 않습니다.",
    checks: ["사람·동물·세포 중 무엇인가", "원물·추출물·성분 중 무엇인가", "실험 조건과 농도는 무엇인가"],
  },
  {
    slug: "reviews",
    label: "리뷰·체계적 고찰",
    eyebrow: "REVIEWS",
    title: "제왕충초 리뷰 논문은 무엇을 보여줄까",
    description:
      "여러 제왕충초·코디세핀 연구를 모은 리뷰와 체계적 고찰을 원 연구의 대상·품질·차이까지 확인하며 읽습니다.",
    evidenceCodes: ["F"],
    searchTerms: ["제왕충초 리뷰 논문", "코디세핀 체계적 고찰", "동충하초 연구 정리"],
    meaning:
      "기존 연구를 모아 전체 지형과 반복되는 결과, 연구 공백을 살피는 자료입니다. 검색·선정 방식에 따라 해석의 힘이 달라집니다.",
    boundary:
      "포함된 원 연구가 대부분 동물·세포 단계라면 리뷰도 그 경계를 넘을 수 없습니다. 리뷰 형식 자체가 임상 효과를 증명하지 않습니다.",
    checks: ["어떤 연구를 포함했는가", "검색·선정 기준이 공개됐는가", "원 연구의 단계와 질은 어떠한가"],
  },
];

export function getEvidenceCollection(slug: string) {
  return evidenceCollections.find((collection) => collection.slug === slug);
}

export function getEvidenceCollectionForCode(code: ResearchPaper["evidenceCode"]) {
  return evidenceCollections.find((collection) => collection.evidenceCodes.includes(code));
}
