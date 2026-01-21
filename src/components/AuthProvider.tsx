"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log("🔄 Initializing auth...");
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Session error:", error.message);
        }
        
        if (mounted) {
          console.log("📋 Initial session:", session?.user?.email);
          setSession(session);
          setLoading(false);
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, currentSession) => {
            console.log(`🎯 Auth event: ${event}`, currentSession?.user?.email);
            
            if (mounted) {
              setSession(currentSession);
            
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("❌ Auth initialization error:", error);
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
  }, [router, supabase]);

  // You can pass session to children via context if needed
  return <>{children}</>;
}