import { atom } from 'jotai';

import DayJs from '@Utils/DayJs';
import { Dayjs } from '@Lib/dayjs';

const AppStore = {
  calendar: {
    calendar: atom<Dayjs>(DayJs()),
    date: atom<string>(DayJs().format('YYYY-MM-DD')),
    dividend: atom<string>(''),
  },
  dashboard: {},
  stock: {},
};

export default AppStore;
