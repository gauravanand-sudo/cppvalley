import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listContent } from "@/lib/content";
import InterviewsClient from "./InterviewsClient";

export default function InterviewsPage() {
  const posts = listContent("interviews");

  return (
    <>
      <SiteHeader />
      <InterviewsClient posts={posts} />
      <SiteFooter />
    </>
  );
}
