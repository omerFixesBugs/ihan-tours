"use client";

export default function HeroBrandMark() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-center">
      <p
        className="font-display text-[clamp(1.25rem,3.5vw,2.25rem)] font-extrabold uppercase leading-none tracking-[0.28em] text-foreground"
        style={{
          textShadow:
            "0 2px 24px rgba(0,0,0,0.45), 0 0 40px rgba(0,0,0,0.25)",
        }}
      >
        Ihan Tours
      </p>
      <p
        className="font-display mt-3 text-[clamp(0.65rem,1.8vw,1rem)] font-bold uppercase tracking-[0.55em] text-foreground/95"
        style={{
          textShadow: "0 1px 16px rgba(0,0,0,0.4)",
        }}
      >
        and Travels
      </p>
    </div>
  );
}
