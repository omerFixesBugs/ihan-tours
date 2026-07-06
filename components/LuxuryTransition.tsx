"use client";

function PlaneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

export default function LuxuryTransition() {
  return (
    <div className="relative h-full w-full text-ink">
      {/* Left block */}
      <div className="absolute left-6 top-1/2 max-w-[min(42vw,280px)] -translate-y-1/2 md:left-16 lg:left-24">
        <h2 className="font-display text-display-md font-bold leading-none">
          Travel in
        </h2>
        <p className="mt-4 text-sm font-light leading-relaxed text-ink/80 md:text-base">
          Luxury
          <br />
          that moves
          <br />
          with you
        </p>
      </div>

      {/* Right block */}
      <div className="absolute right-6 top-1/2 max-w-[min(42vw,320px)] -translate-y-1/2 md:right-16 lg:right-24">
        <h2 className="font-display text-display-md text-right font-bold leading-none">
          Luxury
        </h2>
        <div className="my-5 h-px w-full bg-ink/25" />
        <div className="mb-3 flex items-baseline justify-between text-[10px] uppercase tracking-superwide text-ink/70 md:text-xs">
          <span className="font-semibold">Ihan Tours</span>
          <span>Premium</span>
        </div>
        <p className="text-left text-xs font-light leading-relaxed text-ink/75 md:text-sm">
          Every journey is engineered for comfort and precision — bespoke
          itineraries, private transfers, and handpicked destinations that let
          you arrive refreshed, every time.
        </p>
      </div>


    </div>
  );
}
