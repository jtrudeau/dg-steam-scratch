"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type GateState = "checking" | "locked" | "open" | "denied";

const STORAGE_KEY = "dgTeacherAccess";
const gateEnabled =
  (process.env.NEXT_PUBLIC_ENABLE_TEACHER_GATE ?? "true") !== "false";
const defaultHash =
  "b7ffbd682fd660d866121631a3d3f02d548516c59169fa928cac80567b061fc0"; // sha256("scratch-teacher")
const teacherHash = (
  process.env.NEXT_PUBLIC_TEACHER_KEY_HASH ?? defaultHash
).trim();

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function TeacherGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GateState>("checking");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const params = useSearchParams();

  const disabled = useMemo(() => !gateEnabled || !teacherHash, []);

  useEffect(() => {
    if (disabled) {
      setState("open");
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setState("open");
      return;
    }

    const previewFlag = params.get("teacher") === "preview";
    const previewCode = params.get("code");
    if (previewFlag && previewCode) {
      void attemptAuth(previewCode, true);
    } else {
      setState("locked");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, params]);

  async function attemptAuth(input: string, silent = false) {
    setError("");
    if (!input.trim()) {
      setError("Enter the teacher passphrase.");
      return;
    }

    try {
      const hash = await sha256Hex(input);
      if (hash === teacherHash) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ teacherAccess: true, ts: Date.now() }),
        );
        setState("open");
        return;
      }
      setState("denied");
      if (!silent) setError("That passphrase did not match. Try again.");
    } catch (err) {
      console.error("Teacher gate error", err);
      setError("Could not verify right now. Please try again.");
      setState("denied");
    }
  }

  if (state === "open") return <>{children}</>;

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="tag">Teacher access</span>
      <h1 className="mt-4 font-display text-4xl font-black text-[var(--ink)]">
        Enter teacher code
      </h1>
      <p className="mt-4 max-w-2xl text-lg font-semibold text-[var(--ink)]">
        This keeps facilitation notes and answer keys out of casual student
        browsing. Ask the program lead for the passphrase.
      </p>

      <div className="panel mt-6 max-w-xl p-6">
        <label className="text-sm font-black uppercase tracking-[0.2em] text-[var(--ink)]">
          Teacher passphrase
        </label>
        <input
          type="password"
          className="mt-3 w-full border-2 border-[var(--ink)] bg-white px-3 py-3 text-base font-semibold text-[var(--ink)] outline-none transition focus:bg-[var(--butter-light)]"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void attemptAuth(code);
            }
          }}
          disabled={state === "checking"}
        />
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => void attemptAuth(code)}
          disabled={state === "checking"}
        >
          {state === "checking" ? "Checking..." : "Unlock teacher hub"}
        </button>
        {error ? (
          <p className="mt-3 text-sm font-black text-[var(--raspberry)]">
            {error}
          </p>
        ) : null}
        {state === "denied" && !error ? (
          <p className="mt-3 text-sm font-black text-[var(--raspberry)]">
            Incorrect passphrase. Please try again.
          </p>
        ) : null}
      </div>
    </section>
  );
}
