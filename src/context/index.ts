/* ---- refacto Context, replace Zustand by Jotai ---- */
import { atom } from 'jotai';

import DayJs from '@Utils/DayJs';
const context = {
  calendar: {
    date: atom<string>(DayJs().format('YYYY-MM-DD')),
    dividende: atom<string>(''),
  },
  dashboard: {},
  stock: {},
};

export default context;
