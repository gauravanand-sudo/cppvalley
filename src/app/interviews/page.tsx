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
    "Company-style C++, HFT, EDA and AI systems interview questions with answer frameworks, topics, round types and preparation paths from cppvalley.",
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

const publishingSteps = [
  {
    title: "Add company set",
    image: "/course-cover/company-interview-set",
    text: "Create or extend one object in src/data/interviews.ts with company, role focus, SEO description and tags.",
  },
  {
    title: "Add questions",
    image: "/course-cover/interview-questions-daily",
    text: "Write original prompts, answer framework bullets and related topics. Keep every question searchable and useful.",
  },
  {
    title: "Publish and link",
    image: "/course-cover/interview-seo-publishing",
    text: "The dynamic page, sitemap entry, internal links, FAQ schema and ad placements are generated from the data.",
  },
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
                Publish one company or topic page at a time. Each page has focused prompts, answer frameworks, related topics, internal links and monetization slots without disrupting readability.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#company-question-banks">Browse question banks</Link>
                <Link className="lp-button" href="/courses">Study courses</Link>
              </div>
            </div>
            <aside className="lp-hero-card home-hero-image-card">
              <img src="/course-cover/interview-question-bank" alt="Interview question bank cover" />
              <div className="lp-card-body">
                <span className="course-badge">Practice library</span>
                <h2>{interviewQuestionCount} questions · {interviewSets.length} sets</h2>
                <p>Add questions daily using <code>src/data/interviews.ts</code>. The sitemap and dynamic pages update automatically.</p>
              </div>
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
              <p className="lp-kicker">Company and topic pages</p>
              <h2>Question banks ready for search traffic</h2>
              <p>Use these pages for company-style practice. Avoid posting confidential or leaked interview content; publish original explanations and prompts instead.</p>
            </div>
          </div>

          <div className="lp-course-grid interview-company-grid">
            {interviewSets.map((set, index) => (
              <Fragment key={set.slug}>
                {index === 2 ? (
                  <AdSlot slot={interviewsFeedAdSlot} className="ad-slot-inarticle" />
                ) : null}
                <Link className="lp-course-card image-course-card interview-company-card" href={`/interviews/${set.slug}`}>
                  <img className="course-card-image" src={`/course-cover/${set.slug}`} alt={`${set.pageTitle} cover`} loading="lazy" />
                  <div className="lp-card-body">
                    <div className="course-card-topline"><span className="course-badge">{set.company}</span><span>{set.questions.length} questions</span></div>
                    <h3>{set.pageTitle}</h3>
                    <p>{set.description}</p>
                    <div className="course-tags">
                      {set.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <strong className="lp-link-text">Open question set →</strong>
                  </div>
                </Link>
              </Fragment>
            ))}
          </div>
        </section>

        <section className="site-container lp-section daily-publishing-panel">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Publishing workflow</p>
              <h2>How to add one interview page or question daily</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {publishingSteps.map((step, index) => (
              <article className="lp-card image-course-card" key={step.title}>
                <img className="course-card-image" src={step.image} alt={`${step.title} cover`} loading="lazy" />
                <div className="lp-card-body">
                  <span className="course-badge">Step {index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
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
