import { defaultConfigStore } from '@Local/context';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateRefetch {
  fn: () => any;
  set: (value: () => any) => void;
}

const refetchStore = create<StateRefetch>()(
  persist(
    (set) => ({
      fn: () => {},
      set: (value: () => any) => set(() => ({ fn: value })),
    }),
    {
      name: 'refetch',
      ...defaultConfigStore,
    },
  ),
);

export default refetchStore;
