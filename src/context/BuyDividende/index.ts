import { defaultConfigStore } from '@Local/context';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateBuyDividende {
  buy: string;
  set: (value: string) => void;
}

const buyDividendeStore = create<StateBuyDividende>()(
  persist(
    (set) => ({
      buy: '',
      set: (value: string) => set(() => ({ buy: value })),
    }),
    {
      name: 'buyDividende',
      ...defaultConfigStore,
    },
  ),
);

export default buyDividendeStore;
