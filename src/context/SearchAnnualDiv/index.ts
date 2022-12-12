import { defaultConfigStore } from '@Local/context';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateSearchAnnualDiv {
  val: number;
  set: (value: number) => void;
}

const searchAnnualDivStore = create<StateSearchAnnualDiv>()(
  persist(
    (set) => ({
      val: '',
      set: (value: number) => set(() => ({ val: value })),
    }),
    {
      name: 's_AnD',
      ...defaultConfigStore,
    },
  ),
);

export default searchAnnualDivStore;
