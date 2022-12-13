import { FC, SVGProps } from 'react';

import CalendarIcon from '@SVG/Calendar';
import ClockIcon from '@SVG/Clock';
import MoneyIcon from '@SVG/Money';
import { Buy as BuyType } from '@Types/dataApi';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@Local/utils/Axios';
import DayJs from '@Local/utils/DayJs';

const Statistique: FC = (): JSX.Element => {
  const { data, isSuccess } = useQuery<BuyType[]>({
    queryKey: ['buys'],
    queryFn: (): Promise<BuyType[]> =>
      axiosInstance.get('/buys').then((res) => res.data),
    onError: (err) => console.log(err),
  });

  const propsSvg: SVGProps<SVGSVGElement> = {
      className: 'w-8 h-8 fill-slate-200',
    },
    DayJs_Now = DayJs();

  const StatistiqueItem: FC = (): JSX.Element => {
    /* ------------------ Rework Var ------------------ */

    var meanGainIdx = 0,
      nextTrade: { [x: string]: [number, number, number, string[]] } = {}, // [0] = Buy, [1] = Sell, [2] = Dividende
      nextTradeSumBuy = 0,
      nextTradeSumSell = 0,
      nextTradeSumDiv = 0,
      monthTrade: { [x: string]: [number, number, number, string[]] } = {}, // [0] = Buy, [1] = Sell, [2] = Dividende
      _monthTradeSumBuy = 0, // Not used
      _monthTradeSumSell = 0, // Not used
      monthTradeSumDiv = 0,
      monthNowTrade: { [x: string]: [number, number, number, string[]] } = {}, // [0] = Buy, [1] = Sell, [2] = Dividende
      monthNowTradeSumBuy = 0,
      monthNowTradeSumSell = 0,
      monthNowTradeSumDiv = 0,
      totalTrade: { [x: string]: [number, number, number, string[]] } = {}, // [0] = Buy, [1] = Sell, [2] = Dividende
      totalTradeSumBuy = 0,
      totalTradeSumSell = 0,
      totalTradeSumDiv = 0,
      nextEndStock = (data as BuyType[])
        .filter((buy) => buy.Open)
        .sort((a, b) =>
          DayJs(a.Date_ExDiv) // @ts-ignore
            .businessDaysAdd(1)
            .isAfter(
              DayJs(b.Stock_Price_Date) // @ts-ignore
                .businessDaysAdd(1),
            )
            ? 1
            : -1,
        )[0].Date_ExDiv;

    if (isSuccess) {
      meanGainIdx = data.length;
      data.map((buy: BuyType) => {
        /* ------------------ Rework ------------------ */
        // Next Trade

        var DayJs_Stock_Price_Date = DayJs(buy.Stock_Price_Date),
          DayJs_Date_ExDiv = DayJs(buy.Date_ExDiv),
          DayJs_Date_Paiement = DayJs(buy.Date_Paiement);

        // Buy
        if (DayJs_Stock_Price_Date.isSameOrBefore(DayJs_Now)) {
          if (
            Object.keys(nextTrade).includes(
              DayJs_Stock_Price_Date.format('DD/MM/YYYY'),
            )
          ) {
            nextTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')][0] +=
              buy.Montant as number;
            nextTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')][3].push(
              buy.Symbol as string,
            );
          } else {
            nextTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')] = [
              buy.Montant as number,
              0,
              0,
              [buy.Symbol as string],
            ];
          }
        }

        // Sell
        if (
          // @ts-ignore
          DayJs_Date_ExDiv.businessDaysAdd(1).isBefore(DayJs_Now) || // @ts-ignore
          DayJs_Date_ExDiv.businessDaysAdd(1).isSame(DayJs_Now)
        ) {
          if (
            Object.keys(nextTrade).includes(
              // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY'),
            )
          ) {
            nextTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ][1] += buy.Montant as number;
            nextTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ][3]
              .push(buy.Symbol as string);
          } else {
            nextTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ] = [0, buy.Montant as number, 0, [buy.Symbol as string]];
          }
        }

        // Dividende
        if (DayJs_Date_Paiement.isSameOrBefore(DayJs_Now)) {
          if (
            Object.keys(nextTrade).includes(
              DayJs_Date_Paiement.format('DD/MM/YYYY'),
            )
          ) {
            nextTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')][2] +=
              ((buy.Montant as number) / (buy.Stock_Price as number)) *
              (buy.Dividende as number) *
              0.7;
            nextTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')][3].push(
              buy.Symbol as string,
            );
          } else {
            nextTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')] = [
              0,
              0,
              ((buy.Montant as number) / (buy.Stock_Price as number)) *
                (buy.Dividende as number) *
                0.7,
              [buy.Symbol as string],
            ];
          }
        }

        // Month Trade

        // Buy
        if (DayJs_Stock_Price_Date.isSame(DayJs_Now, 'month')) {
          if (
            Object.keys(monthTrade).includes(
              DayJs_Stock_Price_Date.format('DD/MM/YYYY'),
            )
          ) {
            monthTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')][0] +=
              buy.Montant as number;
            monthTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')][3].push(
              buy.Symbol as string,
            );
          } else {
            monthTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')] = [
              buy.Montant as number,
              0,
              0,
              [buy.Symbol as string],
            ];
          }
        }

        // Sell
        if (
          // @ts-ignore
          DayJs_Date_ExDiv.businessDaysAdd(1).isSame(DayJs_Now, 'month')
        ) {
          if (
            Object.keys(monthTrade).includes(
              // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY'),
            )
          ) {
            monthTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ][1] += buy.Montant as number;
            monthTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ][3]
              .push(buy.Symbol as string);
          } else {
            monthTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ] = [0, buy.Montant as number, 0, [buy.Symbol as string]];
          }
        }

        // Dividende
        if (DayJs_Date_Paiement.isSame(DayJs_Now, 'month')) {
          if (
            Object.keys(monthTrade).includes(
              DayJs_Date_Paiement.format('DD/MM/YYYY'),
            )
          ) {
            monthTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')][2] +=
              ((buy.Montant as number) / (buy.Stock_Price as number)) *
              (buy.Dividende as number) *
              0.7;
            monthTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')][3].push(
              buy.Symbol as string,
            );
          } else {
            monthTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')] = [
              0,
              0,
              ((buy.Montant as number) / (buy.Stock_Price as number)) *
                (buy.Dividende as number) *
                0.7,
              [buy.Symbol as string],
            ];
          }
        }

        // Month & Now Trade

        // Buy
        if (
          DayJs_Stock_Price_Date.isBefore(DayJs_Now) &&
          DayJs_Stock_Price_Date.isSame(DayJs_Now, 'month')
        ) {
          if (
            Object.keys(monthNowTrade).includes(
              DayJs_Stock_Price_Date.format('DD/MM/YYYY'),
            )
          ) {
            monthNowTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')][0] +=
              buy.Montant as number;
            monthNowTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')][3].push(
              buy.Symbol as string,
            );
          } else {
            monthNowTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')] = [
              buy.Montant as number,
              0,
              0,
              [buy.Symbol as string],
            ];
          }
        }

        // Sell
        if (
          // @ts-ignore
          DayJs_Date_ExDiv.businessDaysAdd(1).isBefore(DayJs_Now) && // @ts-ignore
          DayJs_Date_ExDiv.businessDaysAdd(1).isSame(DayJs_Now, 'month')
        ) {
          if (
            Object.keys(monthNowTrade).includes(
              // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY'),
            )
          ) {
            monthNowTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ][1] += buy.Montant as number;
            monthNowTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ][3]
              .push(buy.Symbol as string);
          } else {
            monthNowTrade[ // @ts-ignore
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ] = [0, buy.Montant as number, 0, [buy.Symbol as string]];
          }
        }

        // Dividende
        if (
          DayJs_Date_Paiement.isBefore(DayJs_Now) &&
          DayJs_Date_Paiement.isSame(DayJs_Now, 'month')
        ) {
          if (
            Object.keys(monthNowTrade).includes(
              DayJs_Date_Paiement.format('DD/MM/YYYY'),
            )
          ) {
            monthNowTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')][2] +=
              ((buy.Montant as number) / (buy.Stock_Price as number)) *
              (buy.Dividende as number) *
              0.7;
            monthNowTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')][3].push(
              buy.Symbol as string,
            );
          } else {
            monthNowTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')] = [
              0,
              0,
              ((buy.Montant as number) / (buy.Stock_Price as number)) *
                (buy.Dividende as number) *
                0.7,
              [buy.Symbol as string],
            ];
          }
        }

        // Total Trade

        // Buy
        if (
          Object.keys(totalTrade).includes(
            DayJs_Stock_Price_Date.format('DD/MM/YYYY'),
          )
        ) {
          totalTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')][0] +=
            buy.Montant as number;
          totalTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')][3].push(
            buy.Symbol as string,
          );
        } else {
          totalTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')] = [
            buy.Montant as number,
            0,
            0,
            [buy.Symbol as string],
          ];
        }

        // Sell
        if (
          Object.keys(totalTrade).includes(
            // @ts-ignore
            DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY'),
          )
        ) {
          totalTrade[ // @ts-ignore
            DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
          ][1] += buy.Montant as number;
          totalTrade[ // @ts-ignore
            DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
          ][3]
            .push(buy.Symbol as string);
        } else {
          // @ts-ignore
          totalTrade[DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')] =
            [0, buy.Montant as number, 0, [buy.Symbol as string]];
        }

        // Dividende
        if (
          Object.keys(totalTrade).includes(
            DayJs_Date_Paiement.format('DD/MM/YYYY'),
          )
        ) {
          totalTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')][2] +=
            ((buy.Montant as number) / (buy.Stock_Price as number)) *
            (buy.Dividende as number) *
            0.7;
          totalTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')][3].push(
            buy.Symbol as string,
          );
        } else {
          totalTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')] = [
            0,
            0,
            ((buy.Montant as number) / (buy.Stock_Price as number)) *
              (buy.Dividende as number) *
              0.7,
            [buy.Symbol as string],
          ];
        }
      });

      // sort by date
      nextTrade = Object.fromEntries(
        Object.entries(nextTrade).sort((a, b) =>
          DayJs(a[0]).isAfter(DayJs(b[0])) ? 1 : -1,
        ),
      );
      monthTrade = Object.fromEntries(
        Object.entries(monthTrade).sort((a, b) =>
          DayJs(a[0]).isAfter(DayJs(b[0])) ? 1 : -1,
        ),
      );
      monthNowTrade = Object.fromEntries(
        Object.entries(monthNowTrade).sort((a, b) =>
          DayJs(a[0]).isAfter(DayJs(b[0])) ? 1 : -1,
        ),
      );
      totalTrade = Object.fromEntries(
        Object.entries(totalTrade).sort((a, b) =>
          DayJs(a[0]).isAfter(DayJs(b[0])) ? 1 : -1,
        ),
      );

      // somme des montants
      Object.entries(nextTrade).map((trade) => {
        nextTradeSumBuy += trade[1][0];
        nextTradeSumSell += trade[1][1];
        nextTradeSumDiv += trade[1][2];
      });

      Object.entries(monthTrade).map((trade) => {
        _monthTradeSumBuy += trade[1][0];
        _monthTradeSumSell += trade[1][1];
        monthTradeSumDiv += trade[1][2];
      });

      Object.entries(monthNowTrade).map((trade) => {
        monthNowTradeSumBuy += trade[1][0];
        monthNowTradeSumSell += trade[1][1];
        monthNowTradeSumDiv += trade[1][2];
      });

      Object.entries(totalTrade).map((trade) => {
        totalTradeSumBuy += trade[1][0];
        totalTradeSumSell += trade[1][1];
        totalTradeSumDiv += trade[1][2];
      });
    }

    return (
      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2">
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Total $ */}
          <p className="text-4xl">
            {isSuccess
              ? `${(
                  nextTradeSumSell -
                  nextTradeSumBuy +
                  nextTradeSumDiv -
                  (nextTradeSumSell - nextTradeSumBuy) +
                  200
                ).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Invest $ */}
          <p className="text-4xl">
            {isSuccess
              ? `${((nextTradeSumSell - nextTradeSumBuy) * -1).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Restant $ */}
          <p className="text-4xl">
            {isSuccess
              ? `${(
                  nextTradeSumSell -
                  nextTradeSumBuy +
                  nextTradeSumDiv -
                  (nextTradeSumSell - nextTradeSumBuy)
                ).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Month total dividende invest */}
          <p className="text-4xl">
            {isSuccess ? `${monthNowTradeSumBuy.toFixed(2)} $` : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Month gain $ */}
          <p className="text-4xl">
            {isSuccess
              ? `${(
                  monthNowTradeSumBuy -
                  monthNowTradeSumSell +
                  monthNowTradeSumDiv
                ).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Month total dividende restant */}
          <p className="text-4xl">
            {isSuccess
              ? `~ ${(monthTradeSumDiv - monthNowTradeSumDiv).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Invest dividende possible */}
          <p className="text-4xl">
            {isSuccess
              ? `~ ${(
                  (totalTradeSumDiv / meanGainIdx) * // @ts-ignore
                  (DayJs_Now.businessDaysInMonth().length / 3 - // @ts-ignore
                    DayJs_Now.businessDaysInMonth().filter((date: Dayjs) =>
                      date.isBefore(DayJs_Now),
                    ).length /
                      3)
                ).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Next date end invest dividende (DateExDiv+3Day) */}
          <p className="text-4xl">
            {isSuccess
              ? DayJs(nextEndStock) // @ts-ignore
                  .businessDaysAdd(1)
                  .format('DD/MM/YYYY')
              : ''}
          </p>
          <ClockIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/*  */}
          <p className="text-4xl">
            {isSuccess // @ts-ignore
              ? Math.floor(DayJs_Now.businessDaysInMonth().length / 3)
              : ''}
          </p>
          <CalendarIcon {...propsSvg} />
        </div>
      </div>
    );
  };

  return (
    <div className="col-span-1 row-span-3">
      {isSuccess && data.length > 0 ? <StatistiqueItem /> : null}
    </div>
  );
};

export default Statistique;
