import { useQueryClient } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { z } from 'zod';

import CalendarItem from '@Components/Calendar/CalendarItem';
import Button from '@Components/Template/button';
import Input from '@Components/Template/input';
import { getAllDividendes } from '@Local/api/dividende';
import DayJs from '@Utils/DayJs';
import { sub } from '@Utils/Math';
import LeftIcon from '@SVG/Left';
import RightIcon from '@SVG/Right';
import { DayJs as DayJsType } from '@Types/index';

const CalendarContainer: FC = (): JSX.Element => {
  const queryClient = useQueryClient();

  const [month, setMonth] = useState<number>(DayJs().month());
  const [year, setYear] = useState<number>(DayJs().year());
  const [date, setDate] = useState<DayJsType>(DayJs().startOf('month'));
  const [monthError, setMonthError] = useState<string>('');
  const [yearError, setYearError] = useState<string>('');

  var firstDay = date.startOf('month').startOf('week'),
    lastDay = date.endOf('month').endOf('week'),
    totalDays = lastDay.diff(firstDay, 'days') + 1;

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typeYear = z.number().min(2000).max(3000);

    if (e.target.value === '') {
      setYear(DayJs().year());
      setYearError('');
    } else {
      if (typeYear.safeParse(Number(e.target.value)).success) {
        setYear(Number(e.target.value));
        setYearError('');
      } else {
        setYear(DayJs().year());
        setYearError('Invalid year');
      }
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typeMonth = z.number().min(1).max(12);

    if (e.target.value === '') {
      setMonth(DayJs().month());
      setMonthError('');
    } else {
      if (typeMonth.safeParse(Number(e.target.value)).success) {
        setMonth(sub(Number(e.target.value), 1));
        setMonthError('');
      } else {
        setMonth(DayJs().month());
        setMonthError('Invalid month');
      }
    }
  };

  useEffect(
    () => setDate(DayJs().month(month).year(year).startOf('month')),
    [month, year],
  );

  const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) =>
    setDate(date.add(1, 'month'));

  const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) =>
    setDate(date.subtract(1, 'month'));

  return (
    <div className="bg-slate-800 rounded-lg grid grid-rows-6 grid-cols-1 p-4 row-span-6 col-span-4">
      <div className="flex flex-col w-full justify-center row-span-1 gap-y-2 py-2">
        <div className="w-2/4 h-2/4 m-auto flex gap-x-4 items-center">
          <Input
            type="number"
            name="month"
            value={month}
            callback={handleMonthChange}
            error={monthError}
          >
            <></>
          </Input>
          <div className="text-center text-lg">-</div>
          <Input
            type="number"
            name="year"
            value={year}
            callback={handleYearChange}
            error={yearError}
          >
            <></>
          </Input>
        </div>

        <div className="inline-flex justify-center gap-x-3">
          <Button callback={handlePrevMonth}>
            <LeftIcon className="h-8 w-8 fill-slate-200 mx-auto" />
          </Button>

          <div className="text-center text-lg my-auto">
            {date.format('MMMM YYYY')}
          </div>

          <Button callback={handleNextMonth}>
            <RightIcon className="h-8 w-8 fill-slate-200 mx-auto" />
          </Button>
        </div>
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
              'Dividendes',
              (firstDay.add(i, 'days') as DayJsType).format('YYYY-MM-DD'),
            ],
            queryFn: ({ queryKey }) =>
              getAllDividendes({ dateExDividende: queryKey[1] as string }),
          });

          return (
            <CalendarItem key={i} date={firstDay.add(i, 'days') as DayJsType} />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarContainer;
