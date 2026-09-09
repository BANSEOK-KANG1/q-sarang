import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
  display: "swap",
});

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-serif",
  display: "swap",
});

const accent = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · 큐사랑 O-LOVE",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "큐사랑",
    "제왕충초",
    "동충하초",
    "Cordyceps militaris",
    "코디세핀",
    "제왕충초 논문",
  ],
  authors: [{ name: "큐사랑 O-LOVE" }],
  creator: "큐사랑 O-LOVE",
  publisher: "큐사랑 O-LOVE",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "큐사랑 O-LOVE 연구 아카이브",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "O-LOVE — 제왕충초 연구를 읽고, 근거의 단계까지 설명하다.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

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
    <html
      lang="ko"
      className={`h-full antialiased ${sans.variable} ${serif.variable} ${accent.variable}`}
    >
      <body className="min-h-full font-sans text-foreground">{children}</body>
    </html>
  );
}
