'use client';

import useUIStore from '@/stores/ui-store';
import Nav from '@/components/sections/Nav';
import BottomNav from '@/components/sections/BottomNav';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';

export default function HomePage() {
  const lang = useUIStore((s) => s.lang);

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-navy-950 transition-colors duration-500 relative ${lang === 'fa' ? 'font-fa' : 'font-en'} text-slate-900 dark:text-slate-50`}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 mesh-light dark:mesh-dark opacity-100 transition-opacity duration-1000" />
      </div>

      <Nav />

      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <FooterSection />
      <BottomNav />
    </div>
  );
}
