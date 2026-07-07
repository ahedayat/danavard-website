import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { content } from '@/data/site-content';

export type Language = 'fa' | 'en';
export type Theme = 'light' | 'dark';

interface UIStore {
  lang: Language;
  theme: Theme;
  setLang: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  getContent: () => (typeof content)['fa'];
  getDir: () => 'rtl' | 'ltr';
}

const useUIStore = create<UIStore>((set, get) => ({
  lang: 'fa',
  theme: 'light',
  setLang: (lang) => set({ lang }),
  setTheme: (theme) => set({ theme }),
  toggleLang: () =>
    set((state) => ({ lang: state.lang === 'fa' ? 'en' : 'fa' })),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  getContent: () => content[get().lang],
  getDir: () => (get().lang === 'fa' ? 'rtl' : 'ltr'),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('UI Store', useUIStore);
}

export default useUIStore;
