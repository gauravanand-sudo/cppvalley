type BrandLockupProps = {
  tone?: "light" | "dark";
  size?: "default" | "hero";
};

export function BrandLockup({ tone = "light", size = "default" }: BrandLockupProps) {
  return (
    <span className={`market-brand market-brand-${tone} market-brand-${size}`}>
      <span className="market-brand-mark" aria-hidden="true">∞</span>
      <span className="market-brand-word">
        <strong>cpp</strong><span>valley</span>
      </span>
    </span>
  );
}
