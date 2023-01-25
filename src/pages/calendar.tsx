import { FC } from 'react';
import CalendarContainer from '@Local/Container/Calendar/calendar';
import ListContainer from '@Local/Container/Calendar/list';
import FormContainer from '@Local/Container/Calendar/form';

const Calendar: FC = (): JSX.Element => {
  return (
    <div className="w-full h-full grid grid-cols-6 grid-rows-6 bg-slate-700 gap-4 p-2 lining-nums tabular-nums text-slate-200">
      <ListContainer />
      <CalendarContainer />
      <FormContainer />
    </div>
  );
};

export default Calendar;
