"use client";

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a new supabase client on the browser
  const [supabaseClient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return <>{children}</>
}