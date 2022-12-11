import { FC } from 'react';
import Dividende from '@Components/Dividende';
import Statistique from '@Components/Statistique';
import Buy from '@Components/Buy';

const App: FC = (): JSX.Element => (
  <div className="w-full h-full grid grid-cols-2 grid-rows-1 bg-slate-700 gap-4 p-2 lining-nums tabular-nums text-slate-200">
    <div className='col-span-1 row-span-1 grid grid-cols-1 grid-rows-6 gap-4'>
      <Statistique />
      <Buy />
    </div>
    <Dividende />
  </div>
);

export default App;
