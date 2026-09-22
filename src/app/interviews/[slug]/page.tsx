import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { interviewSets, interviewSetsBySlug } from "@/data/interviews";

type InterviewSetPageProps = {
  params: Promise<{ slug: string }>;
};

const interviewsTopAdSlot = process.env.NEXT_PUBLIC_ADSENSE_INTERVIEWS_TOP_SLOT;
const interviewsFeedAdSlot = process.env.NEXT_PUBLIC_ADSENSE_INTERVIEWS_FEED_SLOT;
const interviewsBottomAdSlot = process.env.NEXT_PUBLIC_ADSENSE_INTERVIEWS_BOTTOM_SLOT;

export function generateStaticParams() {
  return interviewSets.map((set) => ({ slug: set.slug }));
}

export async function generateMetadata({ params }: InterviewSetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const set = interviewSetsBySlug.get(slug);

  if (!set) return {};

  return {
    title: `${set.pageTitle} — cppvalley`,
    description: set.description,
    alternates: { canonical: `/interviews/${set.slug}` },
    keywords: [
      set.pageTitle,
      `${set.company} interview questions`,
      "C++ interview questions",
      "systems interview practice",
      ...set.tags,
    ],
    openGraph: {
      title: `${set.pageTitle} — cppvalley`,
      description: set.description,
      url: `/interviews/${set.slug}`,
      type: "article",
    },
  };
}

export default async function InterviewSetPage({ params }: InterviewSetPageProps) {
  const { slug } = await params;
  const set = interviewSetsBySlug.get(slug);

  if (!set) notFound();

  const relatedSets = interviewSets.filter((item) => item.slug !== set.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Interview Questions", item: "https://cppvalley.com/interviews" },
          { "@type": "ListItem", position: 2, name: set.pageTitle, item: `https://cppvalley.com/interviews/${set.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        name: set.pageTitle,
        description: set.description,
        mainEntity: set.questions.map((question) => ({
          "@type": "Question",
          name: question.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: question.answerFramework.join(" "),
          },
        })),
      },
      {
        "@type": "CollectionPage",
        name: set.pageTitle,
        description: set.description,
        url: `https://cppvalley.com/interviews/${set.slug}`,
        isPartOf: { "@id": "https://cppvalley.com/#website" },
      },
    ],
  };

  return (
    <div className="page-shell lp-page interview-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <nav className="lp-breadcrumb" aria-label="Breadcrumb">
                <Link href="/interviews">Interview Questions</Link>
                <span>/</span>
                <span>{set.company}</span>
              </nav>
              <p className="lp-kicker">{set.company} practice</p>
              <h1>{set.pageTitle}</h1>
              <p>{set.description}</p>
              <div className="lp-actions">
                <a className="lp-button primary" href="#questions">Practice questions</a>
                <Link className="lp-button" href="/courses">Study related courses</Link>
              </div>
            </div>
            <aside className="lp-hero-card">
              <div className="lp-hero-card-top">
                <span>Role focus</span>
                <strong>{set.roleFocus}</strong>
              </div>
              <div className="course-tags interview-hero-tags">
                {set.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <p>{set.questions.length} original practice questions with answer frameworks and related topic tags.</p>
            </aside>
          </div>
        </section>

        <div className="site-container">
          <AdSlot slot={interviewsTopAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="site-container lp-section interview-detail-layout" id="questions">
          <article>
            <div className="lp-section-head">
              <div>
                <p className="lp-kicker">Questions</p>
                <h2>Practice prompts and answer frameworks</h2>
                <p>Use these as preparation prompts. The goal is to explain your reasoning, trade-offs and failure cases clearly.</p>
              </div>
            </div>

            <div className="interview-question-list">
              {set.questions.map((question, index) => (
                <Fragment key={question.id}>
                  {index === 2 ? (
                    <AdSlot slot={interviewsFeedAdSlot} className="ad-slot-inarticle" />
                  ) : null}
                  <section className="interview-question-card" id={question.id}>
                    <div className="interview-question-meta">
                      <span>{question.round}</span>
                      <span>{question.difficulty}</span>
                    </div>
                    <h3>{question.title}</h3>
                    <p className="interview-prompt">{question.prompt}</p>
                    <h4>Answer framework</h4>
                    <ul>
                      {question.answerFramework.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                    <div className="course-tags">
                      {question.relatedTopics.map((topic) => <span key={topic}>{topic}</span>)}
                    </div>
                  </section>
                </Fragment>
              ))}
            </div>
          </article>

          <aside className="interview-sidebar">
            <div className="lp-card">
              <div className="lp-card-body">
                <span className="course-badge">Prep loop</span>
                <h3>How to use this page</h3>
                <ol className="compact-steps">
                  <li>Answer out loud first.</li>
                  <li>Compare against the framework.</li>
                  <li>Write one project example.</li>
                  <li>Repeat with a timer.</li>
                </ol>
              </div>
            </div>

            <div className="lp-card">
              <div className="lp-card-body">
                <span className="course-badge">Related sets</span>
                <h3>Continue practice</h3>
                <div className="related-link-list">
                  {relatedSets.map((related) => (
                    <Link href={`/interviews/${related.slug}`} key={related.slug}>{related.pageTitle}</Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>

        <div className="site-container">
          <AdSlot slot={interviewsBottomAdSlot} className="ad-slot-leaderboard" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
