import { Dividende } from '@Types/dataApi';
import { FC, SVGProps } from 'react';
import dayjs from 'dayjs';
import buyDividendeStore, {
  StateBuyDividende,
} from '@Local/context/BuyDividende';
import Button from '@Components/Template/button';
import StockBuyIcon from '@SVG/StockBuy';

const DividendeCalendar: FC<Dividende> = ({
  _id,
  Symbol,
  Date_ExDiv,
  Date_Paiement,
  Dividende,
}: Dividende): JSX.Element => {
  const BuyDividendeStore = buyDividendeStore(
    (state: StateBuyDividende) => state,
  );

  var propsSvg: SVGProps<SVGSVGElement> = {
    className: 'h-6 w-6 fill-slate-200',
  };

  return (
    <tr className="text-center text-xl h-[5rem] hover:bg-slate-900 rounded-lg transition-all easy-in-out duration-300">
      <td className="rounded-l-lg">
        <a
          href={`https://www.etoro.com/fr/markets/${Symbol}`}
          target="_blank"
          className="underline-offset-4 [&:not(:hover)]:underline"
        >
          {Symbol}
        </a>
      </td>
      <td>
        {dayjs(Date_ExDiv as string).format('DD/MM/YYYY') === 'Invalid Date'
          ? 'N/A'
          : dayjs(Date_ExDiv as string).format('DD/MM/YYYY')}
      </td>
      <td>
        {dayjs(Date_Paiement as string).format('DD/MM/YYYY') === 'Invalid Date'
          ? 'N/A'
          : dayjs(Date_Paiement as string).format('DD/MM/YYYY')}
      </td>
      <td className="slashed-zero lining-nums tabular-nums">{`${Dividende} $`}</td>
      <td className="rounded-r-lg">
        <Button
          callback={() => BuyDividendeStore.set(_id ? _id.toString() : '')}
        >
          <StockBuyIcon {...propsSvg} />
        </Button>
      </td>
    </tr>
  );
};

export default DividendeCalendar;
