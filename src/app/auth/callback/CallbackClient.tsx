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
      const redirectIfAuthenticated = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          router.replace("/profile");
          return true;
        }

        return false;
      };

      const error = sp.get("error");
      const desc = sp.get("error_description");
      const code = sp.get("code");

      if (error) {
        if (await redirectIfAuthenticated()) {
          return;
        }
        console.error("OAuth error:", error, desc);
        router.replace(`/?error=${encodeURIComponent(error)}`);
        return;
      }

      if (!code) {
        if (await redirectIfAuthenticated()) {
          return;
        }
        router.replace("/?error=no_code");
        return;
      }

      const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
      if (exErr) {
        if (await redirectIfAuthenticated()) {
          return;
        }
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
