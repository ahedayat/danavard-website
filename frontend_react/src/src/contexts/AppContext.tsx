import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  type ReactNode } from
'react';
import { content } from '../data/content';
type Language = 'fa' | 'en';
type Theme = 'light' | 'dark';
interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: typeof content.fa;
  dir: 'rtl' | 'ltr';
}
const AppContext = createContext<AppContextType | undefined>(undefined);
export function AppProvider({ children }: {children: ReactNode;}) {
  const [lang, setLang] = useState<Language>('fa');
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  useEffect(() => {
    const root = window.document.documentElement;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';
    root.lang = lang;
  }, [lang]);
  const value = {
    lang,
    setLang,
    theme,
    setTheme,
    t: content[lang],
    dir: lang === 'fa' ? 'rtl' : 'ltr'
  };
  return (
    <AppContext.Provider value={value}>
      <div
        className={`${lang === 'fa' ? 'font-fa' : 'font-en'} text-slate-900 dark:text-slate-50 min-h-screen transition-colors duration-500`}>
        
        {children}
      </div>
    </AppContext.Provider>);

}
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}