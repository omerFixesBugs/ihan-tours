"use client";

import { SITE_SETTINGS } from "@/lib/siteData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-display font-bold text-white mb-2 uppercase tracking-wide">
              Ihan Tours
              <span className="block text-[10px] text-brand-red tracking-superwide font-medium mt-1">And Travels</span>
            </h2>
            <p className="text-neutral-400 text-sm font-light mt-6 leading-relaxed">
              {SITE_SETTINGS.tagline}. Curated experiences and local expertise for the modern explorer. Your gateway to authentic adventures.
            </p>
            
            <div className="flex gap-4 mt-8">
              {[
                { name: "Facebook", url: SITE_SETTINGS.facebook_url, icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
                { name: "Instagram", url: SITE_SETTINGS.instagram_url, icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></> },
                { name: "LinkedIn", url: SITE_SETTINGS.linkedin_url, icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-brand-red hover:text-white transition-all border border-white/10"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">Our Services</h3>
            <ul className="space-y-4">
              {[
                { name: "Umrah Packages", href: "#" },
                { name: "Holiday Tours", href: "#" },
                { name: "Air Ticketing", href: "#" },
                { name: "Visa Processing", href: "#" },
                { name: "Corporate Travel", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-neutral-400 text-sm font-light hover:text-brand-red transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red/30 group-hover:bg-brand-red transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "#" },
                { name: "Destinations", href: "#" },
                { name: "Travel Blog", href: "#" },
                { name: "Contact Us", href: "#contact" },
                { name: "Terms & Conditions", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-neutral-400 text-sm font-light hover:text-brand-red transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red/30 group-hover:bg-brand-red transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400 text-sm font-light">
                <svg className="w-5 h-5 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>{SITE_SETTINGS.address}</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm font-light">
                <svg className="w-5 h-5 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href={`tel:${SITE_SETTINGS.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{SITE_SETTINGS.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm font-light">
                <svg className="w-5 h-5 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <a href={`mailto:${SITE_SETTINGS.email}`} className="hover:text-white transition-colors">{SITE_SETTINGS.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-xs font-light text-center md:text-left">
            &copy; {currentYear} {SITE_SETTINGS.site_name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-500 font-light">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
