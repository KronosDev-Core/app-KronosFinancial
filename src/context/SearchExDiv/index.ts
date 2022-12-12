import { defaultConfigStore } from '@Local/context';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateSearchExDiv {
  val: string;
  set: (value: string) => void;
}

const searchExDivStore = create<StateSearchExDiv>()(
  persist(
    (set) => ({
      val: '',
      set: (value: string) => set(() => ({ val: value })),
    }),
    {
      name: 's_ExD',
      ...defaultConfigStore,
    },
  ),
);

export default searchExDivStore;
