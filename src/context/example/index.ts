import { defaultConfigStore } from '@Local/context';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateDirectory {
  dir: string;
  set: (value: string) => void;
}

const directoryStore = create<StateDirectory>()(
  persist(
    (set) => ({
      dir: '',
      set: (value: string) => set(() => ({ dir: value })),
    }),
    {
      name: 'dir',
      ...defaultConfigStore,
    },
  ),
);

export default directoryStore;
