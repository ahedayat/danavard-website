'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import useUIStore from '@/stores/ui-store';
import { content } from '@/data/site-content';
import SectionReveal from '@/components/ui/SectionReveal';

function ProjectMockup({ type }: { type: string }) {
  switch (type) {
    case 'waveform':
      return (
        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-500/20 to-violet-500/20" />
          <div className="flex items-center gap-1 h-24 z-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  height: `${25 + Math.abs(Math.sin(i * 1.3)) * 70}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <div className="mt-6 w-3/4 h-2 bg-white/10 rounded-full overflow-hidden z-10">
            <div className="w-1/2 h-full bg-cyan-400 rounded-full" />
          </div>
        </div>
      );

    case 'voice-profiles':
      return (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/40 via-slate-900 to-slate-900" />
          <div className="flex items-center justify-between w-full max-w-xs z-10">
            <div className="w-16 h-16 rounded-full border-2 border-electric-500 flex items-center justify-center bg-electric-500/20 relative">
              <div className="absolute inset-0 rounded-full border border-electric-500 animate-pulse-ring" />
              <div className="w-8 h-8 rounded-full bg-electric-500" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-electric-500 to-cyan-400 mx-4 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 border-t-2 border-r-2 border-cyan-400" />
            </div>
            <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-cyan-400/20">
              <div className="w-8 h-8 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>
      );

    case 'medical-dashboard':
      return (
        <div className="w-full h-full bg-slate-100 dark:bg-slate-900 p-6 flex gap-4 relative overflow-hidden items-end justify-center">
          <div className="w-32 h-48 bg-white dark:bg-slate-800 rounded-t-xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 flex flex-col gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="w-full h-24 bg-electric-100 dark:bg-electric-900/30 rounded-lg" />
            <div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="w-1/2 h-2 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
          <div className="w-40 h-56 bg-white dark:bg-slate-800 rounded-t-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4 z-10 group-hover:-translate-y-2 transition-transform duration-500">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30" />
              <div className="flex-1 flex flex-col gap-1 justify-center">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="w-2/3 h-2 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
            <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700 p-2 flex flex-col gap-2">
              <div className="w-full h-6 bg-white dark:bg-slate-800 rounded shadow-sm" />
              <div className="w-full h-6 bg-white dark:bg-slate-800 rounded shadow-sm" />
              <div className="w-full h-6 bg-white dark:bg-slate-800 rounded shadow-sm" />
            </div>
          </div>
        </div>
      );

    case 'ecommerce':
      return (
        <div className="w-full h-full bg-slate-900 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
          <div className="w-full h-8 bg-slate-800 rounded-t-lg border-b border-slate-700 flex items-center px-3 gap-2 z-10">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-b-lg border border-slate-700 border-t-0 p-4 flex gap-4 z-10">
            <div className="w-1/4 h-full flex flex-col gap-2">
              <div className="w-full h-4 bg-slate-700 rounded" />
              <div className="w-3/4 h-4 bg-slate-700 rounded" />
              <div className="w-5/6 h-4 bg-slate-700 rounded" />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="flex-1 h-12 bg-electric-500/20 border border-electric-500/30 rounded-lg" />
                <div className="flex-1 h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-lg" />
                <div className="flex-1 h-12 bg-violet-500/20 border border-violet-500/30 rounded-lg" />
              </div>
              <div className="flex-1 bg-slate-700/30 rounded-lg border border-slate-600/50" />
            </div>
          </div>
        </div>
      );

    default:
      return <div className="w-full h-full bg-slate-800" />;
  }
}

export default function ProjectsSection() {
  const lang = useUIStore((s) => s.lang);
  const dir = useUIStore((s) => (s.lang === 'fa' ? 'rtl' : 'ltr'));
  const t = content[lang];

  return (
    <section
      id="projects"
      className="py-24 relative z-10 bg-slate-50/50 dark:bg-navy-900/20"
    >
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {t.projects.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-electric-500 to-cyan-400 rounded-full" />
            </div>
          </div>
        </SectionReveal>

        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 gap-6">
          {t.projects.items.map((project, index) => (
            <SectionReveal
              key={project.id}
              delay={index * 0.1}
              className="min-w-[85vw] md:min-w-0 snap-center flex flex-col"
            >
              <div className="group flex flex-col h-full glass rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 transition-all duration-500 hover:shadow-soft-dark">
                <div className="h-64 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <ProjectMockup type={project.imageType} />
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-electric-500 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                    {project.desc}
                  </p>

                  {/* <button
                    type="button"
                    className="inline-flex items-center text-sm font-bold text-electric-600 dark:text-cyan-400 group/btn mt-auto"
                  >
                    {t.projects.viewCaseStudy}
                    {dir === 'rtl' ? (
                      <ArrowLeft className="ml-2 w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="mr-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    )}
                  </button> */}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
