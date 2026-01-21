"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
    >
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setSession(null);
      setDropdownOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserInitials = () => {
    if (session?.user?.user_metadata?.full_name) {
      return session.user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (session?.user?.email) {
      return session.user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono tracking-wide text-gray-900 hover:text-gray-700"
        >
          <span>
            <span className="text-green-700/100">cpp</span>valley
            <span className="ml-1 text-blue-900/090">_</span>
          </span>
          <span className="text-[10px] text-gray-500 border border-gray-200 bg-gray-50 rounded px-2 py-0.5">
            v0.1
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/learn/tracks" label="Tracks" />
          <NavLink href="/interviews" label="Interviews" />
          <NavLink href="/conferences" label="Conferences" />
          <NavLink href="/pricing" label="Pricing" />
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                    {getUserInitials()}
                  </div>
                  <span className="hidden sm:inline">
                    {session.user.user_metadata?.full_name || 
                     session.user.email?.split("@")[0]}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="text-xs text-gray-500">Signed in as</div>
                    <div className="truncate text-sm font-medium">
                      {session.user.email}
                    </div>
                  </div>
                  
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Login with Google'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}