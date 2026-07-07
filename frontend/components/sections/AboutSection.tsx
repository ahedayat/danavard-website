'use client';

import { CheckCircle2 } from 'lucide-react';
import useUIStore from '@/stores/ui-store';
import { content } from '@/data/site-content';
import SectionReveal from '@/components/ui/SectionReveal';

export default function AboutSection() {
  const lang = useUIStore((s) => s.lang);
  const t = content[lang];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {t.about.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-electric-500 to-cyan-400 rounded-full mb-8" />
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p className="font-medium text-slate-900 dark:text-white border-l-4 border-electric-500 pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-4 py-2">
                  {t.about.p3}
                </p>
              </div>
            </SectionReveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {t.about.stats.map((stat, index) => (
              <SectionReveal key={stat} delay={0.2 + index * 0.1}>
                <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:-translate-y-1 transition-transform duration-300 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-electric-50 dark:bg-electric-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-electric-600 dark:text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {stat}
                  </h4>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
