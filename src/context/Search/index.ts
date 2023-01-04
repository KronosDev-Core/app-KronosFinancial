import { defaultConfigStore } from '@Local/context';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateSearch {
  click: boolean;
  set: (value: boolean) => void;
}

const searchStore = create<StateSearch>()(
  persist(
    (set) => ({
      click: !1,
      set: (value: boolean) => set(() => ({ click: value })),
    }),
    {
      name: 'search',
      ...defaultConfigStore,
    },
  ),
);

export default searchStore;
