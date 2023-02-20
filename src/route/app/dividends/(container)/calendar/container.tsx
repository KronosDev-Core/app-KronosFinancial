import { useQueryClient } from '@tanstack/react-query';

import { UNIT_DAY } from '@Lib/dayjs/constants';
import DayJs from '@Utils/DayJs';
import { add } from '@Utils/Math';
import { getAllDividends } from '@Lib/api/dividend';
import CalendarItem from './(components)/CalendarItem';
import CalendarHeader from './(components)/CalendarHeader';
import { useAtom } from 'jotai';
import AppStore from '@Store/index';

export default function CalendarContainer() {
  const queryClient = useQueryClient();
  const [date] = useAtom(AppStore.calendar.calendar);

  var firstDay = date.startOf('month').startOf('week'),
    lastDay = date.endOf('month').endOf('week'),
    totalDays = add(lastDay.diff(firstDay, UNIT_DAY, !1), 1);

  return (
    <div className="bg-slate-800 rounded-lg grid grid-rows-6 grid-cols-1 p-4 row-span-6 col-span-4">
      <div className="flex flex-col w-full justify-center row-span-1 gap-y-2 py-2">
        <CalendarHeader />
        <div className="flex flex-row w-full text-center gap-x-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className={`bg-slate-900 rounded-lg w-2/4`}>
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="row-span-5 col-span-1 grid grid-flow-row auto-rows-fr grid-cols-7 gap-2">
        {Array.from({ length: totalDays }, (_, i) => {
          queryClient.prefetchQuery({
            queryKey: [
              'Dividends',
              firstDay.add(i, 'days').format('YYYY-MM-DD'),
            ],
            queryFn: ({ queryKey }) =>
              getAllDividends({ dateExDividend: queryKey[1] as string }),
          });

          return <CalendarItem key={i} date={firstDay.add(i, 'days')} />;
        })}
      </div>
    </div>
  );
}
