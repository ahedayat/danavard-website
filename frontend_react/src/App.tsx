import React from 'react';
import { AppProvider } from './src/contexts/AppContext';
import { Nav } from './src/components/Nav';
import { BottomNav } from './src/components/BottomNav';
import { Hero } from './src/components/Hero';
import { Services } from './src/components/Services';
import { Projects } from './src/components/Projects';
import { About } from './src/components/About';
import { Contact } from './src/components/Contact';
import { Footer } from './src/components/Footer';
export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-navy-950 transition-colors duration-500 relative">
        {/* Global animated background meshes */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 mesh-light dark:mesh-dark opacity-100 transition-opacity duration-1000" />
        </div>

        <Nav />

        <main className="relative z-10">
          <Hero />
          <Services />
          <Projects />
          <About />
          <Contact />
        </main>

        <Footer />
        <BottomNav />
      </div>
    </AppProvider>);

}