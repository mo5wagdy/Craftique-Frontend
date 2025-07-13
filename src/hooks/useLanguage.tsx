
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'ar';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage', // unique name for localStorage
    }
  )
);
