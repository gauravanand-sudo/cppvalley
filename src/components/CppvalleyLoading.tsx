"use client";

type Props = {
  label?: string;
  caption?: string;
  className?: string;
  tone?: "light" | "dark";
};

const LETTERS = "cppvalley".split("");

export default function CppvalleyLoading({
  label = "cppvalley loading",
  caption = "Preparing your next screen.",
  className = "",
  tone = "dark",
}: Props) {
  const dark = tone === "dark";

  return (
    <div className={["flex flex-col items-center justify-center gap-4 text-center", className].join(" ").trim()}>
      <div
        className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.18)" : "#E7D4DA",
          backgroundColor: dark ? "rgba(255,255,255,0.05)" : "#FCF6F8",
          color: dark ? "#DDBDC7" : "#9B1C3A",
        }}
      >
        {label}
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-1 text-3xl font-semibold tracking-[0.18em] sm:text-4xl"
        aria-label="cppvalley"
      >
        {LETTERS.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="inline-block animate-[cppvalley-glow_1.4s_ease-in-out_infinite]"
            style={{
              animationDelay: `${index * 110}ms`,
              color: dark ? "#FFF4F7" : "#4A1F2C",
              textShadow: dark ? "0 0 18px rgba(215,104,134,0.38)" : "0 0 18px rgba(155,28,58,0.14)",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <p
        className="max-w-md text-sm leading-7"
        style={{ color: dark ? "#E6D8DD" : "#6F555C" }}
      >
        {caption}
      </p>

      <style jsx>{`
        @keyframes cppvalley-glow {
          0%,
          100% {
            opacity: 0.35;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
}
