'use client';

import {
  BrainCircuit,
  Code2,
  Globe,
  Stethoscope,
  Workflow,
} from 'lucide-react';
import useUIStore from '@/stores/ui-store';
import { content } from '@/data/site-content';
import SectionReveal from '@/components/ui/SectionReveal';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Globe,
  BrainCircuit,
  Workflow,
  Stethoscope,
};

export default function ServicesSection() {
  const lang = useUIStore((s) => s.lang);
  const t = content[lang];

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t.services.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-500 to-cyan-400 mx-auto rounded-full" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isLastOdd =
              index === t.services.items.length - 1 &&
              t.services.items.length % 2 !== 0;
            const lgColSpan =
              isLastOdd && t.services.items.length === 5
                ? 'lg:col-span-1 lg:col-start-2'
                : '';
            const mdColSpan = isLastOdd ? 'md:col-span-2 lg:col-span-1' : '';

            return (
              <SectionReveal
                key={service.id}
                delay={index * 0.1}
                className={`${mdColSpan} ${lgColSpan}`}
              >
                <div className="group h-full glass rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-soft-dark glow-border">
                  <div className="w-14 h-14 rounded-xl bg-electric-50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-electric-100 dark:border-white/10">
                    {Icon && (
                      <Icon className="w-7 h-7 text-electric-500 dark:text-cyan-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
