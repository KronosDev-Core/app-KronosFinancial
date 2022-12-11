import { FC, Suspense, SVGProps, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Buy as BuyType } from '@Types/dataApi';
import Input from '@Components/Template/input';
import SearchIcon from '@SVG/Search';
import ClockIcon from '@SVG/Clock';
import LineTable from './LineTable';
import axiosInstance from '@Local/utils/Axios';
import refetchStore, { StateRefetch } from '@Local/context/Refetch';

const Buy: FC = (): JSX.Element => {
  const RefetchStore = refetchStore((state: StateRefetch) => state.set);

  const [Search, setSearch] = useState<string>('');
  const [Secteur, setSecteur] = useState<string>('');
  const [DivAnnuel, setDivAnnuel] = useState<number>(0);
  const [Sort, setSort] = useState<string>('');

  const { data, isSuccess, refetch } = useQuery<BuyType[]>({
    queryKey: ['buys'],
    queryFn: (): Promise<BuyType[]> =>
      axiosInstance.get('/buys').then((res) => res.data),
    onError: (error) => console.log(error),
  });
  RefetchStore(refetch);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeSecteur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecteur(e.target.value);
  };

  const handleChangeDivAnnuel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDivAnnuel(Number(e.target.value.replace(',', '.')));
  };

  const handleSort = (name: string) => {
    if (Sort === name) setSort('');
    else setSort(name);
  };

  var propsSvg: SVGProps<SVGSVGElement> = {
    className: 'w-5 h-5 fill-slate-200',
  };

  return (
    <div className="col-span-1 row-span-3">
      <div className="grid grid-cols-1 grid-rows-3 h-full overflow-auto gap-2">
        <div className="col-span-1 row-span-1 h-full flex flex-col justify-center py-4 px-2 rounded-lg shadow-lg bg-slate-800">
          <p className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            List stock
          </p>
          <div className="inline-flex w-full justify-center gap-x-3 px-4">
            <Input
              name="Search by symbol"
              type="text"
              callback={handleChangeSearch}
            >
              <SearchIcon {...propsSvg} />
            </Input>

            <Input
              name="Search by secteur"
              type="text"
              callback={handleChangeSecteur}
            >
              <SearchIcon {...propsSvg} />
            </Input>

            <Input
              name="Search by annual dividend"
              type="number"
              callback={handleChangeDivAnnuel}
            >
              <SearchIcon {...propsSvg} />
            </Input>
          </div>
        </div>

        <div className="grid grid-cols-1 grid-rows-1 w-full h-full col-span-1 row-span-2 py-4 px-2 rounded-lg shadow-lg bg-slate-800">
          <div className="flex w-full h-full overflow-y-auto overflow-x-hidden col-span-1 row-span-1">
            <table className="table-fixed w-full h-fit border-separate border-spacing-y-2">
              <thead>
                <tr className="">
                  <th className="text-xl">Open</th>
                  <th className="text-xl">Symbol</th>
                  <th className="text-xl">
                    <div>
                      ExDiv
                      <button
                        className="mx-2"
                        onClick={() => handleSort('Date_ExDiv')}
                      >
                        <ClockIcon {...propsSvg} />
                      </button>
                    </div>
                  </th>
                  <th className="text-xl">
                    <div>
                      Paiement
                      <button
                        className="mx-2"
                        onClick={() => handleSort('Date_Paiement')}
                      >
                        <ClockIcon {...propsSvg} />
                      </button>
                    </div>
                  </th>
                  <th className="text-xl">Buy</th>
                  <th className="text-xl">Dividende</th>
                  <th className="text-xl">Action</th>
                </tr>
              </thead>
              <tbody className="rounded-xl ">
                <Suspense fallback={<div>Loading...</div>}>
                  {isSuccess && data.length > 0
                    ? data
                        .filter((buy) =>
                          Search !== ''
                            ? buy.Symbol.toLowerCase().includes(
                                Search.toLowerCase(),
                              )
                            : true,
                        )
                        .filter((buy) =>
                          Sort !== ''
                            ? dayjs(
                                Object.values(buy)[
                                  Object.keys(buy).indexOf(Sort)
                                ],
                              ).isAfter(dayjs())
                            : true,
                        )
                        .filter((buy) =>
                          DivAnnuel !== null
                            ? buy.Div_Annuel >= DivAnnuel
                            : true,
                        )
                        .map((buy) => (
                          <LineTable
                            key={
                              buy._id
                                ? String(buy._id)
                                : String(Math.random() * 1000)
                            }
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
