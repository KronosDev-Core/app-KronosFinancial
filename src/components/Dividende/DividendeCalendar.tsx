import { FC, SVGProps } from 'react';

import { Dividende } from '@Types/dataApi';
import DayJs from '@Local/utils/DayJs';
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

  const DayJs_Exdiv = DayJs(Date_ExDiv).format('DD/MM/YYYY'),
    DayJs_Paiement = DayJs(Date_Paiement).format('DD/MM/YYYY');

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
      <td>{DayJs_Exdiv === 'Invalid Date' ? 'N/A' : DayJs_Exdiv}</td>
      <td>{DayJs_Paiement === 'Invalid Date' ? 'N/A' : DayJs_Paiement}</td>
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
