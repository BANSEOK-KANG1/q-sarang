"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import {
  encodeSession,
  SESSION_COOKIE,
  getSession,
} from "@/lib/auth/session";
import type { Role } from "@/lib/domain/types";

const HOME: Record<Role, string> = {
  director: "/director",
  manager: "/manager",
  owner: "/owner",
};

export async function loginAction(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const loginId = String(formData.get("loginId") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!loginId || !password) {
    return { error: "아이디와 비밀번호를 입력하세요." };
  }

  const user = await getDb().authenticate(loginId, password);
  if (!user) {
    return {
      error:
        "로그인 정보가 올바르지 않거나, 중지·승인대기 계정입니다.",
    };
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  redirect(HOME[user.role]);
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/login");
}

export async function resetDemoDataAction() {
  const session = await getSession();
  if (!session || session.role !== "director") {
    throw new Error("FORBIDDEN");
  }
  await getDb().reset();
  redirect("/director");
}
