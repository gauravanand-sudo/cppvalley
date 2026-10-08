import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div>
      <SiteHeader />
      <main className="page-main">
        <section className="hero">
          <div className="site-container">
            <span className="cinema-line" aria-hidden="true" />
            <p className="eyebrow">404</p>
            <h1 className="page-title">This scene isn’t here.</h1>
            <p className="hero-copy">The page may have been removed during the cppvalley simplification.</p>
            <div className="hero-actions">
              <Link className="button primary" href="/courses">Courses</Link>
              <Link className="button" href="/blog">Blog</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
