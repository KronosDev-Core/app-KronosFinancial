import { FC, Suspense, SVGProps, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import {
  Dividende as DividendeType,
  Buy as BuyType,
  CreateBuy as CreateBuyType,
} from '@Types/dataApi';
import DividendeCalendar from '@Components/Dividende/DividendeCalendar';
import axiosInstance from '@Local/utils/Axios';
import Input from '@Components/Template/input';
import SearchIcon from '@SVG/Search';
import ClockIcon from '@SVG/Clock';
import buyDividendeStore, {
  StateBuyDividende,
} from '@Local/context/BuyDividende';
import Button from '@Components/Template/button';
import TradingUpIcon from '@SVG/TradingUp';
import MoneyIcon from '@SVG/Money';
import refetchStore, { StateRefetch } from '@Local/context/Refetch';

const Dividende: FC = (): JSX.Element => {
  const BuyDividendeStore = buyDividendeStore(
    (state: StateBuyDividende) => state,
  );

  var propsSvg: SVGProps<SVGSVGElement> = {
    className: 'w-5 h-5 fill-slate-200',
  };

  const HeaderDividendeList: FC = (): JSX.Element => {
    const { data, isSuccess } = useQuery<DividendeType[]>({
      queryKey: ['dividendes'],
      queryFn: (): Promise<DividendeType[]> =>
        axiosInstance.get('/dividendes').then((res) => res.data),
      onError: (err) => console.log(err),
    });

    const [Search, setSearch] = useState<string>('');
    const [Secteur, setSecteur] = useState<string>('');
    const [DivAnnuel, setDivAnnuel] = useState<number>(0);
    const [Sort, setSort] = useState<string>('');

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

    return (
      <>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center gap-y-2 py-4 px-2">
          <p className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dividend calendar
          </p>
          <div className="inline-flex w-full justify-center gap-x-3 px-4">
            <Input
              name="Search by symbol"
              type="text"
              callback={handleChangeSearch}
              value={Search}
            >
              <SearchIcon {...propsSvg} />
            </Input>

            <Input
              name="Search by secteur"
              type="text"
              callback={handleChangeSecteur}
              value={Secteur}
            >
              <SearchIcon {...propsSvg} />
            </Input>

            <Input
              name="Search by annual dividend"
              type="number"
              callback={handleChangeDivAnnuel}
              value={DivAnnuel}
            >
              <SearchIcon {...propsSvg} />
            </Input>
          </div>
        </div>

        <div
          className={
            'col-span-1 bg-slate-800 rounded-lg shadow-lg py-4 px-2 ' +
            (BuyDividendeStore.buy !== '' ? 'row-span-3' : 'row-span-5')
          }
        >
          <div className="flex w-full h-full overflow-y-auto overflow-x-hidden col-span-1 row-span-1">
            <table className="table-fixed w-full h-fit border-separate border-spacing-y-2">
              <thead>
                <tr className="">
                  <th className="text-xl">Symbol</th>
                  <th className="text-xl">Secteur</th>
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
                  <th className="text-xl">Div Annuel</th>
                  <th className="text-xl">Action</th>
                </tr>
              </thead>
              <tbody className="rounded-xl ">
                <Suspense fallback={<div>Loading...</div>}>
                  {isSuccess && data.length > 0
                    ? data
                        .filter((dividende) =>
                          Search !== ''
                            ? dividende.Symbol.toLowerCase().includes(
                                Search.toLowerCase(),
                              )
                            : true,
                        )
                        .filter((dividende) =>
                          Sort !== ''
                            ? dayjs(
                                Object.values(dividende)[
                                  Object.keys(dividende).indexOf(Sort)
                                ],
                              ).isAfter(dayjs())
                            : true,
                        )
                        .filter((dividende) =>
                          Secteur !== ''
                            ? dividende.Secteur.toLowerCase().includes(
                                Secteur.toLowerCase(),
                              )
                            : true,
                        )
                        .filter((dividende) =>
                          DivAnnuel !== null
                            ? dividende.Div_Annuel >= DivAnnuel
                            : true,
                        )
                        .sort((a, b) => {
                          if (
                            dayjs(a.Date_ExDiv as string).isBefore(
                              dayjs(b.Date_Paiement as string),
                            )
                          ) {
                            return 1;
                          }
                          if (
                            dayjs(a.Date_ExDiv as string).isAfter(
                              dayjs(b.Date_Paiement as string),
                            )
                          ) {
                            return -1;
                          }
                          return 0;
                        })
                        .map((dividende) => (
                          <DividendeCalendar
                            key={
                              dividende._id
                                ? String(dividende._id)
                                : String(Math.random() * 1000)
                            }
                            {...dividende}
                          />
                        ))
                    : null}
                </Suspense>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const BuyStock: FC = (): JSX.Element => {
    const BuyDividendeStore = buyDividendeStore(
      (state: StateBuyDividende) => state,
    );
    const RefetchStore = refetchStore((state: StateRefetch) => state.fn);

    const { data, isSuccess } = useQuery<DividendeType[]>({
      queryKey: ['dividende', BuyDividendeStore.buy],
      queryFn: (): Promise<DividendeType[]> =>
        axiosInstance
          .get(`/dividende/${BuyDividendeStore.buy}`)
          .then((res) => res.data),
      onError: (err) => console.log(err),
    });

    const createBuy = useMutation({
      mutationKey: ['createBuy'],
      mutationFn: (data: CreateBuyType): Promise<BuyType> =>
        axiosInstance.post(`/buys`, data).then((res) => res.data),
      onSuccess: () => {
        RefetchStore();
      },
    });

    const [StockPrice, setStockPrice] = useState(0);
    const [StockPriceDate, setStockPriceDate] = useState('');
    const [Montant, setMontant] = useState(0);

    const handleCancel = () => {
      BuyDividendeStore.set('');
    };

    const handleBuyDividende = () => {
      var dataForm: CreateBuyType = {
        Symbol: (data as DividendeType[])[0].Symbol,
        Date_ExDiv: (data as DividendeType[])[0].Date_ExDiv,
        Date_Paiement: (data as DividendeType[])[0].Date_Paiement,
        Div_Annuel: (data as DividendeType[])[0].Div_Annuel,
        Open: !0,
        Stock_Price: StockPrice,
        Stock_Price_Date: dayjs(StockPriceDate).format(),
        Montant: Montant,
      };

      if (isSuccess && dataForm) {
        createBuy.mutate(dataForm);
      }
      handleCancel();
    };

    const handleChangeStockPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStockPrice(Number(e.target.value));
    };

    const handleChangeMontant = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMontant(Number(e.target.value));
    };

    const handleChangeStockPriceDate = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      var value = e.target.value.split('/');
      setStockPriceDate(`${value[2]}-${value[1]}-${value[0]}`);
    };

    return (
      <div className="col-span-1 row-span-2 bg-slate-800 rounded-lg shadow-lg py-4 px-2">
        <Suspense fallback={<div>Loading...</div>}>
          {isSuccess && data.length > 0 ? (
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                  Buy {data[0].Symbol} stock
                </p>
                <p className="text-lg">
                  {`${
                    data[0].Symbol
                  } is a stock that is currently dividende at ${
                    data[0].Div_Annuel
                  }$ per share. ${
                    dayjs(StockPriceDate as string).isBefore(
                      dayjs(data[0].Date_ExDiv as string),
                    )
                      ? `If you buy for 100$ you will get ${
                          StockPrice
                            ? String(
                                (
                                  (Montant / StockPrice) *
                                  (data[0].Div_Annuel as number) *
                                  0.7
                                ).toFixed(2),
                              )
                            : ''
                        }$ dividend (30% tax)${
                          dayjs(data[0].Date_Paiement as string).format(
                            'DD/MM/YYYY',
                          ) === 'Invalid Date'
                            ? '.'
                            : `, le ${dayjs(
                                data[0].Date_Paiement as string,
                              ).format('DD/MM/YYYY')}`
                        }`
                      : ''
                  }`}
                </p>
              </div>

              <div className="inline-flex w-full justify-center gap-x-3 px-4">
                <Input
                  type="number"
                  name="Stock Price"
                  callback={handleChangeStockPrice}
                >
                  <TradingUpIcon {...propsSvg} />
                </Input>
                <Input
                  type="number"
                  name="Montant"
                  callback={handleChangeMontant}
                >
                  <MoneyIcon {...propsSvg} />
                </Input>
                <Input
                  type="text"
                  name="Date d'achat"
                  callback={handleChangeStockPriceDate}
                  defaultValue={StockPriceDate}
                >
                  <ClockIcon {...propsSvg} />
                </Input>
              </div>

              <div className="flex justify-center gap-x-4">
                <Button callback={handleBuyDividende}>Buy</Button>
                <Button callback={handleCancel}>Cancel</Button>
              </div>
            </div>
          ) : null}
        </Suspense>
      </div>
    );
  };

  return (
    <div className="col-span-1 row-span-1">
      <div className="w-full h-full grid grid-cols-1 grid-rows-6 gap-2 ">
        <HeaderDividendeList />

        {BuyDividendeStore.buy !== '' && <BuyStock />}
      </div>
    </div>
  );
};

export default Dividende;
