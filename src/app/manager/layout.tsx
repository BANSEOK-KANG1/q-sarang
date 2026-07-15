import { redirect } from "next/navigation";
import { AppShell } from "@/components/ui";
import { getSession } from "@/lib/auth/session";

const managerNav = [
  { href: "/manager", label: "대시보드" },
  { href: "/manager/owners", label: "원장 관리" },
  { href: "/manager/stores", label: "매장" },
  { href: "/manager/photos", label: "사진 승인" },
  { href: "/manager/orders", label: "주문" },
  { href: "/manager/requests", label: "연락 요청" },
];

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "director") redirect("/director");
  if (session.role === "owner") redirect("/owner");
  if (session.role !== "manager") redirect("/login");

  return (
    <AppShell
      brandSub="본부장"
      userName={session.name}
      nav={managerNav}
    >
      {children}
    </AppShell>
  );
}
