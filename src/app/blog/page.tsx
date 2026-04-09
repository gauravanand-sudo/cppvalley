import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listContent } from "@/lib/content";
import { getBlogViewCounts } from "@/lib/blogViews";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const posts = listContent("blog");
  const viewCounts = await getBlogViewCounts(posts.map((post) => post.slug));

  return (
    <>
      <SiteHeader />
      <BlogClient posts={posts} viewCounts={Object.fromEntries(viewCounts)} />
      <SiteFooter />
    </>
  );
}
