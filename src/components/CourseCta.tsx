import type { ReactNode } from "react";
import Link from "next/link";

type CourseCtaProps = {
  className?: string;
  checkoutLabel?: ReactNode;
  fallbackLabel?: ReactNode;
  fallbackHref?: string;
};

export function CourseCta({
  className,
  checkoutLabel = "Enroll now",
  fallbackLabel = "View course curriculum",
  fallbackHref = "/curriculum",
}: CourseCtaProps) {
  const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL?.trim();

  if (checkoutUrl) {
    return (
      <a className={className} href={checkoutUrl}>
        {checkoutLabel}
      </a>
    );
  }

  return (
    <Link className={className} href={fallbackHref}>
      {fallbackLabel}
    </Link>
  );
}
