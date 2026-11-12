"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";
export function AccountLink(){
 const [signedIn,setSignedIn]=useState<boolean|null>(null);
 useEffect(()=>{
  const client=getSupabaseClient();if(!client){setSignedIn(false);return;}
  client.auth.getUser().then(({data})=>setSignedIn(Boolean(data.user))).catch(()=>setSignedIn(false));
  const {data}=client.auth.onAuthStateChange((_event,session)=>setSignedIn(Boolean(session?.user)));
  return ()=>data.subscription.unsubscribe();
 },[]);
 return <Link href={signedIn?"/dashboard":"/login"} className="cv-profile-link">
  <span aria-hidden="true">◉</span><span>{signedIn?"My Progress":signedIn===null?"Account":"Sign in"}</span>
 </Link>;
}
