'use client';

import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useUIStore from '@/stores/ui-store';
import { content } from '@/data/site-content';
import { handleAnchorClick } from '@/lib/scroll';
import ThreeOrb from '@/components/ui/ThreeOrb';
import styles from './HeroSection.module.css';

const HeroFlowingRibbonsBackground = dynamic(
  () => import('@/components/hero/HeroFlowingRibbonsBackground'),
  { ssr: false },
);

export default function HeroSection() {
  const lang = useUIStore((s) => s.lang);
  const dir = useUIStore((s) => (s.lang === 'fa' ? 'rtl' : 'ltr'));
  const t = content[lang];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <HeroFlowingRibbonsBackground />
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-electric-50 dark:bg-electric-500/10 text-electric-600 dark:text-cyan-400 text-sm font-medium mb-4 border border-electric-100 dark:border-electric-500/20">
              AI-First Software Engineering
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
              {t.hero.title.split('—').map((part, i, arr) => (
                <Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="hidden md:inline"> — </span>
                  )}
                  {i < arr.length - 1 && <br className="md:hidden" />}
                </Fragment>
              ))}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl"
          >
            {t.hero.supporting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-electric-500 hover:bg-electric-600 rounded-full shadow-glow transition-all hover:-translate-y-1"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#projects"
              onClick={(e) => handleAnchorClick(e, '#projects')}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-slate-700 dark:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 rounded-full transition-all hover:-translate-y-1 group"
            >
              {t.hero.ctaSecondary}
              {dir === 'rtl' ? (
                <ArrowLeft className="ml-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative order-1 lg:order-2 h-[400px] md:h-[600px] w-full"
        >
          <ThreeOrb />

          <div className="absolute inset-0 pointer-events-none">
            {t.hero.floatingCards.map((card, i) => {
              const angle = (i / t.hero.floatingCards.length) * Math.PI * 2;
              const radiusX = 36;
              const radiusY = 40;
              const left = 40 + Math.cos(angle) * radiusX;
              const top = 50 + Math.sin(angle) * radiusY;

              return (
                <motion.div
                  key={card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                  className={`absolute glass px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200 shadow-soft animate-float-slow whitespace-nowrap ${styles.floatingCard}`}
                >
                  {card}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
