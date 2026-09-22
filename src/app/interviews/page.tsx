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
    <div className="page-shell lp-page interview-hub-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Interview questions</p>
              <h1>Company-style question banks for C++ systems roles.</h1>
              <p>
                Practice original prompts for C++, HFT, EDA, low-latency and systems interviews. Each question includes a clear answer framework and related topic tags.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#company-question-banks">Browse question banks</Link>
                <Link className="lp-button" href="/courses">Study courses</Link>
              </div>
            </div>
            <aside className="lp-hero-card">
              <div className="lp-hero-card-top">
                <span>Practice library</span>
                <strong>{interviewQuestionCount} questions · {interviewSets.length} sets</strong>
              </div>
              <p>Use these pages for structured preparation. Every prompt is written as practice material, not as leaked interview content.</p>
            </aside>
          </div>
        </section>

        <div className="site-container">
          <AdSlot slot={interviewsTopAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="site-container lp-category-row" aria-label="Interview round topics">
          {roundTypes.map((topic) => <a href="#company-question-banks" key={topic}>{topic}</a>)}
        </section>

        <section className="site-container lp-section" id="company-question-banks">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Question banks</p>
              <h2>Practice by company or topic</h2>
              <p>Pick a set, answer out loud, then compare your reasoning with the framework.</p>
            </div>
          </div>

          <div className="lp-course-grid interview-company-grid">
            {interviewSets.map((set, index) => (
              <Fragment key={set.slug}>
                {index === 2 ? (
                  <AdSlot slot={interviewsFeedAdSlot} className="ad-slot-inarticle" />
                ) : null}
                <Link className="lp-course-card interview-company-card" href={`/interviews/${set.slug}`}>
                  <div className="lp-card-thumb">
                    <span>{set.company}</span>
                    <strong>{set.roleFocus}</strong>
                  </div>
                  <div className="lp-card-body">
                    <span className="course-badge">{set.questions.length} questions</span>
                    <h3>{set.pageTitle}</h3>
                    <p>{set.description}</p>
                    <div className="course-tags">
                      {set.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="lp-card-footer"><strong>Open question set →</strong></div>
                  </div>
                </Link>
              </Fragment>
            ))}
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
