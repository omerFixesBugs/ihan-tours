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

export default function FloatingCTA() {
  return (
    <div className="pointer-events-none fixed bottom-8 left-0 right-0 z-50 flex justify-center md:bottom-10">
      <a
        href="mailto:bookings@ihantours.com"
        className="pointer-events-auto group flex items-center gap-1.5 overflow-hidden rounded-full bg-black/40 p-1.5 backdrop-blur-md"
      >
        <span className="relative flex overflow-hidden rounded-full bg-white">
          <span className="block px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-transform duration-300 ease-out group-hover:-translate-y-full md:px-7 md:py-3 md:text-base">
            Book Your Tour
          </span>
          <span className="absolute inset-0 flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 md:px-7 md:py-3 md:text-base">
            Book Your Tour
          </span>
        </span>
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-neutral-900 md:h-12 md:w-12">
          <span className="transition-transform duration-500 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%]">
            <PlaneIcon />
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-neutral-900 transition-transform duration-500 ease-in-out -translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0">
            <PlaneIcon />
          </span>
        </span>
      </a>
    </div>
  );
}
