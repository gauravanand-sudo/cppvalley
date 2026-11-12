"use client";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";

export function LessonProgressButton({id,hasVideo}:{id:string;hasVideo:boolean}){
 const storageKey="cppvalley-lesson-progress-v1";
 const [checked,setChecked]=useState(false);
 const [syncMessage,setSyncMessage]=useState("");
 const [busy,setBusy]=useState(false);
 const sep=id.indexOf("/");
 const courseSlug=id.slice(0,sep),lessonSlug=id.slice(sep+1);
 useEffect(()=>{
  let mounted=true;
  try {
   const items=JSON.parse(localStorage.getItem(storageKey)||"[]");
   if(Array.isArray(items))setChecked(items.includes(id));
  }catch{}
  const client=getSupabaseClient();
  if(client){
   client.auth.getUser().then(async ({data})=>{
    if(!mounted||!data.user)return;
    const result=await client.from("lesson_progress").select("lesson_slug").eq("user_id",data.user.id).eq("course_slug",courseSlug).eq("lesson_slug",lessonSlug).maybeSingle();
    if(!mounted)return;
    if(!result.error && result.data) {
     setChecked(true);
     try {
      const stored=JSON.parse(localStorage.getItem(storageKey)||"[]");
      const local=new Set<string>(Array.isArray(stored)?stored:[]);
      local.add(id);
      localStorage.setItem(storageKey,JSON.stringify([...local]));
     }catch{}
    }
   }).catch(()=>{});
  }
  return ()=>{mounted=false;};
 },[id,courseSlug,lessonSlug]);
 async function toggle(){
  if(busy)return;
  setBusy(true);setSyncMessage("");
  const next=!checked;
  try {
   const items=JSON.parse(localStorage.getItem(storageKey)||"[]");
   const list=new Set<string>(Array.isArray(items)?items:[]);
   if(next)list.add(id);else list.delete(id);
   localStorage.setItem(storageKey,JSON.stringify([...list]));
   setChecked(next);
  }catch{setSyncMessage("Browser storage is unavailable.");}
  const client=getSupabaseClient();
  if(client){
   try {
    const {data}=await client.auth.getUser();
    if(data.user){
     const result=next
      ? await client.from("lesson_progress").upsert({user_id:data.user.id,course_slug:courseSlug,lesson_slug:lessonSlug},{onConflict:"user_id,course_slug,lesson_slug"})
      : await client.from("lesson_progress").delete().eq("user_id",data.user.id).eq("course_slug",courseSlug).eq("lesson_slug",lessonSlug);
     if(result.error)setSyncMessage("Saved on this device. Cloud progress is not configured yet.");
     else setSyncMessage("Synced with your account.");
    }else setSyncMessage("Saved on this device. Sign in to sync when cloud progress is available.");
   }catch{setSyncMessage("Saved on this device; cloud sync is unavailable.");}
  }
  setBusy(false);
 }
 return <div className="cv-progress-action">
  <button type="button" disabled={busy} className={"cv-btn "+(checked?"cv-btn-done":"cv-btn-primary")} aria-pressed={checked} onClick={toggle}>{checked?"✓ Reviewed":hasVideo?"Mark lesson reviewed ✓":"Mark outline reviewed ✓"}</button>
  {syncMessage?<small role="status">{syncMessage}</small>:null}
 </div>;
}
