"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export default function HeaderAuthButton() {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  return session?.user ? (
    <div className="flex items-center gap-2">
      <Link
        href="/profile"
        className="rounded-full border border-[#D7C2C8] bg-[#FCF7F8] px-3 py-1.5 text-xs font-semibold text-[#7F1730] transition-colors hover:border-[#C59CA8] hover:bg-[#F7ECEF]"
      >
        Profile
      </Link>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-semibold text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="rounded-full bg-[#9B1C3A] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#7F1730] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Signing in..." : "Login"}
    </button>
  );
}
