"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CallbackClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const run = async () => {
      const error = sp.get("error");
      const desc = sp.get("error_description");
      const code = sp.get("code");

      if (error) {
        console.error("OAuth error:", error, desc);
        router.replace(`/?error=${encodeURIComponent(error)}`);
        return;
      }

      if (!code) {
        router.replace("/?error=no_code");
        return;
      }

      const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
      if (exErr) {
        console.error("exchangeCodeForSession failed:", exErr);
        router.replace(`/?error=supabase_exchange&message=${encodeURIComponent(exErr.message)}`);
        return;
      }

      router.replace("/profile");
    };

    run();
  }, [sp, router, supabase]);

  return <div className="p-6">Signing you in…</div>;
}

