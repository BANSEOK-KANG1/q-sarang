import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { getSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getSession();
  if (session?.role === "director") redirect("/director");
  if (session?.role === "manager") redirect("/manager");
  if (session?.role === "owner") redirect("/owner");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 15%, #ede9fe 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 85%, #f3e8ff 0%, transparent 50%), linear-gradient(160deg, #faf8ff 0%, #f3f0fb 100%)",
        }}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-[0_12px_40px_rgba(109,40,217,0.12)]">
        <div className="mb-8 text-center">
          <p className="text-3xl font-bold tracking-tight text-brand">큐사랑</p>
          <p className="mt-2 text-sm text-muted">재고 · 원장 관리</p>
        </div>
        <LoginForm />
        <div className="mt-8 rounded-lg bg-brand-soft/50 p-4 text-xs leading-relaxed text-muted">
          <p className="mb-2 font-semibold text-foreground">샘플 계정</p>
          <p>이사: director / director123</p>
          <p>본부장: manager1 / manager123</p>
          <p>원장: owner1 / owner123</p>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          <Link href="/" className="hover:text-brand">
            홈으로
          </Link>
        </p>
      </div>
    </div>
  );
}
