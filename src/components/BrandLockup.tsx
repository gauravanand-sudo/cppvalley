type BrandLockupProps = {
  tone?: "light" | "dark";
  size?: "default" | "hero";
};

export function BrandLockup({ tone = "light", size = "default" }: BrandLockupProps) {
  return (
    <span className={`brand-lockup brand-lockup-${tone} brand-lockup-${size}`}>
      <span className="brand-glyph" aria-hidden="true">cv</span>
      <span className="brand-type">
        <strong>cpp</strong><span>valley</span>
      </span>
      <span className="brand-signal" aria-hidden="true" />
    </span>
  );
}
