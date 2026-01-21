import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listContent } from "@/lib/content";
import ConferencesClient from "./ConferencesClient";

export default function ConferencesPage() {
  // ✅ Runs on server → fs is allowed
  const posts = listContent("conferences");

  return (
    <>
      <SiteHeader />
      <ConferencesClient posts={posts} />
      <SiteFooter />
    </>
  );
}
