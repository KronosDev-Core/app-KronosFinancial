import { FC, SVGProps } from 'react';

import Button from '@Components/Template/button';
import StockSellIcon from '@SVG/StockSell';
import { useMutation } from '@tanstack/react-query';
import refetchStore, { StateRefetch } from '@Local/context/Refetch';
import DayJs from '@Local/utils/DayJs';
import { Buy } from '@Types/index';
import { deleteBuy, updateBuy } from '@Local/api/buy';
import { dividendeFormule } from '@Local/utils/Math';

interface Props extends Buy {
  index: number;
  lastIndex: number;
}

const LineTable: FC<Props> = ({
  id,
  date,
  price,
  amount,
  dividende,
  dividendeId,
  sell,
  index,
  lastIndex,
}): JSX.Element => {
  const RefetchStore = refetchStore((state: StateRefetch) => state.fn);
  lastIndex += 1;

  var propsSvg: SVGProps<SVGSVGElement> = {
    className: 'h-8 w-8 fill-slate-200 mx-auto',
  };

  const DeleteBuy = useMutation({
    mutationFn: deleteBuy,
    onSuccess: () => {
      RefetchStore();
    },
  });

  const handleSell = () => {
    DeleteBuy.mutate(id);
  };

  const DayJs_Date_ExDiv = DayJs(dividende.dateExDividende),
    DayJs_Date_Paiement = DayJs(dividende.datePaiement),
    DayJs_Stock_Price_Date = DayJs(date);

  return (
    <tr className="text-center text-xl h-[5rem] hover:bg-slate-900 rounded-lg transition-all easy-in-out duration-300">
      <td>
        <div className="w-full h-full grid grid-cols-4 grid-rows-1 -my-2">
          <div className="w-full h-full grid grid-cols-1 grid-rows-3 gap-y-3 px-2">
            {
              // End
              ((index + 1) / 2) % 2 === 1 && index + 1 !== 2 ? (
                <>
                  <div className="w-1 h-full bg-blue-500 rounded-t-lg row-span-1" />
                  <div className="w-full h-full row-span-1 border-0 border-l-4 border-b-4 border-blue-500 rounded-bl-lg" />
                </>
              ) : null
            }
            {
              // Middle
              ((index + 1) / 2) % 2 === 0.5 && index + 1 !== 1 ? (
                <>
                  <div className="w-1 h-full bg-blue-500 rounded-lg row-span-1" />
                  <div className="w-1 h-full bg-blue-500 rounded-lg row-span-1" />
                  <div className="w-1 h-full bg-blue-500 rounded-lg row-span-1" />
                </>
              ) : null
            }
            {
              // Start
              ((index + 1) / 2) % 2 === 0 ? (
                <>
                  <div className="w-full h-full row-span-1 row-start-2 border-0 border-l-4 border-t-4 border-blue-500 rounded-tl-lg" />
                  <div className="w-1 h-full bg-blue-500 rounded-b-lg row-span-1 row-start-3" />
                </>
              ) : null
            }
          </div>
          <div className="w-full h-full grid grid-cols-1 grid-rows-3 gap-y-3 px-2">
            {
              // End
              ((index + 1) / 2) % 2 === 0.5 && index + 1 !== 1 ? (
                <>
                  <div className="w-1 h-full bg-green-500 rounded-t-lg row-span-1" />
                  <div className="w-full h-full row-span-1 border-0 border-l-4 border-b-4 border-green-500 rounded-bl-lg" />
                </>
              ) : null
            }
            {
              // Middle
              ((index + 1) / 2) % 2 === 0 ? (
                <>
                  <div className="w-1 h-full bg-green-500 rounded-lg row-span-1" />
                  <div className="w-1 h-full bg-green-500 rounded-lg row-span-1" />
                  <div className="w-1 h-full bg-green-500 rounded-lg row-span-1" />
                </>
              ) : null
            }
            {
              // Start
              ((index + 1) / 2) % 2 === 1.5 ? (
                <>
                  <div className="w-full h-full row-span-1 row-start-2 border-0 border-l-4 border-t-4 border-green-500 rounded-tl-lg" />
                  <div className="w-1 h-full bg-green-500 rounded-b-lg row-span-1 row-start-3" />
                </>
              ) : null
            }
          </div>
          <div className="w-full h-full grid grid-cols-1 grid-rows-3 gap-y-3 px-2">
            {
              // End
              ((index + 1) / 2) % 2 === 0 ? (
                <>
                  <div className="w-1 h-full bg-blue-500 rounded-t-lg row-span-1" />
                  <div className="w-full h-full row-span-1 border-0 border-l-4 border-b-4 border-blue-500 rounded-bl-lg" />
                </>
              ) : null
            }
            {
              // Middle
              ((index + 1) / 2) % 2 === 1.5 ? (
                <>
                  <div className="w-1 h-full bg-blue-500 rounded-lg row-span-1" />
                  <div className="w-1 h-full bg-blue-500 rounded-lg row-span-1" />
                  <div className="w-1 h-full bg-blue-500 rounded-lg row-span-1" />
                </>
              ) : null
            }
            {
              // Start
              ((index + 1) / 2) % 2 === 1 ? (
                <>
                  <div className="w-full h-full row-span-1 row-start-2 border-0 border-l-4 border-t-4 border-blue-500 rounded-tl-lg" />
                  <div className="w-1 h-full bg-blue-500 rounded-b-lg row-span-1 row-start-3" />
                </>
              ) : null
            }
          </div>
          <div className="w-full h-full grid grid-cols-1 grid-rows-3 gap-y-2 px-2">
            {
              // End
              ((index + 1) / 2) % 2 === 1.5 && index + 1 !== 1 ? (
                <>
                  <div className="w-1 h-full bg-green-500 rounded-t-lg row-span-1" />
                  <div className="w-full h-full row-span-1 border-0 border-l-4 border-b-4 border-green-500 rounded-bl-lg" />
                </>
              ) : null
            }
            {
              // Middle
              ((index + 1) / 2) % 2 === 1 ? (
                <>
                  <div className="w-1 h-full bg-green-500 rounded-lg row-span-1" />
                  <div className="w-1 h-full bg-green-500 rounded-lg row-span-1" />
                  <div className="w-1 h-full bg-green-500 rounded-lg row-span-1" />
                </>
              ) : null
            }
            {
              // Start
              ((index + 1) / 2) % 2 === 0.5 ? (
                <>
                  <div className="w-full h-full row-span-1 row-start-2 border-0 border-l-4 border-t-4 border-green-500 rounded-tl-lg" />
                  <div className="w-1 h-full bg-green-500 rounded-b-lg row-span-1 row-start-3" />
                </>
              ) : null
            }
          </div>
        </div>
      </td>
      <td>
        <a
          href={`https://www.etoro.com/fr/markets/${dividende.stock.symbol}`}
          target="_blank"
          className="underline-offset-4 [&:not(:hover)]:underline"
        >
          {dividende.stock.symbol}
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
      <td>
        {DayJs_Stock_Price_Date.isBefore(DayJs_Date_ExDiv)
          ? `~ ${dividendeFormule(
              amount,
              price,
              dividende.dividendePerShare,
            ).toFixed(2)} $`
          : 'N/A'}
      </td>
      <td className="rounded-r-lg">
        <Button callback={handleSell}>
          <StockSellIcon {...propsSvg} />
        </Button>
      </td>
    </tr>
  );
};

export default LineTable;
