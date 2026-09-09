const VERIFICATION_BODY =
  "naver-site-verification: naver8e9de970c3a013743f062cb7af95361a.html";

export const dynamic = "force-static";

export function GET() {
  return new Response(VERIFICATION_BODY, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
