import { atom } from 'jotai';

import DayJs from '@Utils/DayJs';

const AppStore = {
  calendar: {
    date: atom<string>(DayJs().format('YYYY-MM-DD')),
    dividend: atom<string>(''),
  },
  dashboard: {},
  stock: {},
};

export default AppStore;
