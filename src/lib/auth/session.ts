import { cookies } from "next/headers";
import type { Role, SessionUser } from "@/lib/domain/types";

export const SESSION_COOKIE = "qsarang_session";

export type SessionPayload = {
  role: Role;
  userId: string;
  loginId: string;
  name: string;
  ownerId?: string;
};

export function encodeSession(user: SessionUser): string {
  return Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
}

export function decodeSession(value: string): SessionUser | null {
  try {
    const json = Buffer.from(value, "base64url").toString("utf8");
    const data = JSON.parse(json) as SessionUser;
    if (!data.role || !data.userId || !data.loginId) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  return decodeSession(raw);
}

export async function requireSession(
  role?: Role,
): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  if (role && session.role !== role) {
    throw new Error("FORBIDDEN");
  }
  return session;
}
