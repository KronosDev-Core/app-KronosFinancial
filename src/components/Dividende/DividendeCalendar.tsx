import { FC, SVGProps } from 'react';

import DayJs from '@Local/utils/DayJs';
import buyDividendeStore, {
  StateBuyDividende,
} from '@Local/context/BuyDividende';
import Button from '@Components/Template/button';
import StockBuyIcon from '@SVG/StockBuy';
import AddIcon from '@SVG/Add';
import UpdateIcon from '@SVG/Update';
import { Dividende, Status } from '@Types/index';

const DividendeCalendar: FC<Dividende> = ({
  id,
  dateExDividende,
  datePaiement,
  dividendePerShare,
  status,
  stockSymbol,
  stock,
  buy,
}: Dividende): JSX.Element => {
  const BuyDividendeStore = buyDividendeStore(
    (state: StateBuyDividende) => state,
  );

  var propsSvg: SVGProps<SVGSVGElement> = {
    className: 'h-8 w-8 fill-slate-200  mx-auto',
  };

  const DayJs_Exdiv = DayJs(dateExDividende).format('DD/MM/YYYY'),
    DayJs_Paiement = DayJs(datePaiement).format('DD/MM/YYYY');

  return (
    <tr className="text-center text-xl h-[5rem] hover:bg-slate-900 rounded-lg transition-all easy-in-out duration-300">
      <td className="rounded-l-lg">
        {status === Status.NEW ? (
          <AddIcon {...propsSvg} />
        ) : status === Status.UPDATED ? (
          <UpdateIcon {...propsSvg} />
        ) : null}
      </td>
      <td>
        <a
          href={`https://www.etoro.com/fr/markets/${stockSymbol}`}
          target="_blank"
          className="underline-offset-4 [&:not(:hover)]:underline"
        >
          {stockSymbol}
        </a>
      </td>
      <td>{DayJs_Exdiv === 'Invalid Date' ? 'N/A' : DayJs_Exdiv}</td>
      <td>{DayJs_Paiement === 'Invalid Date' ? 'N/A' : DayJs_Paiement}</td>
      <td className="slashed-zero lining-nums tabular-nums">{`${dividendePerShare} $`}</td>
      <td className="rounded-r-lg">
        <Button
          callback={() => BuyDividendeStore.set(id ? id.toString() : '')}
        >
          <StockBuyIcon {...propsSvg} />
        </Button>
      </td>
    </tr>
  );
};

export default DividendeCalendar;
