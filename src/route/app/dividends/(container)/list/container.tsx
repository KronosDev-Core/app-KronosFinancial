import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAtom } from 'jotai';

import AppStore from '@Store/index';
import { getAllDividends } from '@Lib/api/dividend';
import Loader from '@Components/loader';
import DayJs from '@Utils/DayJs';
import { Dividend } from '@Types/index';
import DividendItem from './(components)/DividendItem';

export default function ListContainer() {
  const { inView } = useInView();
  const [calendarDate] = useAtom(AppStore.calendar.date);
  const [calendarDividend, setCalendarDividend] = useAtom(
    AppStore.calendar.dividend,
  );
  const dividendSet = useRef(!1);

  const { data, isSuccess, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['dividends', calendarDate],
    queryFn: ({ queryKey, pageParam }) =>
      getAllDividends({
        pageParam,
        dateExDividend: queryKey[1] as string,
        strict: true,
      }),
    getNextPageParam: (..._) => _[1].length,
    onError: (err) => console.log(err),
    refetchOnWindowFocus: !1,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="row-span-4 col-span-2 bg-slate-800 rounded-lg grid grid-rows-[repeat(8,_minmax(0,_1fr))] grid-cols-1 p-4">
      <div className="text-2xl text-center row-span-1 my-auto">
        {DayJs(calendarDate).format('MMMM D, YYYY')}
      </div>

      <div className="row-[span_7_/_span_7] grid grid-cols-1 grid-rows-1 overflow-y-auto">
        <div className="col-span-1 row-span-1 flex flex-col justify-center gap-y-2 h-fit p-2">
          {isFetching && <Loader />}
          {isSuccess && !isFetching && data.pages.length > 0
            ? data.pages.map((page) =>
                page
                  .sort(
                    (a, b) =>
                      a.dividendPerShare -
                      b.dividendPerShare +
                      DayJs(a.dateExDividend).unix() -
                      DayJs(b.dateExDividend).unix(),
                  )
                  .map((dividend: Dividend) => {
                    if (calendarDividend === '' && !dividendSet.current) {
                      setCalendarDividend(dividend.id);
                      dividendSet.current = !0;
                    }
                    return <DividendItem key={dividend.id} item={dividend} />;
                  }),
              )
            : null}
        </div>
      </div>
    </div>
  );
}
