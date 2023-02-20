import { useAtom } from 'jotai';

import { Dividend } from '@Types/index';
import AppStore from '@Store/index';
import { dividend } from '@Utils/Math';

export default function DividendItem({ item }: { item: Dividend }) {
  const [calendarDividend, setCalendarDividend] = useAtom(
    AppStore.calendar.dividend,
  );

  return (
    <div
      className={
        'bg-slate-900 w-full h-20 rounded-lg transition-all duration-300 ease-in-out hover:z-10 z-0' +
        (calendarDividend === item.id
          ? ' hover:ring-4 ring-2 ring-offset-2 ring-offset-slate-500/50 hover:ring-slate-900 ring-slate-800'
          : ' hover:ring-4 ring-offset-2 ring-offset-slate-800 ring-slate-900')
      }
      onClick={() => setCalendarDividend(item.id)}
    >
      <div className="grid grid-rows-1 grid-flow-col auto-cols-auto items-center justify-evenly w-full h-full">
        <div className="col-span-1 grid grid-cols-1 grid-rows-5 justify-center items-center h-full w-full">
          <p className="text-lg row-span-2 row-start-2 text-center">
            {item.stockSymbol}
          </p>
          <p className="text-sm italic row-span-1 row-start-4 text-clip text-center">
            {item.stock.name}
          </p>
        </div>
        <div className="w-1 h-[90%] bg-slate-800 rounded-lg col-span-1 mx-1" />
        <div className="col-span-1 grid grid-cols-1 grid-rows-5 justify-center items-center h-full w-full">
          <p className="text-lg row-span-2 row-start-2 text-center">{`${item.stock.price}$`}</p>
          <p className="text-sm italic row-span-1 row-start-4 text-clip text-center">
            price
          </p>
        </div>
        <div className="w-1 h-[90%] bg-slate-800 rounded-lg col-span-1 mx-1" />
        <div className="col-span-1 grid grid-cols-1 grid-rows-5 justify-center items-center h-full w-full">
          <p className="text-lg row-span-2 row-start-2 text-center">{`${item.dividendPerShare}$`}</p>
          <p className="text-sm italic row-span-1 row-start-4 text-clip text-center">
            per share
          </p>
        </div>
        <div className="w-1 h-[90%] bg-slate-800 rounded-lg col-span-1 mx-1" />
        <div className="col-span-1 grid grid-cols-1 grid-rows-5 justify-center items-center h-full w-full">
          <p className="text-lg row-span-2 row-start-2 text-center">
            {item.stock.price && item.stock.price > 0
              ? String(
                  dividend(
                    100,
                    item.stock.price,
                    item.dividendPerShare,
                  ).toFixed(2),
                )
              : '0'}
          </p>
          <p className="text-sm italic row-span-1 row-start-4 text-clip text-center">
            dividend (30% tax)
          </p>
        </div>
      </div>
    </div>
  );
}
