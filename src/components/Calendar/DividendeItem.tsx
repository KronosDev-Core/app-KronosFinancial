import { useAtom } from 'jotai';

import context from '@Context/index';
import DayJs from '@Utils/DayJs';
import { Dividende } from '@Types/index';

const DividendeItem = ({ item }: { item: Dividende }) => {
  const [calendarDividend, setCalendarDividend] = useAtom(
    context.calendar.dividende,
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
          <p className="text-lg row-span-2 row-start-2 text-center">
            {DayJs(item.dateExDividende).format('DD/MM/YYYY')}
          </p>
          <p className="text-sm italic row-span-1 row-start-4 text-clip text-center">
            date Ex-Dividende
          </p>
        </div>
        <div className="w-1 h-[90%] bg-slate-800 rounded-lg col-span-1 mx-1" />
        <div className="col-span-1 grid grid-cols-1 grid-rows-5 justify-center items-center h-full w-full">
          <p className="text-lg row-span-2 row-start-2 text-center">{`${item.dividendePerShare}$`}</p>
          <p className="text-sm italic row-span-1 row-start-4 text-clip text-center">
            per share
          </p>
        </div>
      </div>
    </div>
  );
};

export default DividendeItem;
