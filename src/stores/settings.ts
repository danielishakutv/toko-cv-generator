import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'NGN' | 'USD';

interface SettingsState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'NGN',
      setCurrency: (currency: Currency) => set({ currency }),
    }),
    {
      name: 'settings-storage',
    }
  )
);
