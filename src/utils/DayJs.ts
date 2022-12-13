import dayjs from 'dayjs';
// @ts-ignore
import dayjsBusinessDays from 'dayjs-business-days';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(dayjsBusinessDays);
dayjs.extend(isSameOrBefore);

const DayJs = (date?: String): dayjs.Dayjs =>
  date ? dayjs(date.split('/').reverse().join('-') as string) : dayjs();

export default DayJs;
