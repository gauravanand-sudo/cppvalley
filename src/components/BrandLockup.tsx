type BrandLockupProps = {
  tone?: "light" | "dark";
  size?: "default" | "hero";
};

export function BrandLockup({ tone = "light", size = "default" }: BrandLockupProps) {
  const isHero = size === "hero";

  return (
    <span
      className={`market-brand market-brand-${tone} market-brand-${size}`}
      role="img"
      aria-label="cppvalley"
      style={{
        width: isHero ? "min(560px, 100%)" : 150,
        height: isHero ? 245 : 60,
        minWidth: isHero ? undefined : 150,
        flex: "0 0 auto",
        overflow: "hidden",
        borderRadius: 4,
        backgroundImage: 'url("/cppvalley-logo.webp")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "155% auto",
      }}
    />
  );
}
