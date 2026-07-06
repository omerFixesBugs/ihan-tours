import { TravelPackage } from "@/lib/packages";

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-red/10 hover:border-brand-red/30">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-white border border-white/10">
          {pkg.duration}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-2 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>{pkg.location}</span>
          </div>
          {pkg.star_rating && (
            <div className="flex items-center gap-1 text-[#f59e0b]">
              <span>★</span>
              <span className="text-white font-medium">{pkg.review_rating || pkg.star_rating}.0</span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-red transition-colors">
          {pkg.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm font-light leading-relaxed text-neutral-400 mb-6 flex-1">
          {pkg.description}
        </p>
        
        <div className="mb-6 flex flex-wrap gap-2 text-[10px] text-neutral-300 uppercase tracking-wider font-medium">
          {pkg.accommodation_type && (
            <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1">
              {pkg.accommodation_type}
            </span>
          )}
          {pkg.pax_min && pkg.pax_max && (
            <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1">
              {pkg.pax_min}-{pkg.pax_max} Pax
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-lg font-bold text-brand-red">
            {pkg.price}
          </span>
          <a
            href="mailto:bookings@ihantours.com"
            className="text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:text-brand-red flex items-center gap-2"
          >
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
