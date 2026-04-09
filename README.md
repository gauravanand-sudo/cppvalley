This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Google AdSense

Set these environment variables before enabling ads:

```bash
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_COURSE_HUB=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_COURSE_INLINE=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_LESSON_INLINE=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_LESSON_FOOTER=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_SITE_HEADER=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_SITE_FOOTER=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ARTICLE_TOP=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ARTICLE_INLINE=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_HERO=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_SECTION=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_LEFT_RAIL=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_RIGHT_RAIL=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_TOP=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_INLINE=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_RAIL=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_HOME_HERO=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_HOME_SECTION=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_DIRECTORY_TOP=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_DIRECTORY_INLINE=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_CHECKOUT=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_PROFILE_TOP=1234567890
```

What this repo does once those are set:

- Loads the official AdSense script sitewide.
- Serves `/ads.txt` from the root domain using your AdSense publisher ID.
- Renders responsive ad units in the shared site header/footer plus course hubs, course pages, lessons, blog posts, interview pages, and conference pages.
- Adds manual ad surfaces on the home page, directory/listing pages, checkout, and profile.
- Gives the blog section dedicated large-format ad zones for the listing hero, archive flow, left rail, right rail, article top, and desktop right rail.
- Leaves ad blocks hidden when env vars are missing, so local development still works.
