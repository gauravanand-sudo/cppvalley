"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Login with Google'}
      </button>
    </div>
  );
}