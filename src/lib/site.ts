export const SITE_URL = "https://olove-research.kangbs2486.chatgpt.site";

export const SITE_TITLE =
  "큐사랑 Q-LOVE · 제왕충초·코디세핀 연구 아카이브";

export const SITE_DESCRIPTION =
  "큐사랑 Q-LOVE가 Cordyceps militaris와 코디세핀 논문을 사람·동물·세포·리뷰 근거 단계와 연구 한계로 나눠 쉽게 정리한 공개 아카이브";

export const NAVER_PRODUCT_HUB_URL =
  "https://blog.naver.com/q_love_soul/224360536630";

export const absoluteSiteUrl = (path = "/") => new URL(path, SITE_URL).toString();
