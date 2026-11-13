"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let sharedClient: SupabaseClient | null | undefined;
export function getSupabaseClient(): SupabaseClient | null {
  if (sharedClient !== undefined) return sharedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) { sharedClient = null; return null; }
  sharedClient = createClient(url,key,{
    auth:{autoRefreshToken:true,persistSession:true,detectSessionInUrl:true},
    global:{headers:{"X-Client-Info":"cppvalley-practice"}},
  });
  return sharedClient;
}
