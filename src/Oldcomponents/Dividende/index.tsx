import { FC, Suspense, SVGProps, useEffect, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import DayJs from '@Local/utils/DayJs';
import SearchIcon from '@SVG/Search';
import buyDividendeStore, {
  StateBuyDividende,
} from '@Local/context/BuyDividende';
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
import { getAllDividendes, getOneDividende } from '@Local/api/dividende';
import { BuyCreate, Dividende as DividendeType } from '@Types/index';
import { createBuy } from '@Local/api/buy';
import searchStore, { StateSearch } from '@Local/context/Search';
import DividendeCalendar from './DividendeCalendar';
import Input from '@Components/Template/input';
import Button from '@Components/Template/button';

const Dividende: FC = (): JSX.Element => {
  const BuyDividendeStore = buyDividendeStore(
      (state: StateBuyDividende) => state,
    ),
    SearchSymbolStore = searchSymbolStore((state: StateSearchSymbol) => state),
    SearchExDivStore = searchExDivStore((state: StateSearchExDiv) => state),
    SearchAnnualDivStore = searchAnnualDivStore(
      (state: StateSearchAnnualDiv) => state,
    ),
    SearchStore = searchStore((state: StateSearch) => state);

  var propsSvg: SVGProps<SVGSVGElement> = {
    className: 'w-5 h-5 fill-slate-200',
  };

  const HeaderDividendeList: FC = (): JSX.Element => {
    const { ref, inView } = useInView();

    const { data, isSuccess, fetchNextPage, refetch } = useInfiniteQuery({
      queryKey: ['dividendes'],
      queryFn: ({ pageParam }) =>
        getAllDividendes({
          pageParam,
          name:
            SearchSymbolStore.val !== '' ? SearchSymbolStore.val : undefined,
          dateExDividende:
            SearchExDivStore.val !== '' ? SearchExDivStore.val : undefined,
        }),
      getNextPageParam: (..._) => _[1].length,
      onError: (err) => console.log(err),
      refetchOnMount: !1,
      refetchOnWindowFocus: !1,
      refetchOnReconnect: !1,
      refetchInterval: !1,
      refetchIntervalInBackground: !1,
    });

    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [inView]);

    if (isSuccess) {
      data.pages.map((page) => {
        page.map((dividende) => console.log(dividende));
      });
    }

    if (SearchStore.click) {
      console.log('refetch', SearchSymbolStore.val, SearchExDivStore.val);
      refetch();
      SearchStore.set(!1);
    }

    return (
      <div
        className={
          'col-span-1 bg-slate-800 rounded-lg shadow-lg py-4 px-2 ' +
          (BuyDividendeStore.buy !== '' ? 'row-span-3' : 'row-span-5')
        }
      >
        <div className="flex w-full h-full overflow-y-auto overflow-x-hidden col-span-1 row-span-1">
          <table className="table-auto w-full h-fit border-separate border-spacing-y-2">
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
                {isSuccess && data.pages.length > 0
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
                          <DividendeCalendar
                            key={
                              dividende.id
                                ? String(dividende.id)
                                : String(Math.random() * 1000)
                            }
                            {...dividende}
                          />
                        )),
                    )
                  : null}
                <tr
                  ref={ref}
                  className="text-center text-xl h-[5rem] hover:bg-slate-900 rounded-lg transition-all easy-in-out duration-300"
                >
                  <td>
                    <div className="w-full h-full inline-flex justify-center"></div>
                  </td>
                </tr>
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

    const { data, isSuccess } = useQuery<DividendeType>({
      queryKey: ['Dividende', BuyDividendeStore.buy],
      queryFn: ({ queryKey }) => getOneDividende(queryKey[1] as string),
      onError: (err) => console.log(err),
    });

    const createBuyMutation = useMutation({
      mutationKey: ['createBuy'],
      mutationFn: createBuy,
      onSuccess: () => {
        RefetchStore();
      },
    });

    const [StockPrice, setStockPrice] = useState<number>(
      isSuccess ? (data.stock.price as number) : 0,
    );
    const [Montant, setMontant] = useState<number>(0);

    const handleCancel = () => {
      BuyDividendeStore.set('');
    };

    const handleBuyDividende = () => {
      if (isSuccess) {
        var dataForm: BuyCreate = {
          dividendeId: data.id,
          date: DayJs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
          price: StockPrice,
          amount: Montant,
        };
        createBuyMutation.mutate(dataForm);
      }
      handleCancel();
    };

    const handleChangeStockPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStockPrice(Number(e.target.value));
    };

    const handleChangeMontant = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMontant(Number(e.target.value));
    };

    const DayJs_Date_Paiement = isSuccess ? DayJs(data.datePaiement) : DayJs();

    return (
      <div className="col-span-1 row-span-2 bg-slate-800 rounded-lg shadow-lg py-4 px-2">
        <Suspense fallback={<div>Loading...</div>}>
          {isSuccess ? (
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                  Buy {data.stockSymbol} stock
                </p>
                <p className="text-lg">
                  {`${
                    data.stockSymbol
                  } is a stock that is currently dividende at ${
                    data.dividendePerShare
                  }$ per share. If you buy for ${Montant}$ you will get ${
                    StockPrice
                      ? String(
                          (
                            (Montant / StockPrice) *
                            (data.dividendePerShare as number) *
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

            <Button
              callback={() => {
                SearchStore.set(!0);
              }}
            >
              <SearchIcon {...propsSvg} />
            </Button>
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
