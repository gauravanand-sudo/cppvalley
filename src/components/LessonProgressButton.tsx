"use client";
import { useEffect, useState } from "react";
export function LessonProgressButton({id,hasVideo}:{id:string;hasVideo:boolean}){
 const key="cppvalley-lesson-progress-v1";
 const [checked,setChecked]=useState(false);
 useEffect(()=>{try{const items=JSON.parse(localStorage.getItem(key)||"[]");if(Array.isArray(items))setChecked(items.includes(id));}catch{}},[id]);
 function toggle(){
  try{const items=JSON.parse(localStorage.getItem(key)||"[]");const list=new Set<string>(Array.isArray(items)?items:[]);
   if(list.has(id))list.delete(id);else list.add(id);
   localStorage.setItem(key,JSON.stringify([...list]));setChecked(list.has(id));
  }catch{}}
 return <button type="button" className={"cv-btn "+(checked?"cv-btn-done":"cv-btn-primary")} aria-pressed={checked} onClick={toggle}>{checked?"✓ Reviewed on this device":hasVideo?"Mark lesson reviewed ✓":"Mark outline reviewed ✓"}</button>;
}
