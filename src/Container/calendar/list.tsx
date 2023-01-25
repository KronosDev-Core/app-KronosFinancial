import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAtom } from 'jotai';

import DividendeItem from '@Components/Calendar/DividendeItem';
import { getAllDividendes } from '@Local/api/dividende';
import DayJs from '@Utils/DayJs';
import Loader from '@Components/Template/loader';
import context from '@Context/index';

const ListContainer: FC = (): JSX.Element => {
  const { ref, inView } = useInView();
  const [calendarDate, setCalendarDate] = useAtom(context.calendar.date);
  const [calendarDividend, setCalendarDividend] = useAtom(context.calendar.dividende);
  const dividendSet = useRef(!1)

  const { data, isSuccess, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['dividendes', calendarDate],
    queryFn: ({ queryKey, pageParam }) =>
      getAllDividendes({
        pageParam,
        dateExDividende: queryKey[1] as string,
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
                      (a.dividendePerShare as number) -
                      (b.dividendePerShare as number) +
                      DayJs(a.dateExDividende).unix() -
                      DayJs(b.dateExDividende).unix(),
                  )
                  .map((dividende) => {
                    if (calendarDividend === '' && !dividendSet.current) {
                      setCalendarDividend(dividende.id);
                      dividendSet.current = !0;
                    }
                    return (
                    <DividendeItem
                      key={
                        dividende.id
                          ? String(dividende.id)
                          : String(Math.random() * 1000)
                      }
                      item={dividende}
                    />
                  )}),
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
