import { FC, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import LineTable from './LineTable';
import refetchStore, { StateRefetch } from '@Local/context/Refetch';
import DayJs from '@Local/utils/DayJs';
import { Buy as BuyType } from '@Types/index';
import { getAllBuys } from '@Local/api/buy';

const Buy: FC = (): JSX.Element => {
  const RefetchStore = refetchStore((state: StateRefetch) => state.set);

  const { data, isSuccess, refetch } = useQuery<BuyType[]>({
    queryKey: ['buys'],
    queryFn: getAllBuys,
    onError: (error) => console.log(error),
  });
  RefetchStore(refetch);

  return (
    <div className="col-span-1 row-span-3">
      <div className="grid grid-cols-1 grid-rows-1 h-full overflow-auto gap-2">
        <div className="grid grid-cols-1 grid-rows-1 w-full h-full col-span-1 row-span-2 py-4 px-2 rounded-lg shadow-lg bg-slate-800">
          <div className="flex w-full h-full overflow-y-auto overflow-x-hidden col-span-1 row-span-1">
            <table className="table-auto w-full h-fit border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="text-xl">Peer</th>
                  <th className="text-xl">Symbol</th>
                  <th className="text-xl">Buy</th>
                  <th className="text-xl">Start</th>
                  <th className="text-xl">Ex-Dividende</th>
                  <th className="text-xl">Paiement</th>
                  <th className="text-xl">End</th>
                  <th className="text-xl">Dividende</th>
                  <th className="text-xl">Action</th>
                </tr>
              </thead>
              <tbody className="rounded-xl ">
                <Suspense fallback={<div>Loading...</div>}>
                  {isSuccess && data.length > 0
                    ? data
                        .sort((a, _b) => (a.sell ? -1 : 1))
                        .sort((a, b) =>
                          DayJs(a.date).isAfter(DayJs(b.date)) ? 1 : -1,
                        )
                        .map((buy, idx) => (
                          <LineTable
                            key={buy.id as string}
                            index={idx}
                            lastIndex={data.length - 1}
                            {...buy}
                          />
                        ))
                    : null}
                </Suspense>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
