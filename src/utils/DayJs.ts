import dayjs, { Dayjs } from '@Lib/dayjs';
import businessDays from '@Lib/dayjs/plugin/businessDays';
import '@Lib/dayjs/locale/en';

dayjs.extend(businessDays);
dayjs.locale('en');

export default function DayJs(date?: String): Dayjs {
  return date ? dayjs(date.split('/').reverse().join('-')) : dayjs();
}
