import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { interviewQuestionCount, interviewSets } from "@/data/interviews";

export const metadata: Metadata = {
  title: "Interview Questions — C++, HFT, EDA and Systems",
  description:
    "Company-style C++, HFT, EDA and systems interview questions with answer frameworks, topics and preparation paths from cppvalley.",
  alternates: { canonical: "/interviews" },
  keywords: [
    "C++ interview questions",
    "HFT interview questions",
    "EDA software interview questions",
    "systems interview practice",
    "low latency C++ interview",
    "company interview preparation"
  ],
  openGraph: {
    title: "cppvalley Interview Questions",
    description:
      "Practice company-style C++, HFT, EDA and systems interview questions with answer frameworks and related topics.",
    url: "/interviews",
    type: "website",
  },
};

const interviewsTopAdSlot = process.env.NEXT_PUBLIC_ADSENSE_INTERVIEWS_TOP_SLOT;
const interviewsFeedAdSlot = process.env.NEXT_PUBLIC_ADSENSE_INTERVIEWS_FEED_SLOT;
const interviewsBottomAdSlot = process.env.NEXT_PUBLIC_ADSENSE_INTERVIEWS_BOTTOM_SLOT;

const roundTypes = [
  "Modern C++",
  "Object model",
  "Concurrency",
  "Low latency",
  "EDA graphs",
  "HFT systems",
  "LLD",
  "Project deep dive",
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "cppvalley interview question sets",
  itemListElement: interviewSets.map((set, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: set.pageTitle,
    url: `https://cppvalley.com/interviews/${set.slug}`,
  })),
};

export default function InterviewsPage() {
  return (
    <div className="page-shell lp-page interview-hub-page market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main className="lp-main">
        <section className="market-page-hero">
          <div className="site-container">
            <div className="market-hero-copy">
              <p className="lp-kicker">Interview questions</p>
              <h1>Practice catalog for C++ systems roles.</h1>
              <p>Company-style question banks are organized like marketplace courses: role focus, topic tags, question count and a direct practice action.</p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#company-question-banks">Browse question banks</Link>
                <Link className="lp-button" href="/courses">Study courses</Link>
              </div>
            </div>
            <aside className="market-hero-panel">
              <strong>{interviewQuestionCount} questions · {interviewSets.length} sets</strong>
              <ul>
                <li>Answer first without notes.</li>
                <li>Compare against the framework.</li>
                <li>Revisit the matching course module.</li>
              </ul>
            </aside>
          </div>
        </section>

        <div className="site-container market-topic-row" aria-label="Interview round topics">
          {roundTypes.map((topic) => <a href="#company-question-banks" key={topic}>{topic}</a>)}
        </div>

        <div className="site-container">
          <AdSlot slot={interviewsTopAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="site-container lp-section" id="company-question-banks">
          <div className="market-layout">
            <aside className="market-sidebar" aria-label="Interview filters">
              <div className="market-sidebar-section">
                <h3>Practice mode</h3>
                <ul>
                  <li>Answer out loud</li>
                  <li>Whiteboard trade-offs</li>
                  <li>Write pseudocode</li>
                  <li>Explain production impact</li>
                </ul>
              </div>
              <div className="market-sidebar-section">
                <h3>Round topics</h3>
                <ul>
                  {roundTypes.slice(0, 6).map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </div>
            </aside>

            <div className="market-content-column">
              <div className="market-section-head">
                <div>
                  <p className="lp-kicker">Question banks</p>
                  <h2>Practice by company or topic</h2>
                  <p>Pick a set, answer out loud, then compare your reasoning with the framework.</p>
                </div>
              </div>

              <div className="market-course-list">
                {interviewSets.map((set, index) => (
                  <Fragment key={set.slug}>
                    {index === 2 ? (
                      <AdSlot slot={interviewsFeedAdSlot} className="ad-slot-inarticle" />
                    ) : null}
                    <Link className="market-course-card" href={`/interviews/${set.slug}`}>
                      <div className="market-card-thumb">
                        <div>
                          <span>{set.company}</span>
                          <strong>{set.roleFocus}</strong>
                        </div>
                      </div>
                      <div className="market-card-body">
                        <span className="course-card-eyebrow">{set.questions.length} questions</span>
                        <h3>{set.pageTitle}</h3>
                        <p>{set.description}</p>
                        <div className="market-rating-row"><strong>Practice</strong><span>Answer framework</span><span>Role-focused</span></div>
                        <div className="market-card-meta">
                          {set.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                      </div>
                      <div className="market-card-action">Open set →</div>
                    </Link>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="site-container">
          <AdSlot slot={interviewsBottomAdSlot} className="ad-slot-leaderboard" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
