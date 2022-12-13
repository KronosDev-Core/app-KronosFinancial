import { FC, SVGProps } from 'react';

import { Buy as BuyType } from '@Types/dataApi';
import { Buy } from '@Types/dataApi';
import Button from '@Components/Template/button';
import StockSellIcon from '@SVG/StockSell';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@Local/utils/Axios';
import refetchStore, { StateRefetch } from '@Local/context/Refetch';
import DayJs from '@Local/utils/DayJs';

const LineTable: FC<Buy> = ({
  _id,
  Symbol,
  Date_ExDiv,
  Date_Paiement,
  Dividende,
  Open,
  Stock_Price,
  Stock_Price_Date,
  Montant,
}): JSX.Element => {
  const RefetchStore = refetchStore((state: StateRefetch) => state.fn);

  var propsSvg: SVGProps<SVGSVGElement> = {
    className: 'h-6 w-6 fill-slate-200',
  };

  const DeleteBuy = useMutation({
    mutationKey: ['createBuy'],
    mutationFn: (data: string): Promise<BuyType> =>
      axiosInstance.delete(`/buy/${data}`).then((res) => res.data),
    onSuccess: () => {
      RefetchStore();
    },
  });

  const UpdateBuy = useMutation({
    mutationKey: ['updateBuy'],
    mutationFn: (data: BuyType): Promise<BuyType> =>
      axiosInstance.put(`/buy/${data._id}`, data).then((res) => res.data),
    onSuccess: () => {
      RefetchStore();
    },
  });

  const handleSell = () => {
    DeleteBuy.mutate(_id as string);
  };

  const handleUpdate = () => {
    UpdateBuy.mutate({
      _id,
      Symbol,
      Date_ExDiv,
      Date_Paiement,
      Dividende: Dividende,
      Open: !Open,
      Stock_Price,
      Stock_Price_Date,
      Montant,
    });
  };

  const DayJs_Date_ExDiv = DayJs(Date_ExDiv),
    DayJs_Date_Paiement = DayJs(Date_Paiement),
    DayJs_Stock_Price_Date = DayJs(Stock_Price_Date);

  return (
    <tr className="text-center text-xl h-[5rem] hover:bg-slate-900 rounded-lg transition-all easy-in-out duration-300">
      <td className="rounded-l-lg">
        <Button callback={handleUpdate}>
          <div
            className={
              'h-3 w-3 m-auto rounded-full ' +
              (Open ? 'bg-green-500' : 'bg-red-500')
            }
          />
        </Button>
      </td>
      <td>
        <a
          href={`https://www.etoro.com/fr/markets/${Symbol}`}
          target="_blank"
          className="underline-offset-4 [&:not(:hover)]:underline"
        >
          {Symbol}
        </a>
      </td>
      <td>
        {DayJs_Stock_Price_Date.format('DD/MM/YYYY') === 'Invalid Date'
          ? 'N/A'
          : DayJs_Stock_Price_Date.format('DD/MM/YYYY')}
      </td>
      <td>
        {
          // @ts-ignore
          DayJs_Date_ExDiv.businessDaysSubtract(1).format('DD/MM/YYYY') ===
          'Invalid Date'
            ? 'N/A' // @ts-ignore
            : DayJs_Date_ExDiv.businessDaysSubtract(1).format('DD/MM/YYYY')
        }
      </td>
      <td>
        {DayJs_Date_ExDiv.format('DD/MM/YYYY') === 'Invalid Date'
          ? 'N/A'
          : DayJs_Date_ExDiv.format('DD/MM/YYYY')}
      </td>
      <td>
        {DayJs_Date_Paiement.format('DD/MM/YYYY') === 'Invalid Date'
          ? 'N/A'
          : DayJs_Date_Paiement.format('DD/MM/YYYY')}
      </td>
      <td>
        {DayJs_Date_ExDiv.format('DD/MM/YYYY') === 'Invalid Date'
          ? 'N/A' // @ts-ignore
          : DayJs_Date_ExDiv.businessDaysAdd(1).format('DD/MM/YYYY')}
      </td>
      <td className="rounded-r-lg">
        {DayJs_Stock_Price_Date.isBefore(DayJs_Date_ExDiv)
          ? `~ ${(
              ((Montant as number) / (Stock_Price as number)) *
              (Dividende as number) *
              0.7
            ).toFixed(2)} $`
          : 'N/A'}
      </td>
      <td>
        <Button callback={handleSell}>
          <StockSellIcon {...propsSvg} />
        </Button>
      </td>
    </tr>
  );
};

export default LineTable;
