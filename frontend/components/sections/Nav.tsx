'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Languages, Moon, Sun } from 'lucide-react';
import useUIStore from '@/stores/ui-store';
import { content } from '@/data/site-content';
import { handleAnchorClick } from '@/lib/scroll';

export default function Nav() {
  const lang = useUIStore((s) => s.lang);
  const theme = useUIStore((s) => s.theme);
  const toggleLang = useUIStore((s) => s.toggleLang);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const t = content[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#projects', label: t.nav.projects },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/70 dark:bg-navy-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-white/10 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleAnchorClick(e, '#home')}
          className="flex items-center gap-2 group"
        >
          <Image
            src="/logo/danavard-black.svg"
            alt="Danavard"
            width={32}
            height={32}
            className="w-8 h-8 dark:hidden"
          />
          <Image
            src="/logo/danavard-white.svg"
            alt="Danavard"
            width={32}
            height={32}
            className="w-8 h-8 hidden dark:block"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-electric-500 transition-colors">
            {lang === 'fa' ? 'داناورد' : 'Danavard'}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-electric-500 dark:hover:text-cyan-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-electric-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-slate-200 dark:border-slate-800 pr-4 mr-4 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-4 rtl:mr-0 rtl:ml-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
              type="button"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
              aria-label="Toggle language"
              type="button"
            >
              <Languages size={18} />
              <span className="uppercase">{lang === 'fa' ? 'EN' : 'FA'}</span>
            </button>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, '#contact')}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-electric-500 hover:bg-electric-600 rounded-full shadow-glow transition-all hover:-translate-y-0.5"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
