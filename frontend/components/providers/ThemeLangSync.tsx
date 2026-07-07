'use client';

import { useEffect } from 'react';
import useUIStore from '@/stores/ui-store';

export default function ThemeLangSync() {
  const theme = useUIStore((s) => s.theme);
  const lang = useUIStore((s) => s.lang);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';
    root.lang = lang;
  }, [lang]);

  return null;
}
