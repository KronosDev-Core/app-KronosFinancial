import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';

import { getAllDividendes } from '@Local/api/dividende';
import { div, mul, sub } from '@Utils/Math';
import DayJs from '@Utils/DayJs';
import { DayJs as DayJsType, Dividende } from '@Types/index';
import context from '@Context/index';
import Loader from '@Components/Template/loader';

interface CalendarItemProps {
  date: DayJsType;
}

const CalendarItem = ({ date }: CalendarItemProps) => {
  const [calendarDate, setCalendarDate] = useAtom(context.calendar.date);

  const { data, isSuccess, isFetching } = useQuery<Dividende[]>({
    queryKey: ['Dividendes', date.format('YYYY-MM-DD')],
    queryFn: ({ queryKey }) =>
      getAllDividendes({ dateExDividende: queryKey[1] as string }),
    onError: (error) => console.log(error),
    refetchOnWindowFocus: false,
  });
  const [height, setHeight] = useState<number>(0);
  const getHeigthState = useRef(!1);

  useEffect(() => {
    if (!getHeigthState.current) {
      setHeight(Number(document.getElementById('test')?.clientHeight));
      getHeigthState.current = !0;
    }
  });

  window.addEventListener('resize', () =>
    setHeight(Number(document.getElementById('test')?.clientHeight)),
  );

  const handleStoreDate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains('cursor-wait')) return;
    setCalendarDate(date.format('YYYY-MM-DD'));
  };

  return (
    <div
      className={
        'bg-slate-900 rounded-lg w-full h-full p-2 gap-y-2 flex flex-col justify-start transition-all duration-300 ease-in-out hover:z-10 z-0 ' +
        (isFetching ? 'cursor-wait' : 'cursor-pointer') +
        (DayJs().isSame(date, 'day')
          ? ' hover:ring-4 ring-2 ring-offset-2 ring-offset-slate-500/50 hover:ring-slate-900 ring-slate-800'
          : ' hover:ring-4 ring-offset-2 ring-offset-slate-800 ring-slate-900')
      }
      onClick={handleStoreDate}
    >
      <div className="text-center text-lg">{date.date()}</div>

      <div className="w-full h-full" id="test">
        <div className="grid grid-cols-1 grid-flow-row auto-rows-fr justify-start gap-y-1 overflow-hidden">
          {isFetching && <Loader />}
          {isSuccess &&
            !isFetching &&
            data
              .filter(
                (dividende) =>
                  dividende.dateExDividende.split('T')[0] ===
                  date.format('YYYY-MM-DD'),
              )
              .slice(
                0,
                Math.round(
                  div(sub(height, mul(4, Math.round(div(height, 20)))), 30),
                ),
              )
              .map((dividende) => (
                <div
                  key={dividende.id}
                  className="bg-slate-800 rounded-lg h-fit text-sm text-center p-0.5"
                >
                  {dividende.stockSymbol}
                </div>
              ))}
          {isSuccess &&
            !isFetching &&
            data.filter(
              (dividende) =>
                dividende.dateExDividende.split('T')[0] ===
                date.format('YYYY-MM-DD'),
            ).length >
              Math.round(
                div(sub(height, mul(4, Math.round(div(height, 20)))), 30),
              ) && (
              <div className="bg-slate-800 rounded-lg h-fit text-sm text-center p-0.5">
                ...
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CalendarItem;
