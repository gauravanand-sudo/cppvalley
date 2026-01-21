"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function TrackLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // ChatGPT-like: lock window scroll; only panes scroll.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    // Check session
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      document.body.style.overflow = prev || "auto";
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-white text-gray-900">
      <div className="flex h-full min-h-0">
        {/* LEFT PANE */}
        <aside className="hidden lg:flex w-[320px] flex-shrink-0 border-r border-gray-200 bg-white min-h-0 flex-col">
          {/* fixed top (aligns with right top) */}
          <div className="h-12 flex-shrink-0 border-b border-gray-200 bg-white/80 backdrop-blur">
            <div className="h-full px-5 flex items-center">
              <Link
                href="/"
                className="flex items-center gap-2 font-mono tracking-wide text-gray-900 hover:text-black"
              >
                <span>
                  <span className="text-green-500/90">cpp</span>valley
                  <span className="ml-1 text-cyan-700/90">_</span>
                </span>
                <span className="text-[10px] text-gray-500 border border-gray-200 bg-gray-50 rounded px-2 py-0.5">
                  v0.1
                </span>
              </Link>
            </div>
          </div>

          {/* scrollable middle */}
          <div className="min-h-0 flex-1 overflow-y-auto">{sidebar}</div>

          {/* fixed bottom (aligns with right bottom) */}
          <div className="h-12 flex-shrink-0 border-t border-gray-200 bg-white/80 backdrop-blur">
            <div className="h-full px-5 flex items-center justify-between">

              {session?.user ? (
    <>
      <Link href="/profile" className="min-w-0 flex items-center gap-3 hover:opacity-90">
        <div className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
          {(session.user.email?.[0] ?? "U").toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-mono text-gray-500">signed in</div>
          <div className="text-sm text-gray-900 truncate">{session.user.email}</div>
        </div>
      </Link>

      <button
        onClick={handleLogout}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50 transition"
      >
        Logout
      </button>
    </>
  ) : (
    <button
      onClick={handleLogin}
      className="rounded-lg bg-cyan-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-cyan-700 transition"
    >
      Login
    </button>
  )}
            </div>
          </div>
        </aside>

        {/* RIGHT PANE */}
        <main className="flex-1 min-w-0 min-h-0 bg-white">{children}</main>
      </div>
    </div>
  );
}