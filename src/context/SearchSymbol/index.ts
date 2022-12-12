import { defaultConfigStore } from '@Local/context';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateSearchSymbol {
  val: string;
  set: (value: string) => void;
}

const searchSymbolStore = create<StateSearchSymbol>()(
  persist(
    (set) => ({
      val: '',
      set: (value: string) => set(() => ({ val: value })),
    }),
    {
      name: 's_Sym',
      ...defaultConfigStore,
    },
  ),
);

export default searchSymbolStore;
