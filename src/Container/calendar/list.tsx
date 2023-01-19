import DividendeItem from '@Components/Calendar/DividendeItem';
import calendarStore, { StateCalendar } from '@Context/Calendar';
import { getAllDividendes } from '@Local/api/dividende';
import DayJs from '@Local/utils/DayJs';
import { Dividende } from '@Types/index';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ListContainer: FC = (): JSX.Element => {
  const CalendarStore = calendarStore((state: StateCalendar) => state);
  const { ref, inView } = useInView();

  const { data, isSuccess, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['dividendes', DayJs(CalendarStore.val).format('YYYY-MM-DD')],
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
        {DayJs(CalendarStore.val).format('MMMM D, YYYY')}
      </div>

      <div className="row-[span_7_/_span_7] grid grid-cols-1 grid-rows-1 overflow-y-auto px-2">
        <div className="col-span-1 row-span-1 flex flex-col justify-center gap-y-2 h-fit">
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
                  .map((dividende) => (
                    <DividendeItem
                      key={
                        dividende.id
                          ? String(dividende.id)
                          : String(Math.random() * 1000)
                      }
                      item={dividende}
                    />
                  )),
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
