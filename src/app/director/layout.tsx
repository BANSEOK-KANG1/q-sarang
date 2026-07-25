import { redirect } from "next/navigation";
import { AppShell } from "@/components/ui";
import { getSession } from "@/lib/auth/session";

const directorNav = [
  { href: "/director", label: "대시보드" },
  { href: "/director/research", label: "연구·발표 관리" },
  { href: "/director/profile", label: "내 사진" },
  { href: "/director/managers", label: "본부장 관리" },
  { href: "/director/owners", label: "원장 관리" },
  { href: "/director/approvals", label: "원장 승인" },
  { href: "/director/stores", label: "매장 관리" },
  { href: "/director/products", label: "상품·카테고리" },
  { href: "/director/inventory", label: "재고" },
  { href: "/director/orders", label: "주문" },
  { href: "/director/requests", label: "연락 요청" },
];

export default async function DirectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "manager") redirect("/manager");
  if (session.role === "owner") redirect("/owner");
  if (session.role !== "director") redirect("/login");

  return (
    <AppShell
      brandSub="이사"
      userName={session.name}
      nav={directorNav}
    >
      {children}
    </AppShell>
  );
}
