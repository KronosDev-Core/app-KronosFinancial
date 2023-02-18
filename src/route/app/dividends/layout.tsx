import CalendarContainer from './(container)/calendar/container';
import FormContainer from './(container)/form/container';
import ListContainer from './(container)/list/container';

export default function Layout() {
  return (
    <div className="w-full h-full grid grid-cols-6 grid-rows-6 bg-slate-700 gap-4 p-2 lining-nums tabular-nums text-slate-200">
      <ListContainer />
      <CalendarContainer />
      <FormContainer />
    </div>
  );
}
