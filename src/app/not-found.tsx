import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">404</p>
              <h1>We could not find that page.</h1>
              <p>Browse the course catalog, video lessons or HFT curriculum instead.</p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Explore courses</Link>
                <Link className="lp-button" href="/youtube">Watch videos</Link>
                <Link className="lp-button" href="/curriculum">HFT curriculum</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
