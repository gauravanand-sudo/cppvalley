const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const adsTxtOverride = process.env.ADS_TXT_CONTENT;

export function GET() {
  const body = adsTxtOverride?.trim()
    ? `${adsTxtOverride.trim()}\n`
    : adsenseClient?.startsWith("ca-pub-")
      ? `google.com, ${adsenseClient.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`
      : "# Configure NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx to publish your AdSense ads.txt line.\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
