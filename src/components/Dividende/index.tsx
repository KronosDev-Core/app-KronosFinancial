import { FC, Suspense, SVGProps, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import DayJs from '@Local/utils/DayJs';
import {
  Dividende as DividendeType,
  Buy as BuyType,
  CreateBuy as CreateBuyType,
} from '@Types/dataApi';
import DividendeCalendar from '@Components/Dividende/DividendeCalendar';
import axiosInstance from '@Local/utils/Axios';
import Input from '@Components/Template/input';
import SearchIcon from '@SVG/Search';
import buyDividendeStore, {
  StateBuyDividende,
} from '@Local/context/BuyDividende';
import Button from '@Components/Template/button';
import TradingUpIcon from '@SVG/TradingUp';
import MoneyIcon from '@SVG/Money';
import refetchStore, { StateRefetch } from '@Local/context/Refetch';
import searchSymbolStore, {
  StateSearchSymbol,
} from '@Local/context/SearchSymbol';
import searchExDivStore, { StateSearchExDiv } from '@Local/context/SearchExDiv';
import searchAnnualDivStore, {
  StateSearchAnnualDiv,
} from '@Local/context/SearchAnnualDiv';
import TrashIcon from '@SVG/Trash';

const Dividende: FC = (): JSX.Element => {
  const BuyDividendeStore = buyDividendeStore(
      (state: StateBuyDividende) => state,
    ),
    SearchSymbolStore = searchSymbolStore((state: StateSearchSymbol) => state),
    SearchExDivStore = searchExDivStore((state: StateSearchExDiv) => state),
    SearchAnnualDivStore = searchAnnualDivStore(
      (state: StateSearchAnnualDiv) => state,
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

    return (
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
                <th className="text-xl">Status</th>
                <th className="text-xl">Symbol</th>
                <th className="text-xl">Ex-Dividende</th>
                <th className="text-xl">Paiement</th>
                <th className="text-xl">Dividende</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody className="rounded-xl ">
              <Suspense fallback={<div>Loading...</div>}>
                {isSuccess && data.length > 0
                  ? data
                      .filter((dividende) =>
                        SearchSymbolStore.val !== ''
                          ? dividende.Symbol.toLowerCase().includes(
                              SearchSymbolStore.val.toLowerCase(),
                            )
                          : !0,
                      )
                      .filter((dividende) =>
                        SearchExDivStore.val !== ''
                          ? DayJs(dividende.Date_ExDiv).format('YYYY-MM-DD') ===
                            DayJs(SearchExDivStore.val).format('YYYY-MM-DD')
                          : !0,
                      )
                      .filter((dividende) =>
                        SearchAnnualDivStore.val !== 0
                          ? dividende.Dividende >= SearchAnnualDivStore.val
                          : !0,
                      )
                      // sort by DivAnnuel and ExDiv
                      .sort(
                        (a, b) =>
                          (a.Dividende as number) -
                          (b.Dividende as number) +
                          DayJs(a.Date_ExDiv).unix() -
                          DayJs(b.Date_ExDiv).unix(),
                      )
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
    const [Montant, setMontant] = useState(0);

    const handleCancel = () => {
      BuyDividendeStore.set('');
    };

    const handleBuyDividende = () => {
      var dataForm: CreateBuyType = {
        IdStockDividende: (data as DividendeType[])[0]._id,
        Open: !0,
        Stock_Price: StockPrice,
        Stock_Price_Date: DayJs((data as DividendeType[])[0].Date_ExDiv) // @ts-ignore
          .businessDaysSubtract(1)
          .format(),
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

    const DayJs_Date_Paiement =
      isSuccess && data.length > 0 ? DayJs(data[0].Date_Paiement) : DayJs();

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
                    data[0].Dividende
                  }$ per share. If you buy for ${Montant}$ you will get ${
                    StockPrice
                      ? String(
                          (
                            (Montant / StockPrice) *
                            (data[0].Dividende as number) *
                            0.7
                          ).toFixed(2),
                        )
                      : '0'
                  }$ dividend (30% tax)${
                    DayJs_Date_Paiement.format('DD/MM/YYYY') === 'Invalid Date'
                      ? '.'
                      : `, le ${DayJs_Date_Paiement.format('DD/MM/YYYY')}.`
                  }`}
                </p>
              </div>

              <div className="inline-flex w-3/4 mx-auto justify-center gap-x-3 px-4">
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
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center gap-y-2 py-4 px-2">
          <p className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dividend calendar
          </p>
          <div className="inline-flex w-full justify-center gap-x-3 px-4">
            <Input
              name="Search by symbol"
              type="text"
              callback={(e) => SearchSymbolStore.set(e.target.value)}
              defaultValue={SearchSymbolStore.val}
            >
              <SearchIcon {...propsSvg} />
            </Input>

            <Input
              name="Search by ex-dividende"
              type="text"
              callback={(e) => SearchExDivStore.set(e.target.value)}
              defaultValue={SearchExDivStore.val}
            >
              <SearchIcon {...propsSvg} />
            </Input>

            <Input
              name="Search by dividend"
              type="number"
              callback={(e) => SearchAnnualDivStore.set(Number(e.target.value))}
              defaultValue={SearchAnnualDivStore.val}
            >
              <SearchIcon {...propsSvg} />
            </Input>
            <Button
              callback={() => {
                SearchSymbolStore.set('');
                SearchExDivStore.set('');
                SearchAnnualDivStore.set(0);
              }}
            >
              <TrashIcon {...propsSvg} />
            </Button>
          </div>
        </div>
        <HeaderDividendeList />

        {BuyDividendeStore.buy !== '' && <BuyStock />}
      </div>
    </div>
  );
};

export default Dividende;
