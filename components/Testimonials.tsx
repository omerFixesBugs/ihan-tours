"use client";

import { TESTIMONIALS } from "@/lib/siteData";

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-[#1E293B] to-background py-16 md:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-red text-xs uppercase tracking-superwide font-medium mb-4 block">
            Voice of Satisfaction
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Loved by groups & <br/> <span className="text-brand-red">families alike</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden group hover:border-brand-red/30 transition-colors">
              <div className="text-[#f59e0b] mb-6 flex gap-1 text-sm">
                ★★★★★
              </div>
              <p className="text-neutral-300 font-light text-sm md:text-base leading-relaxed mb-8 flex-grow">
                &quot;{testimonial.content}&quot;
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.photo_url} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                  <p className="text-neutral-500 text-xs">{testimonial.designation}, {testimonial.company}</p>
                </div>
              </div>

              <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-display leading-none text-white pointer-events-none group-hover:text-brand-red group-hover:opacity-10 transition-colors">
                &quot;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
