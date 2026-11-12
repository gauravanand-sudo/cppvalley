import Link from "next/link";
import { AccountLink } from "@/components/AccountLink";

const navigation = [
  ["Problems","/problems"],["Study Plans","/study-plans"],
  ["Courses","/courses"],["Contests","/contests"],
  ["Discuss","/discuss"],["Articles","/blog"],
] as const;

export function SiteHeader() {
  return <header className="cv-header"><div className="cv-nav-inner">
    <Link href="/" className="cv-logo" aria-label="CppValley home"><span className="cv-logo-mark">C<span>+</span></span><span>cpp<b>valley</b><i>.</i></span></Link>
    <nav className="cv-main-nav" aria-label="Main navigation">
      {navigation.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}
    </nav>
    <form action="/problems" role="search" className="cv-nav-search"><label className="cv-sr-only" htmlFor="cv-search">Search problems</label><span>⌕</span><input id="cv-search" name="q" type="search" placeholder="Search problems…" /><kbd>/</kbd></form>
    <AccountLink/>
  </div></header>;
}
