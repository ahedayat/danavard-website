'use client';

import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import useUIStore from '@/stores/ui-store';
import { content } from '@/data/site-content';
import { handleAnchorClick } from '@/lib/scroll';

export default function FooterSection() {
  const lang = useUIStore((s) => s.lang);
  const t = content[lang];

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#projects', label: t.nav.projects },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-navy-950 pt-20 pb-24 md:pb-10 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => handleAnchorClick(e, '#home')}
              className="flex items-center gap-2 mb-6 inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl shadow-glow">
                D
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                {lang === 'fa' ? 'داناورد' : 'Danavard'}
              </span>
            </a>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-8">
              {t.footer.slogan}
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-electric-500 hover:text-white transition-all hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">
              {lang === 'fa' ? 'دسترسی سریع' : 'Quick Links'}
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">
              {t.nav.services}
            </h4>
            <ul className="space-y-4">
              {t.services.items.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleAnchorClick(e, '#services')}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
