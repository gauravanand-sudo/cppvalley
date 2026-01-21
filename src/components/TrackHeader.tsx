// src/components/TrackHeader.tsx
"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

export default function TrackHeader() {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center px-6">
      {/* Left: cppvalley logo */}
      <Link
        href="/"
        className="flex items-center gap-2 font-mono tracking-wide text-gray-900 hover:text-gray-700"
      >
        <span>
          <span className="text-blue-600">cpp</span>
          valley
          <span className="ml-1 text-blue-600/90">_</span>
        </span>
        <span className="text-[10px] text-gray-500 border border-gray-200 bg-gray-50 rounded px-2 py-0.5">
          v0.1
        </span>
      </Link>

      <div className="flex-1" />

      {/* Right: Auth */}
      <div className="flex items-center gap-3">
        {session?.user ? (
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
