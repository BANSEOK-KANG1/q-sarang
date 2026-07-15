"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth/actions";
import { btnPrimary, Field, inputClass } from "@/components/ui";

const initialState: { error?: string } | null = null;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="아이디">
        <input
          name="loginId"
          className={inputClass}
          placeholder="director 또는 owner1"
          autoComplete="username"
          required
        />
      </Field>
      <Field label="비밀번호">
        <input
          name="password"
          type="password"
          className={inputClass}
          placeholder="비밀번호"
          autoComplete="current-password"
          required
        />
      </Field>
      {state?.error ? (
        <p className="text-sm text-[var(--danger)]">{state.error}</p>
      ) : null}
      <button type="submit" className={`${btnPrimary} w-full`} disabled={pending}>
        {pending ? "로그인 중…" : "로그인"}
      </button>
    </form>
  );
}
