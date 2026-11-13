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

const sans = Inter({subsets:["latin"],variable:"--font-sans",display:"swap"});
const display = Manrope({subsets:["latin"],variable:"--font-display",display:"swap"});
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
export const metadata:Metadata={
  metadataBase:new URL("https://cppvalley.com"),
  applicationName:"CppValley",
  title:{default:"CppValley — Elite C++ Coding Practice & Courses",template:"%s · CppValley"},
  description:"Original C++ coding challenges and seven structured courses in algorithms, STL, concurrency, design patterns, Linux, modern C++ and HFT engineering.",
  keywords:["C++ coding practice","C++ interview questions","advanced C++","C++ concurrency","lock-free algorithms","DSA in C++","Linux systems","C++ design patterns","low latency C++"],
  authors:[{name:"CppValley",url:"https://www.youtube.com/@cppvalley"}],
  creator:"CppValley",publisher:"CppValley",
  alternates:{types:{"application/rss+xml":[{url:"https://cppvalley.com/rss.xml",title:"CppValley Engineering Notes"}]}},
  openGraph:{title:"CppValley — Elite C++ Coding Practice",description:"Think deeply. Code precisely. Learn C++ from foundations to elite systems.",url:"https://cppvalley.com",siteName:"CppValley",type:"website",images:[{url:"/opengraph-image",width:1200,height:630,alt:"CppValley"}]},
  twitter:{card:"summary_large_image",title:"CppValley — C++ Practice & Courses",description:"Practice serious C++. Build real systems.",images:["/opengraph-image"]},
  robots:{index:true,follow:true},icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},
};
export const viewport:Viewport={themeColor:"#b01443",colorScheme:"light"};
export default function RootLayout({children}:Readonly<{children:ReactNode}>){
 return <html lang="en" className={sans.variable+" "+display.variable}><body>
   {adsenseClient?<Script id="adsense-script" async strategy="afterInteractive" src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+adsenseClient} crossOrigin="anonymous"/>:null}
   {children}
 </body></html>;
}
