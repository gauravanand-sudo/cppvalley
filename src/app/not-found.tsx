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
            <p className="eyebrow">404 / Archive notice</p>
            <h1 className="page-title">Page not found.</h1>
            <p className="hero-copy">This address is not part of the current cppvalley course or technical-note archive.</p>
            <div className="hero-actions">
              <Link className="button primary" href="/courses">Course catalogue</Link>
              <Link className="button" href="/blog">Technical notes</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
