"use client";

import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [, setSession] = useState<Session | null>(null);
  const [, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error && mounted) {
          setLoading(false);
          return;
        }
        
        if (mounted) {
          setSession(session);
          setLoading(false);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, currentSession) => {
            if (mounted) {
              setSession(currentSession);
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const cleanupPromise = initializeAuth();

    return () => {
      mounted = false;
      cleanupPromise.then(cleanup => cleanup?.());
    };
  }, [supabase]);

  return <>{children}</>;
}
