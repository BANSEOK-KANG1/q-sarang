import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const siteTitle = "O-LOVE · 제왕충초 연구 아카이브";
const siteDescription =
  "Cordyceps militaris와 코디세핀 논문을 근거 수준, 연구 방법, 핵심 결과와 한계로 정리하고 발표 자료로 연결하는 데이터베이스";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host") ?? "localhost:3000";
  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  return {
    title: {
      default: siteTitle,
      template: "%s · O-LOVE",
    },
    description: siteDescription,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: "O-LOVE — 제왕충초 연구를 읽고, 근거의 단계까지 설명하다.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [`${baseUrl}/og.png`],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#15100d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full font-sans text-foreground">{children}</body>
    </html>
  );
}
