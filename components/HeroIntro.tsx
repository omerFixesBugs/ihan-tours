"use client";


function PlaneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function ScrollChevrons() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="opacity-70"
    >
      <path d="m6 9 6 6 6-6" />
      <path d="m6 15 6 6 6-6" />
    </svg>
  );
}

export default function HeroIntro() {
  return (
    <div className="relative h-full w-full">
      {/* Top-left headline */}
      <h1 className="font-display absolute left-6 top-[22%] max-w-[min(85vw,480px)] text-display-sm font-bold uppercase text-foreground sm:text-display-md md:left-12 md:top-[28%] lg:top-[30%]">
        Celebrate
        <br />
        the Journey
      </h1>

      {/* Bottom-right headline */}
      <h2 className="font-display absolute bottom-[38%] right-6 max-w-[min(85vw,480px)] text-right text-display-sm font-bold uppercase text-foreground sm:text-display-md md:right-12 md:bottom-[34%]">
        Discover
        <br />
        Holidays
      </h2>

      {/* Bottom-left copy block */}
      <div className="absolute bottom-28 left-6 max-w-xs md:bottom-32 md:left-12 md:max-w-sm">
        <p className="font-display text-lg font-semibold uppercase leading-tight tracking-display text-foreground md:text-xl">
          Expand your
          <br />
          travel horizons
        </p>
        <div className="my-4 h-px w-16 bg-foreground/40" />
        <p className="text-xs font-light leading-relaxed text-neutral-400 md:text-sm">
          From curated group tours to private bespoke itineraries, we handle the details so you can focus on making unforgettable memories.
        </p>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="absolute bottom-8 right-6 hidden items-end gap-4 md:flex md:right-12 md:bottom-10">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] uppercase tracking-ultra text-neutral-500">
            Scroll down
          </span>
          <ScrollChevrons />
        </div>
        <div className="mb-1 max-w-[140px] border-l border-neutral-700 pl-4">
          <span className="text-[9px] uppercase leading-relaxed tracking-superwide text-neutral-500">
            To start
            <br />
            the journey
          </span>
        </div>
      </div>
    </div>
  );
}
