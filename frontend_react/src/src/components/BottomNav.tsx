import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Home, Grid, FolderKanban, Info, Phone } from 'lucide-react';
export function BottomNav() {
  const { t } = useApp();
  const navLinks = [
  {
    href: '#home',
    label: t.nav.home,
    icon: Home
  },
  {
    href: '#services',
    label: t.nav.services,
    icon: Grid
  },
  {
    href: '#projects',
    label: t.nav.projects,
    icon: FolderKanban
  },
  {
    href: '#about',
    label: t.nav.about,
    icon: Info
  },
  {
    href: '#contact',
    label: t.nav.contact,
    icon: Phone
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-navy-950/80 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 pb-safe pt-2 px-4">
      <div className="flex items-center justify-between max-w-md mx-auto mb-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="flex flex-col items-center gap-1 p-2 text-slate-500 dark:text-slate-400 hover:text-electric-500 dark:hover:text-cyan-400 transition-colors">
              
              <Icon size={20} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </a>);

        })}
      </div>
    </nav>);

}