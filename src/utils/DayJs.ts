import dayjs, { Dayjs } from 'lib/dayjs';
import 'lib/dayjs/locale/en';
import businessDays from 'lib/dayjs/plugin/businessDays';

dayjs.extend(businessDays);
dayjs.locale('en');

const DayJs = (date?: String): Dayjs =>
  date ? dayjs(date.split('/').reverse().join('-')) : dayjs();

export default DayJs;
