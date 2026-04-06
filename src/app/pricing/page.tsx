import { redirect } from "next/navigation";

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>;
}) {
  const params = await searchParams;
  if (params.track) {
    redirect(`/checkout?track=${encodeURIComponent(params.track)}`);
  }

  redirect("/learn/tracks");
}
