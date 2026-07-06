"use client";

import { GALLERY_ITEMS } from "@/lib/siteData";

export default function Gallery() {
  return (
    <section className="bg-gradient-to-b from-[#FFD8C9] to-[#E8A598] py-16 md:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-red text-xs uppercase tracking-superwide font-bold mb-4 block">
            Moments & Memories
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-4">
            From our travelers&apos; <br/> <span className="text-brand-red">cameras</span>
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="break-inside-avoid relative group overflow-hidden rounded-xl">
              <img 
                src={item.image_url} 
                alt={item.caption} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
