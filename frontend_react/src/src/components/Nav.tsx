import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Moon, Sun, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
export function Nav() {
  const { lang, setLang, theme, setTheme, t, dir } = useApp();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    href: '#home',
    label: t.nav.home
  },
  {
    href: '#services',
    label: t.nav.services
  },
  {
    href: '#projects',
    label: t.nav.projects
  },
  {
    href: '#about',
    label: t.nav.about
  },
  {
    href: '#contact',
    label: t.nav.contact
  }];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/70 dark:bg-navy-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-white/10 shadow-sm' : 'py-5 bg-transparent'}`}>
      
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, '#home')}
          className="flex items-center gap-2 group">
          
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-glow">
            D
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-electric-500 transition-colors">
            {lang === 'fa' ? 'داناورد' : 'Danavard'}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-electric-500 dark:hover:text-cyan-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-electric-500 hover:after:w-full after:transition-all after:duration-300">
            
              {link.label}
            </a>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-slate-200 dark:border-slate-800 pr-4 mr-4 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-4 rtl:mr-0 rtl:ml-4">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme">
              
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="flex items-center gap-1 p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
              aria-label="Toggle language">
              
              <Languages size={18} />
              <span className="uppercase">{lang === 'fa' ? 'EN' : 'FA'}</span>
            </button>
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-electric-500 hover:bg-electric-600 rounded-full shadow-glow transition-all hover:-translate-y-0.5">
            
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>);

}