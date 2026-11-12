import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LocalDashboard } from "@/components/LocalDashboard";
export const metadata:Metadata={title:"My C++ Learning Progress",description:"See C++ practice and course-outline progress stored in your browser.",robots:{index:false,follow:true}};
export default function Dashboard(){return <><SiteHeader/><main className="cv-subpage"><LocalDashboard/></main><SiteFooter/></>;}
