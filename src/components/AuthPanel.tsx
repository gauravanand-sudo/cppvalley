"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase-client";
export function AuthPanel(){
 const [mode,setMode]=useState<"signin"|"signup">("signin");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");
 const [error,setError]=useState("");
 const [user,setUser]=useState<User|null>(null);
 const client=getSupabaseClient();
 useEffect(()=>{
  if(!client)return;
  client.auth.getUser().then(({data})=>setUser(data.user||null)).catch(()=>{});
  const {data}=client.auth.onAuthStateChange((_event,session)=>setUser(session?.user||null));
  return ()=>data.subscription.unsubscribe();
 },[client]);
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();setError("");setMessage("");
  if(!client){setError("Authentication is not configured on this deployment.");return;}
  if(!email.includes("@") || password.length<8){setError("Use a valid email address and a password with at least 8 characters.");return;}
  setBusy(true);
  try {
   if(mode==="signup"){
    const {data,error:e}=await client.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+"/dashboard"}});
    if(e)throw e;
    setMessage(data.session?"Account created. You can open your dashboard.":"Account created. Check your email for a confirmation link before signing in.");
   }else{
    const {error:e}=await client.auth.signInWithPassword({email,password});
    if(e)throw e;
    window.location.assign("/dashboard");
   }
  }catch(e){setError(e instanceof Error?e.message:"Could not complete authentication.");}
  finally{setBusy(false);}
 }
 async function resetPassword(){
  if(!client||!email.includes("@")){setError("Enter your email address first.");return;}
  setBusy(true);setError("");setMessage("");
  const {error:e}=await client.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+"/login"});
  setBusy(false);
  if(e)setError(e.message);else setMessage("If an account exists, password recovery instructions have been emailed.");
 }
 async function signout(){if(!client)return;await client.auth.signOut();setUser(null);setMessage("You have signed out.");}
 if(!client)return <div className="cv-auth-card"><h1>Sign-in setup pending</h1><p>Supabase authentication keys are not configured for this deployment.</p><Link href="/problems">Browse problems →</Link></div>;
 if(user)return <div className="cv-auth-card"><span className="cv-eyebrow">SIGNED IN</span><h1>Welcome back.</h1><p>{user.email}</p><div className="cv-auth-actions"><Link href="/dashboard" className="cv-btn cv-btn-primary">Open dashboard →</Link><button className="cv-btn cv-btn-secondary" onClick={signout}>Sign out</button></div></div>;
 return <div className="cv-auth-card"><span className="cv-eyebrow">CPPVALLEY ACCOUNT</span><h1>{mode==="signup"?"Create your account":"Sign in to CppValley"}</h1><p>Track your progress and prepare for verified cross-device submissions.</p>
  <div className="cv-auth-tabs"><button type="button" className={mode==="signin"?"is-current":""} onClick={()=>{setMode("signin");setError("");setMessage("");}}>Sign in</button><button type="button" className={mode==="signup"?"is-current":""} onClick={()=>{setMode("signup");setError("");setMessage("");}}>Create account</button></div>
  <form onSubmit={submit} className="cv-auth-form"><label>Email address<input value={email} onChange={e=>setEmail(e.target.value)} type="email" name="email" autoComplete="email" required placeholder="you@example.com"/></label><label>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" name="password" autoComplete={mode==="signin"?"current-password":"new-password"} minLength={8} required placeholder="8+ characters"/></label>
   <button disabled={busy} className="cv-btn cv-btn-primary" type="submit">{busy?"Working...":mode==="signup"?"Create account →":"Sign in →"}</button></form>
  {mode==="signin"?<button onClick={resetPassword} disabled={busy} className="cv-auth-reset">Forgot your password?</button>:null}
  {error?<p role="alert" className="cv-auth-error">{error}</p>:null}
  {message?<p role="status" className="cv-auth-message">{message}</p>:null}
  <div className="cv-auth-fineprint">Account access uses Supabase Authentication. Course checkout and paid entitlements will be enabled after the production security review.</div>
 </div>;
}
