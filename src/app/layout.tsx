import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./image-rich.css";
import "./grokking.css";
import "./practice/practice.css";
import "./platform.css";
import "./brand-theme.css";
import "./career-paths.css";

const sans = Inter({subsets:["latin"],variable:"--font-sans",display:"swap"});
const display = Manrope({subsets:["latin"],variable:"--font-display",display:"swap"});
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
export const metadata:Metadata={
  metadataBase:new URL("https://cppvalley.com"),
  applicationName:"CppValley",
  title:{default:"CppValley — Quant/HFT C++ · CUDA/GPU · AI Systems & Architecture",template:"%s · CppValley"},
  description:"Ten career-focused engineering courses in Quant/HFT C++, CUDA/GPU programming, AI inference infrastructure, RAG/agents and AI architecture, with original C++ coding practice.",
  keywords:["quant C++ interview","HFT software engineer","CUDA programming","GPU performance engineer","AI inference engineer","distributed AI systems","AI architect","C++ concurrency","low latency C++","LLM model serving"],
  authors:[{name:"CppValley",url:"https://www.youtube.com/@cppvalley"}],
  creator:"CppValley",publisher:"CppValley",
  alternates:{types:{"application/rss+xml":[{url:"https://cppvalley.com/rss.xml",title:"CppValley Engineering Notes"}]}},
  openGraph:{title:"CppValley — Quant/HFT C++, CUDA & AI Systems",description:"Choose your path: trading infrastructure, GPU kernel engineering, inference systems or AI architecture.",url:"https://cppvalley.com",siteName:"CppValley",type:"website",images:[{url:"/opengraph-image",width:1200,height:630,alt:"CppValley"}]},
  twitter:{card:"summary_large_image",title:"CppValley — Systems Engineering Career Paths",description:"Quant/HFT C++ · CUDA/GPU · AI Infrastructure · AI Architecture.",images:["/opengraph-image"]},
  robots:{index:true,follow:true},icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},
};
export const viewport:Viewport={themeColor:"#b01443",colorScheme:"light"};
export default function RootLayout({children}:Readonly<{children:ReactNode}>){
 return <html lang="en" className={sans.variable+" "+display.variable}><body>
   {adsenseClient?<Script id="adsense-script" async strategy="afterInteractive" src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+adsenseClient} crossOrigin="anonymous"/>:null}
   {children}
 </body></html>;
}
