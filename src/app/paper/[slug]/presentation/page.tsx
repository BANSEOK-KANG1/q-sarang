import { notFound } from "next/navigation";
import PresentationMode from "@/components/PresentationMode";
import { getPaper, papers } from "@/lib/research-data";

export function generateStaticParams() {
  return papers.map((paper) => ({ slug: paper.slug }));
}

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  return <PresentationMode paper={paper} />;
}

