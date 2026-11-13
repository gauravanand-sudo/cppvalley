import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AuthPanel } from "@/components/AuthPanel";
export const metadata:Metadata={title:"Sign In or Create an Account",description:"Create your CppValley account to track C++ coding progress.",robots:{index:false,follow:true}};
export default function LoginPage(){return <><SiteHeader/><main className="cv-auth-page"><AuthPanel/></main><SiteFooter/></>;}
