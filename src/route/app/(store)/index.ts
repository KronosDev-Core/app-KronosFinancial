import { atom } from 'jotai';
import dayjs from 'utils/DayJs';

const AppStore = {
  calendar: {
    date: atom<string>(dayjs().format('YYYY-MM-DD')),
    dividend: atom<string>(''),
  },
  dashboard: {},
  stock: {},
};

export default AppStore;
