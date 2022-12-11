import { FC, SVGProps } from 'react';
import dayjs, { Dayjs } from 'dayjs';
// @ts-ignore
import dayjsBusinessDays from 'dayjs-business-days';

import CalendarIcon from '@SVG/Calendar';
import ClockIcon from '@SVG/Clock';
import MoneyIcon from '@SVG/Money';
import { Buy as BuyType } from '@Types/dataApi';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@Local/utils/Axios';

dayjs.extend(dayjsBusinessDays);

const Statistique: FC = (): JSX.Element => {
  const { data, isSuccess } = useQuery<BuyType[]>({
    queryKey: ['buys'],
    queryFn: (): Promise<BuyType[]> =>
      axiosInstance.get('/buys').then((res) => res.data),
    onError: (err) => console.log(err),
  });

  var propsSvg: SVGProps<SVGSVGElement> = {
    className: 'w-8 h-8 fill-slate-200',
  };

  const StatistiqueItem: FC = (): JSX.Element => {
    var Total = 200,
      Invest = 0,
      MonthTotalDividende = 0,
      MonthGain = 0,
      MonthGainRestant = 0,
      meanGain = 0,
      meanGainIdx = 0,
      nextEndStock = '';

    if (isSuccess) {
      data.map((buy: BuyType) => {
        meanGainIdx += 1;
        meanGain +=
          ((buy.Montant as number) / (buy.Stock_Price as number)) *
          (buy.Div_Annuel as number) *
          0.7;

        nextEndStock = (data as BuyType[])
          .filter((buy) => buy.Open)
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
          })[0].Date_ExDiv as string;

        if (dayjs(buy.Stock_Price_Date as string).isSame(dayjs(), 'month')) {
          MonthTotalDividende += buy.Montant as number;
        }

        if (dayjs(buy.Date_Paiement as string).isSame(dayjs(), 'month')) {
          if (dayjs(buy.Date_Paiement as string).isBefore(dayjs())) {
            MonthGain +=
              ((buy.Montant as number) / (buy.Stock_Price as number)) *
              (buy.Div_Annuel as number) *
              0.7;
          }

          if (dayjs(buy.Date_Paiement as string).isAfter(dayjs())) {
            MonthGainRestant +=
              ((buy.Montant as number) / (buy.Stock_Price as number)) *
              (buy.Div_Annuel as number) *
              0.7;
          }
        }

        if (buy.Open) {
          Invest += buy.Montant as number;
        } else {
          Total += buy.Montant as number;
        }

        if (
          dayjs(buy.Stock_Price_Date as string).isBefore(
            dayjs(buy.Date_ExDiv as string),
          ) &&
          !buy.Open
        ) {
          Total +=
            ((buy.Montant as number) / (buy.Stock_Price as number)) *
            (buy.Div_Annuel as number) *
            0.7;
        }
      });
    }

    return (
      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2">
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Total $ */}
          <p className="text-4xl">{isSuccess ? `${Total.toFixed(2)} $` : ''}</p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Invest $ */}
          <p className="text-4xl">
            {isSuccess ? `${Invest.toFixed(2)} $` : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Restant $ */}
          <p className="text-4xl">
            {isSuccess ? `${(Total - Invest).toFixed(2)} $` : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Month total dividende invest */}
          <p className="text-4xl">
            {isSuccess ? `${MonthTotalDividende.toFixed(2)} $` : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Month gain $ */}
          <p className="text-4xl">
            {isSuccess ? `${MonthGain.toFixed(2)} $` : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Month total dividende restant */}
          <p className="text-4xl">
            {isSuccess ? `~ ${MonthGainRestant.toFixed(2)} $` : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Invest dividende possible */}
          <p className="text-4xl">
            {isSuccess
              ? `~ ${(
                  (meanGain / meanGainIdx) * // @ts-ignore
                  (dayjs().businessDaysInMonth().length / 3 -
                    dayjs() // @ts-ignore
                      .businessDaysInMonth()
                      .filter((date: Dayjs) => date.isBefore(dayjs())).length /
                      3)
                ).toFixed(2)} $`
              : ''}
          </p>
          <MoneyIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/* Next date end invest dividende (DateExDiv+3Day) */}
          <p className="text-4xl">
            {isSuccess // @ts-ignore
              ? dayjs(nextEndStock).businessDaysAdd(2).format('DD/MM/YYYY')
              : ''}
          </p>
          <ClockIcon {...propsSvg} />
        </div>
        <div className="col-span-1 row-span-1 bg-slate-800 rounded-lg shadow-lg flex flex-col justify-center items-center gap-y-3">
          {/*  */}
          <p className="text-4xl">
            {isSuccess // @ts-ignore
              ? Math.floor(dayjs().businessDaysInMonth().length / 3)
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
