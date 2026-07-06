"use client";

const NAV_LINKS = ["Umrah", "Packages", "Inbound", "Visa", "About Us"];

export default function HeroNav() {
  return (
    <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
      <ul className="flex flex-wrap gap-x-2 gap-y-2">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`/${link.toLowerCase().replace(" ", "-")}`}
              className="group relative inline-block overflow-hidden rounded-full px-4 py-2 text-[11px] md:text-xs font-light uppercase tracking-superwide text-foreground/90 transition-colors hover:text-white"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
              <span className="relative z-10 block overflow-hidden">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{link}</span>
                <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">{link}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="hidden text-right text-[11px] font-light leading-relaxed tracking-wide text-foreground/80 sm:block md:text-xs">
        <a href="tel:+8801977242403" className="block hover:text-brand-red">
          +8801977242403
        </a>
        <a
          href="mailto:bookings@ihantours.com"
          className="block hover:text-brand-red"
        >
          bookings@ihantours.com
        </a>
      </div>
    </nav>
  );
}
