import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import PresentationMode from "@/components/PresentationMode";
import { getSession } from "@/lib/auth/session";
import { getPaper } from "@/lib/research-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관리자 발표 모드",
  robots: { index: false, follow: false },
};

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "director") redirect(`/${session.role}`);

  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  return <PresentationMode paper={paper} />;
}
