import { defaultConfigStore } from '@Local/context';
import DayJs from '@Local/utils/DayJs';
import { DayJs as DayJsType } from '@Types/index';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateCalendar {
  val: string;
  set: (value: DayJsType) => void;
}

const calendarStore = create<StateCalendar>()(
  persist(
    (set) => ({
      val: DayJs().format('DD/MM/YYYY'),
      set: (value: DayJsType) => set({ val: value.format('DD/MM/YYYY') }),
    }),
    {
      name: 'calendar',
      ...defaultConfigStore,
    },
  ),
);

export default calendarStore;
