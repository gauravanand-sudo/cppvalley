import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <span className="section-number">404 / PACKET DROPPED</span>
      <h1>This route left the hot path.</h1>
      <p>The old cppvalley library has been replaced by the HFT Core Systems curriculum.</p>
      <Link className="button button-primary" href="/curriculum">
        Open the curriculum
      </Link>
    </main>
  );
}
