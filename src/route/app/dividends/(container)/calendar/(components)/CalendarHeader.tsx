import LeftIcon from '@Assets/icons/Left';
import RightIcon from '@Assets/icons/Right';
import Button from '@Components/button';
import Input from '@Components/input';
import AppStore from '@Store/index';
import DayJs from '@Utils/DayJs';
import { sub } from '@Utils/Math';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export default function CalendarHeader() {
  const [date, setDate] = useAtom(AppStore.calendar.calendar);

  const [month, setMonth] = useState<number>(DayJs().month());
  const [year, setYear] = useState<number>(DayJs().year());
  const [monthError, setMonthError] = useState<string>('');
  const [yearError, setYearError] = useState<string>('');

  useEffect(
    () => setDate(DayJs().month(month).year(year).startOf('month')),
    [month, year],
  );

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

  const handleNextMonth = (_e: React.MouseEvent<HTMLButtonElement>) =>
    setDate(date.add(1, 'month'));

  const handlePrevMonth = (_e: React.MouseEvent<HTMLButtonElement>) =>
    setDate(date.subtract(1, 'month'));

  return (
    <>
      <div className="w-2/4 h-2/4 m-auto flex gap-x-4 items-center">
        <Input
          type="number"
          name="month"
          value={month}
          callback={handleMonthChange}
          error={monthError}
        />
        <div className="text-center text-lg">-</div>
        <Input
          type="number"
          name="year"
          value={year}
          callback={handleYearChange}
          error={yearError}
        />
      </div>

      <div className="inline-flex justify-center gap-x-3">
        <Button callback={handlePrevMonth}>
          <LeftIcon className="h-8 w-8 fill-slate-200 mx-auto" />
        </Button>

        <div className="text-center text-lg my-auto flex gap-x-2">
          {date.format('MMMM')} - {date.format('YYYY')}
        </div>

        <Button callback={handleNextMonth}>
          <RightIcon className="h-8 w-8 fill-slate-200 mx-auto" />
        </Button>
      </div>
    </>
  );
}
