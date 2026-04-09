const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

export function GET() {
  const sellerId = ADSENSE_CLIENT?.replace(/^ca-/, "");

  if (!sellerId) {
    return new Response("", {
      status: 204,
      headers: {
        "Cache-Control": "public, max-age=300",
      },
    });
  }

  return new Response(
    `google.com, ${sellerId}, DIRECT, f08c47fec0942fa0\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
