# 네이버 블로그 디자인 적용 순서

manifest: `content/brand/naver-theme-manifest.json`

## 현재 공개 상태

- 2026-09-09 23:41 KST 확인 시 공개 블로그명은 `큐사랑 염색방·헤어컬러`로, 목표 문구의 `Q-LOVE`가 아직 반영되지 않았다.
- 공개 프로필 소개도 이전 문구이며, 공지 세 편 순서와 `염색방`·`게시판` 카테고리 분리는 정상이다.
- 블로그명·소개글은 공개 수정 승인 뒤 적용한다. 프로필·PC 배너·모바일 커버는 네이버 파일 선택 창에서 사용자가 아래 파일을 직접 선택해야 한다.

## 1. 기본 정보

- 블로그명: `큐사랑 Q-LOVE | 염색방·헤어컬러`
- 별명: `큐사랑`
- 소개글: manifest의 publicProfileIntro 사용
- 창업 연락처는 `염색방·매장 창업 상담` 표기와 함께 사용

## 2. 이미지

1. 프로필: `public/blog/q-sarang-profile-hair-v2.png`
2. PC 상단 배너: `public/blog/q-sarang-naver-banner-hair-v3.png`
3. 모바일 커버: `public/blog/q-sarang-mobile-cover-hair-v2.png`

### 수동 적용 경로

자동 제어에서는 네이버 레거시 파일 선택기가 열리지 않으므로 아래 세 번의 파일 선택만 사용자가 직접 한다.

1. `https://admin.blog.naver.com/AdminMain.naver?blogId=q_love_soul&Redirect=Basicinfo`를 연다.
2. `블로그 프로필 이미지`의 `등록`을 누르고 `/Users/kangbanseok/q-sarang/public/blog/q-sarang-profile-hair-v2.png`를 선택한다.
3. `모바일앱 커버 이미지`의 `등록`을 누르고 `/Users/kangbanseok/q-sarang/public/blog/q-sarang-mobile-cover-hair-v2.png`를 선택한다.
4. `https://admin.blog.naver.com/Remocon.naver?blogId=q_love_soul&loadType=admin&Redirect=Remocon&SelectedMenu=title`을 연다.
5. `타이틀 → 직접등록 → 파일 등록`에서 `/Users/kangbanseok/q-sarang/public/blog/q-sarang-naver-banner-hair-v3.png`를 선택한다.
6. 리모콘 하단의 `적용`을 누른다. `적용` 전 다른 화면으로 이동하지 않는다.

파일 선택이 끝난 뒤에는 이 작업에서 공개 화면 검수를 다시 진행한다.

업로드 뒤에는 저장 버튼만 확인하지 말고 실제 공개 블로그를 PC와 모바일 너비로 각각 다시 연다.

네이버 기본정보의 블로그 프로필·모바일 커버와 리모콘의 PC 타이틀은 서로 다른 업로드 위치다. 세 파일을 같은 화면에서 찾지 않는다.

## 3. 카테고리

- 1순위: 염색방
- 2순위: 게시판

현재 글 수가 적으므로 하위 카테고리는 만들지 않는다. 실제 지점·원장 글과 상품 글이 충분히 쌓인 뒤 분리한다.

## 4. 공지

1. `큐사랑 처음 오셨다면, 염색·창업·상품 자료 안내`
2. 창업 상담 허브
3. 제왕충초 상품 문의 허브

첫 공지는 고객 정보, 창업 상담, 상품 자료의 세 경로를 분리하는 라우팅 허브로 사용한다. 이 글에는 전화번호를 넣지 않고 목적별 상세 글로 연결한다. 방문자의 대다수가 일반 고객 검색에서 들어오도록 고객 경로를 본문 첫 번째에 둔다.

## 5. 공개 화면 검수

- 프로필이 기본 실루엣으로 남아 있지 않은가
- 배너가 빈 흰 화면으로 보이지 않는가
- 제목과 소개글이 서로 겹치지 않는가
- PC 배너와 블로그명에 `큐사랑 Q-LOVE`가 정확히 보이는가
- 공지 제목이 모바일에서 잘리지 않는가
- 창업 번호가 고객 예약 번호로 오해되지 않는가
- 카테고리 이름과 글 분류가 일치하는가
