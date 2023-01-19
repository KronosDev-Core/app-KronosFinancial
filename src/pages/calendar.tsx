import { FC } from 'react';
import CalendarContainer from '@Local/Container/calendar/calendar';
import ListContainer from '@Local/Container/calendar/list';

const Calendar: FC = (): JSX.Element => {
  return (
    <div className="w-full h-full grid grid-cols-6 grid-rows-6 bg-slate-700 gap-4 p-2 lining-nums tabular-nums text-slate-200">
      <ListContainer />
      <CalendarContainer />
      <div className="row-span-2 col-span-2 bg-slate-800" />
    </div>
  );
};

export default Calendar;
