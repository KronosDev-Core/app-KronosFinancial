import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';

import { Dayjs } from '@Lib/dayjs';
import AppStore from '@Store/index';
import { Dividend } from '@Types/index';
import { getAllDividends } from '@Lib/api/dividend';
import DayJs from '@Utils/DayJs';
import Loader from '@Components/loader';
import { add, div, mul, sub } from '@Utils/Math';

interface CalendarItemProps {
  date: Dayjs;
}

export default function CalendarItem({ date }: CalendarItemProps) {
  const [, setCalendarDate] = useAtom(AppStore.calendar.date);
  const [, setCalendarDividend] = useAtom(AppStore.calendar.dividend);
  const beforeSetId = useRef<boolean>(false);

  const { data, isSuccess, isFetching } = useQuery<Dividend[]>({
    queryKey: ['Dividends', date.format('YYYY-MM-DD')],
    queryFn: ({ queryKey }) =>
      getAllDividends({ dateExDividend: queryKey[1] as string }),
    onError: (error) => console.log(error),
    refetchOnWindowFocus: false,
  });
  const [height, setHeight] = useState<number>(0);
  const getHeightState = useRef(!1);

  useEffect(() => {
    if (!getHeightState.current) {
      setHeight(Number(document.getElementById('test')?.clientHeight));
      getHeightState.current = !0;
    }
  });

  window.addEventListener('resize', () =>
    setHeight(Number(document.getElementById('test')?.clientHeight)),
  );

  const handleStore = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains('cursor-wait')) return;

    if (!beforeSetId.current) {
      // false
      if (e.currentTarget.id === 'group') {
        // id === 'group' && false
        handleStoreDate(e);
      } else {
        // id !== 'group' && false
        handleStoreId(e);
        beforeSetId.current = !0;
      }
    } else {
      // true
      if (e.currentTarget.id === 'group') {
        // id === 'group' && true
        beforeSetId.current = !1;
      } else {
        // id !== 'group' && true
        handleStoreId(e);
      }
    }
  };

  const handleStoreDate = (e: React.MouseEvent<HTMLDivElement>) => {
    setCalendarDate(date.format('YYYY-MM-DD'));
    if (isSuccess && !isFetching && data?.length) {
      setCalendarDividend(
        data.sort((a, b) =>
          add(
            sub(a.dividendPerShare, b.dividendPerShare),
            sub(DayJs(a.dateExDividend).unix(), DayJs(b.dateExDividend).unix()),
          ),
        )[0].id,
      );
    } else {
      setCalendarDividend('');
    }
  };

  const handleStoreId = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains('cursor-wait')) return;
    setCalendarDate(date.format('YYYY-MM-DD'));
    setCalendarDividend(e.currentTarget.id);
  };

  return (
    <div
      id="group"
      className={
        'bg-slate-900 rounded-lg w-full h-full p-2 gap-y-2 flex flex-col justify-start transition-all duration-300 ease-in-out hover:z-10 z-10 ' +
        (isFetching ? 'cursor-wait' : 'cursor-pointer') +
        (DayJs().isSame(date, 'day')
          ? ' hover:ring-4 ring-2 ring-offset-2 ring-offset-slate-500/50 hover:ring-slate-900 ring-slate-800'
          : ' hover:ring-4 ring-offset-2 ring-offset-slate-800 ring-slate-900')
      }
      onClick={handleStore}
    >
      <div className="text-center text-lg">{date.date()}</div>

      <div className="w-full h-full" id="test">
        <div className="grid grid-cols-1 grid-flow-row auto-rows-fr justify-start gap-y-1 overflow-hidden">
          {isFetching && <Loader />}
          {isSuccess &&
            !isFetching &&
            data
              .filter(
                (dividend) =>
                  dividend.dateExDividend.split('T')[0] ===
                  date.format('YYYY-MM-DD'),
              )
              .slice(
                0,
                Math.round(
                  div(sub(height, mul(4, Math.round(div(height, 20)))), 30),
                ),
              )
              .map((dividend) => (
                <div
                  key={dividend.id}
                  id={dividend.id}
                  className="bg-slate-800 rounded-lg h-fit text-sm text-center p-0.5 z-0"
                  onClick={handleStore}
                >
                  {dividend.stockSymbol}
                </div>
              ))}
          {isSuccess &&
            !isFetching &&
            data.filter(
              (dividend) =>
                dividend.dateExDividend.split('T')[0] ===
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
}
