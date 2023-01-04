import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { getAllDividendes } from '@Local/api/dividende';
import { div, mul, sub } from '@Local/utils/Math';
import { DayJs as DayJsType, Dividende } from '@Types/index';
import calendarStore, { StateCalendar } from '@Context/Calendar';
import DayJs from '@Local/utils/DayJs';

interface CalendarItemProps {
  date: DayJsType;
}

const CalendarItem = ({ date }: CalendarItemProps) => {
  const CalendarStore = calendarStore((state: StateCalendar) => state);
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
    CalendarStore.set(date);
  };

  console.log(CalendarStore.val);

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
          {isFetching && (
            <div className="w-fit h-fit m-auto">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
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
