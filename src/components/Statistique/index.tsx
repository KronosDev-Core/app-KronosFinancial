import { FC, SVGProps } from 'react';

import CalendarIcon from '@SVG/Calendar';
import ClockIcon from '@SVG/Clock';
import MoneyIcon from '@SVG/Money';
import { useQuery } from '@tanstack/react-query';
import DayJs from '@Local/utils/DayJs';
import { Buy, DayJs as DayJsType } from '@Types/index';
import { getAllBuys } from '@Local/api/buy';
import { tonum } from '@Local/utils/type';
import { add, sub, mul, dividendeFormule, div } from '@Local/utils/Math';

const Statistique: FC = (): JSX.Element => {
  const { data, isSuccess } = useQuery<Buy[]>({
    queryKey: ['buys'],
    queryFn: getAllBuys,
    onError: (err) => console.log(err),
  });

  const propsSvg: SVGProps<SVGSVGElement> = {
      className: 'w-8 h-8 fill-slate-200',
    },
    DayJs_Now = DayJs();

  const StatistiqueItem: FC = (): JSX.Element => {
    /* ------------------ Rework Var ------------------ */

    type ObjectTrade = {
      [x: string]: [Number, Number, Number, String[]];
    };
    var meanGainIdx = 0,
      nextTrade: ObjectTrade = {}, // [0] = Buy, [1] = Sell, [2] = Dividende
      nextTradeSumBuy = 0,
      nextTradeSumSell = 0,
      nextTradeSumDiv = 0,
      monthTrade: ObjectTrade = {}, // [0] = Buy, [1] = Sell, [2] = Dividende
      _monthTradeSumBuy = 0, // Not used
      _monthTradeSumSell = 0, // Not used
      monthTradeSumDiv = 0,
      monthNowTrade: ObjectTrade = {}, // [0] = Buy, [1] = Sell, [2] = Dividende
      monthNowTradeSumBuy = 0,
      monthNowTradeSumSell = 0,
      monthNowTradeSumDiv = 0,
      totalTrade: ObjectTrade = {}, // [0] = Buy, [1] = Sell, [2] = Dividende
      totalTradeSumBuy = 0,
      totalTradeSumSell = 0,
      totalTradeSumDiv = 0,
      nextEndStockData = isSuccess
        ? data
            .filter((buy) => buy.sell === null)
            .sort((a, b) =>
              DayJs(a.dividende.dateExDividende)
                .businessDaysAdd(1)
                .isAfter(DayJs(b.date).businessDaysAdd(1))
                ? 1
                : -1,
            )
        : null;

    const nextEndStock: String =
      nextEndStockData && nextEndStockData?.length > 0
        ? nextEndStockData[0].dividende.dateExDividende
        : '';

    if (isSuccess) {
      meanGainIdx = data.length;
      data.map((buy: Buy) => {
        /* ------------------ Rework ------------------ */
        // Next Trade

        var DayJs_Stock_Price_Date = DayJs(buy.date),
          DayJs_Date_ExDiv = DayJs(buy.dividende.dateExDividende),
          DayJs_Date_Paiement = DayJs(buy.dividende.datePaiement);

        var nT_SPD = nextTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')],
          nT_DED =
            nextTrade[DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')],
          nT_DP = nextTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')],
          mT_SPD = monthTrade[DayJs_Stock_Price_Date.format('MM/YYYY')],
          mT_DED1 =
            monthTrade[
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ],
          mT_DP = monthTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')],
          mNT_SPD = monthNowTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')],
          mNT_DED1 =
            monthNowTrade[
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ],
          mNT_DP = monthNowTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')],
          tT_SPD = totalTrade[DayJs_Stock_Price_Date.format('DD/MM/YYYY')],
          tT_DED1 =
            totalTrade[
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')
            ],
          tT_DP = totalTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')];

        nT_SPD = nT_SPD ? nT_SPD : [0, 0, 0, []];
        nT_DED = nT_DED ? nT_DED : [0, 0, 0, []];
        nT_DP = nT_DP ? nT_DP : [0, 0, 0, []];
        mT_SPD = mT_SPD ? mT_SPD : [0, 0, 0, []];
        mT_DED1 = mT_DED1 ? mT_DED1 : [0, 0, 0, []];
        mT_DP = mT_DP ? mT_DP : [0, 0, 0, []];
        mNT_SPD = mNT_SPD ? mNT_SPD : [0, 0, 0, []];
        mNT_DED1 = mNT_DED1 ? mNT_DED1 : [0, 0, 0, []];
        mNT_DP = mNT_DP ? mNT_DP : [0, 0, 0, []];
        tT_SPD = tT_SPD ? tT_SPD : [0, 0, 0, []];
        tT_DED1 = tT_DED1 ? tT_DED1 : [0, 0, 0, []];
        tT_DP = tT_DP ? tT_DP : [0, 0, 0, []];

        // Buy
        if (DayJs_Stock_Price_Date.isSameOrBefore(DayJs_Now)) {
          if (
            Object.keys(nextTrade).includes(
              DayJs_Stock_Price_Date.format('DD/MM/YYYY'),
            )
          ) {
            nT_SPD[0] = add(nT_SPD[0], buy.amount);
            nT_SPD[3].push(buy.dividende.stockSymbol);
          } else {
            nT_SPD = [buy.amount, 0, 0, [buy.dividende.stockSymbol]];
          }
        }

        // Sell
        if (
          DayJs_Date_ExDiv.businessDaysAdd(1).isBefore(DayJs_Now) ||
          DayJs_Date_ExDiv.businessDaysAdd(1).isSame(DayJs_Now)
        ) {
          if (
            Object.keys(nextTrade).includes(
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY'),
            )
          ) {
            nT_DED[1] = add(nT_DED[1], buy.amount);
            nT_DED[3].push(buy.dividende.stockSymbol);
          } else {
            nT_DED = [0, buy.amount, 0, [buy.dividende.stockSymbol]];
          }
        }

        // Dividende
        if (DayJs_Date_Paiement.isSameOrBefore(DayJs_Now)) {
          if (
            Object.keys(nextTrade).includes(
              DayJs_Date_Paiement.format('DD/MM/YYYY'),
            )
          ) {
            nT_DP[2] = dividendeFormule(
              buy.amount,
              buy.price,
              buy.dividende.dividendePerShare,
            );
            nT_DP[3].push(buy.dividende.stockSymbol);
          } else {
            nT_DP = [
              0,
              0,
              dividendeFormule(
                buy.amount,
                buy.price,
                buy.dividende.dividendePerShare,
              ),
              [buy.dividende.stockSymbol],
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
            mT_SPD[0] = add(mT_SPD[0], buy.amount);
            mT_SPD[3].push(buy.dividende.stockSymbol);
          } else {
            mT_SPD = [buy.amount, 0, 0, [buy.dividende.stockSymbol]];
          }
        }

        // Sell
        if (DayJs_Date_ExDiv.businessDaysAdd(1).isSame(DayJs_Now, 'month')) {
          if (
            Object.keys(monthTrade).includes(
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY'),
            )
          ) {
            mT_DED1[1] = add(mT_DED1[1], buy.amount);
            mT_DED1[3].push(buy.dividende.stockSymbol);
          } else {
            mT_DED1 = [0, buy.amount, 0, [buy.dividende.stockSymbol]];
          }
        }

        // Dividende
        if (DayJs_Date_Paiement.isSame(DayJs_Now, 'month')) {
          if (
            Object.keys(monthTrade).includes(
              DayJs_Date_Paiement.format('DD/MM/YYYY'),
            )
          ) {
            mT_DP[2] = dividendeFormule(
              buy.amount,
              buy.price,
              buy.dividende.dividendePerShare,
            );
            mT_DP[3].push(buy.dividende.stockSymbol);
          } else {
            monthTrade[DayJs_Date_Paiement.format('DD/MM/YYYY')] = [
              0,
              0,
              dividendeFormule(
                buy.amount,
                buy.price,
                buy.dividende.dividendePerShare,
              ),
              [buy.dividende.stockSymbol],
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
            mNT_SPD[0] = add(mNT_SPD[0], buy.amount);
            mNT_SPD[3].push(buy.dividende.stockSymbol);
          } else {
            mNT_SPD = [buy.amount, 0, 0, [buy.dividende.stockSymbol]];
          }
        }

        // Sell
        if (
          DayJs_Date_ExDiv.businessDaysAdd(1).isBefore(DayJs_Now) &&
          DayJs_Date_ExDiv.businessDaysAdd(1).isSame(DayJs_Now, 'month')
        ) {
          if (
            Object.keys(monthNowTrade).includes(
              DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY'),
            )
          ) {
            mNT_DED1[1] = add(mNT_DED1[1], buy.amount);
            mNT_DED1[3].push(buy.dividende.stockSymbol);
          } else {
            mNT_DED1 = [0, buy.amount, 0, [buy.dividende.stockSymbol]];
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
            mNT_DP[2] = dividendeFormule(
              buy.amount,
              buy.price,
              buy.dividende.dividendePerShare,
            );
            mNT_DP[3].push(buy.dividende.stockSymbol);
          } else {
            mNT_DP = [
              0,
              0,
              dividendeFormule(
                buy.amount,
                buy.price,
                buy.dividende.dividendePerShare,
              ),
              [buy.dividende.stockSymbol],
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
          tT_SPD[0] = add(tT_SPD[0], buy.amount);
          tT_SPD[3].push(buy.dividende.stockSymbol);
        } else {
          tT_SPD = [buy.amount, 0, 0, [buy.dividende.stockSymbol]];
        }

        // Sell
        if (
          Object.keys(totalTrade).includes(
            DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY'),
          )
        ) {
          tT_DED1[1] = add(tT_DED1[1], buy.amount);
          tT_DED1[3].push(buy.dividende.stockSymbol);
        } else {
          tT_DED1 = [0, buy.amount, 0, [buy.dividende.stockSymbol]];
        }

        // Dividende
        if (
          Object.keys(totalTrade).includes(
            DayJs_Date_Paiement.format('DD/MM/YYYY'),
          )
        ) {
          tT_DP[2] = dividendeFormule(
            buy.amount,
            buy.price,
            buy.dividende.dividendePerShare,
          );
          tT_DP[3].push(buy.dividende.stockSymbol);
        } else {
          tT_DP = [
            0,
            0,
            dividendeFormule(
              buy.amount,
              buy.price,
              buy.dividende.dividendePerShare,
            ),
            [buy.dividende.stockSymbol],
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
        nextTradeSumBuy = tonum(add(nextTradeSumBuy, trade[1][0]));
        nextTradeSumSell = tonum(add(nextTradeSumSell, trade[1][1]));
        nextTradeSumDiv = tonum(add(nextTradeSumDiv, trade[1][2]));
      });

      Object.entries(monthTrade).map((trade) => {
        _monthTradeSumBuy = tonum(add(_monthTradeSumBuy, trade[1][0]));
        _monthTradeSumSell = tonum(add(_monthTradeSumSell, trade[1][1]));
        monthTradeSumDiv = tonum(add(monthTradeSumDiv, trade[1][2]));
      });

      Object.entries(monthNowTrade).map((trade) => {
        monthNowTradeSumBuy = tonum(add(monthNowTradeSumBuy, trade[1][0]));
        monthNowTradeSumSell = tonum(add(monthNowTradeSumSell, trade[1][1]));
        monthNowTradeSumDiv = tonum(add(monthNowTradeSumDiv, trade[1][2]));
      });

      Object.entries(totalTrade).map((trade) => {
        totalTradeSumBuy = tonum(add(totalTradeSumBuy, trade[1][0]));
        totalTradeSumSell = tonum(add(totalTradeSumSell, trade[1][1]));
        totalTradeSumDiv = tonum(add(totalTradeSumDiv, trade[1][2]));
      });
    }

    return (
      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2">
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Total $ */}
          <p className="text-4xl">
            {isSuccess
              ? `${add(
                  sub(
                    add(
                      sub(nextTradeSumSell, nextTradeSumBuy),
                      nextTradeSumDiv,
                    ),
                    sub(nextTradeSumSell, nextTradeSumBuy),
                  ),
                  200,
                ).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Invest $ */}
          <p className="text-4xl">
            {isSuccess
              ? `${mul(sub(nextTradeSumSell, nextTradeSumBuy), -1).toFixed(
                  2,
                )} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Restant $ */}
          <p className="text-4xl">
            {isSuccess
              ? `${sub(
                  add(sub(nextTradeSumSell, nextTradeSumBuy), nextTradeSumDiv),
                  sub(nextTradeSumSell, nextTradeSumBuy),
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
              ? `${add(
                  sub(monthNowTradeSumBuy, monthNowTradeSumSell),
                  monthNowTradeSumDiv,
                ).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Month total dividende restant */}
          <p className="text-4xl">
            {isSuccess
              ? `~ ${sub(monthTradeSumDiv, monthNowTradeSumDiv).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Invest dividende possible */}
          <p className="text-4xl">
            {isSuccess
              ? `~ ${mul(
                  div(totalTradeSumDiv, meanGainIdx),
                  div(
                    sub(
                      div(DayJs_Now.businessDaysInMonth().length, 3),
                      DayJs_Now.businessDaysInMonth().filter(
                        (date: DayJsType) => date.isBefore(DayJs_Now),
                      ).length,
                    ),
                    3,
                  ),
                ).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Next date end invest dividende (DateExDiv+3Day) */}
          <p className="text-4xl">
            {nextEndStock !== ''
              ? DayJs(nextEndStock).businessDaysAdd(1).format('DD/MM/YYYY')
              : nextEndStock}
          </p>
          <ClockIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/*  */}
          <p className="text-4xl">
            {isSuccess
              ? Math.floor(
                  tonum(div(DayJs_Now.businessDaysInMonth().length, 3)),
                )
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
