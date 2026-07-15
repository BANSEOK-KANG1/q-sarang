"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/lib/auth/actions";

export type NavItem = {
  href: string;
  label: string;
};

export function AppShell({
  brandSub,
  userName,
  nav,
  children,
}: {
  brandSub: string;
  userName: string;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-surface lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
          <div>
            <p className="text-xl font-bold tracking-tight text-brand">큐사랑</p>
            <p className="text-xs text-muted">{brandSub}</p>
          </div>
          <button
            type="button"
            className="rounded-md border border-line px-3 py-2 text-sm font-medium"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? "닫기" : "메뉴"}
          </button>
        </div>

        <div
          className={`${
            open ? "block" : "hidden"
          } border-t border-line px-4 py-3 lg:block lg:h-full lg:border-t-0 lg:px-5 lg:py-6`}
        >
          <div className="mb-6 hidden lg:block">
            <p className="text-2xl font-bold tracking-tight text-brand">
              큐사랑
            </p>
            <p className="mt-1 text-sm text-muted">{brandSub}</p>
          </div>

          <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/director" &&
                  item.href !== "/manager" &&
                  item.href !== "/owner" &&
                  pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`shrink-0 rounded-md px-3 py-2.5 text-sm font-medium transition lg:w-full ${
                    active
                      ? "bg-brand-soft text-brand"
                      : "text-foreground hover:bg-brand-soft hover:text-brand"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-line pt-4 lg:mt-6">
            <p className="truncate text-sm font-medium">{userName}</p>
            <form action={logoutAction} className="mt-2">
              <button
                type="submit"
                className="min-h-11 text-sm text-muted underline-offset-2 hover:text-brand hover:underline"
              >
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8">{children}</main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export function Panel({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgba(26,35,50,0.04)] sm:p-5 ${className}`}
    >
      {title ? (
        <h2 className="mb-4 text-base font-semibold">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

export function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "ok" | "warn" | "danger" | "brand" | "accent";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-[#eef1f5] text-muted",
    ok: "bg-accent-soft text-accent",
    warn: "bg-[#fff7ed] text-[var(--warn)]",
    danger: "bg-[#fef2f2] text-[var(--danger)]",
    brand: "bg-brand-soft text-brand",
    accent: "bg-accent-soft text-accent",
  };
  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)] disabled:opacity-50";

export const btnSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-white px-4 py-2 text-sm font-medium transition hover:bg-[#f8fafc]";

export function EmptyState({ message }: { message: string }) {
  return (
    <p className="py-8 text-center text-sm text-muted">{message}</p>
  );
}

export function PhotoThumb({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-brand-soft text-xs text-brand ${className}`}
      >
        사진 없음
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`rounded-lg object-cover ${className}`}
    />
  );
}
