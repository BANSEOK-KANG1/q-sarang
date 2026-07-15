import { redirect } from "next/navigation";
import { AppShell } from "@/components/ui";
import { getSession } from "@/lib/auth/session";

const ownerNav = [
  { href: "/owner", label: "홈" },
  { href: "/owner/stores", label: "내 매장" },
  { href: "/owner/orders", label: "내 주문" },
  { href: "/owner/orders/new", label: "주문 작성" },
  { href: "/owner/inventory", label: "할당 재고" },
  { href: "/owner/requests", label: "상급자 연락" },
];

export default async function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "director") redirect("/director");
  if (session.role === "manager") redirect("/manager");
  if (session.role !== "owner") redirect("/login");

  return (
    <AppShell
      brandSub="원장"
      userName={session.name}
      nav={ownerNav}
    >
      {children}
    </AppShell>
  );
}
