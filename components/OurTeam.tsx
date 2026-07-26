"use client";

import { TEAM_MEMBERS } from "@/lib/siteData";
import { useLanguage } from "@/components/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";

export default function OurTeam() {
  const { t } = useLanguage();

  // Group members by category
  const leadership = TEAM_MEMBERS.filter((m) => m.category === "leadership");
  const management = TEAM_MEMBERS.filter((m) => m.category === "management");
  const executives = TEAM_MEMBERS.filter((m) => m.category === "executives");

  const renderTeamCard = (member: typeof TEAM_MEMBERS[0], index: number) => {
    // Lookup translated details dynamically
    const name = t(`aboutPage.team.members.${member.id}.name`);
    const role = t(`aboutPage.team.members.${member.id}.role`);

    return (
      <ScrollReveal 
        key={member.id} 
        delay={index * 0.05}
        className="group relative flex flex-col h-full rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:border-brand-red/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-red/5"
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 via-brand-red/0 to-brand-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Profile Image container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950 border-b border-white/5">
          {member.image_url ? (
            <img
              src={member.image_url}
              alt={name}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out">
              {/* Circular decorative glowing light behind user silhouette */}
              <div className="absolute w-36 h-36 rounded-full bg-brand-red/5 blur-2xl group-hover:bg-brand-red/10 transition-colors duration-500" />
              <svg 
                className="w-20 h-20 text-neutral-850 group-hover:text-brand-red/20 transition-colors duration-500" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.75" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          )}

          {/* Luxury frame overlay */}
          <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-white/10 transition-colors duration-500" />
        </div>

        {/* Member Details */}
        <div className="p-6 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-transparent to-neutral-950/40">
          <h4 className="text-white font-medium text-lg tracking-wide group-hover:text-brand-red transition-colors duration-300">
            {name}
          </h4>
          <p className="text-neutral-400 text-sm font-light mt-1.5 leading-relaxed">
            {role}
          </p>
        </div>
      </ScrollReveal>
    );
  };

  return (
    <section className="relative py-24 md:py-36 bg-transparent overflow-hidden border-t border-white/5">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-gold-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="text-brand-red text-xs uppercase tracking-superwide font-medium mb-4 block">
              {t("aboutPage.team.subtitle")}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              {t("aboutPage.team.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed">
              {t("aboutPage.team.description")}
            </p>
          </ScrollReveal>
        </div>

        {/* 1. Leadership Category */}
        {leadership.length > 0 && (
          <div className="mb-24">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-gold-400 font-display text-lg uppercase tracking-wider font-semibold whitespace-nowrap">
                  {t("aboutPage.team.categories.leadership")}
                </h3>
                <div className="h-[1px] w-full bg-gradient-to-r from-gold-400/20 to-transparent" />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {leadership.map((member, idx) => renderTeamCard(member, idx))}
            </div>
          </div>
        )}

        {/* 2. Management Category */}
        {management.length > 0 && (
          <div className="mb-24">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-neutral-300 font-display text-lg uppercase tracking-wider font-semibold whitespace-nowrap">
                  {t("aboutPage.team.categories.management")}
                </h3>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {management.map((member, idx) => renderTeamCard(member, idx))}
            </div>
          </div>
        )}

        {/* 3. Executives & Specialists Category */}
        {executives.length > 0 && (
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-neutral-300 font-display text-lg uppercase tracking-wider font-semibold whitespace-nowrap">
                  {t("aboutPage.team.categories.executives")}
                </h3>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {executives.map((member, idx) => renderTeamCard(member, idx))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
