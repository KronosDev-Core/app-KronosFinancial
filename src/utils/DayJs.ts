import { DayJs as DayJsType } from '@Types/index';
import dayjs from 'dayjs';
// @ts-ignore
import dayjsBusinessDays from 'dayjs-business-days';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(dayjsBusinessDays);
dayjs.extend(isSameOrBefore);

const DayJs = (date?: String): DayJsType =>
  date
    ? (dayjs(date.split('/').reverse().join('-') as string) as DayJsType)
    : (dayjs() as DayJsType);

export default DayJs;
