import { FC } from 'react';
import Calendar from './(container)/calendar/container';
import Form from './(container)/form/container';
import List from './(container)/list/container';

const Layout: FC = (): JSX.Element => {
  return (
    <div className="w-full h-full grid grid-cols-6 grid-rows-6 bg-slate-700 gap-4 p-2 lining-nums tabular-nums text-slate-200">
      <List />
      <Calendar />
      <Form />
    </div>
  );
};

export default Layout;
