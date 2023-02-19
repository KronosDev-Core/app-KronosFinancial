import { useNavigate } from 'react-router-dom';

import CalendarIcon from '@Assets/icons/Calendar';
import CompanyIcon from '@Assets/icons/Company';
import UserIcon from '@Assets/icons/User';
import LogoutIcon from '@Assets/icons/Logout';
import Button from '@Components/button';
import HomeIcon from '@Assets/icons/Home';

export default function Navbar() {
  const navigation = useNavigate();

  const handleNavigate = (path: string) => {
    navigation(path);
  };

  const ButtonStyle =
    'bg-transparent fill-slate-200 shadow-none w-full hover:bg-slate-700/75 rounded-none';

  return (
    <div className="w-24 h-full bg-slate-700 p-4 grid grid-cols-1 grid-rows-[repeat(8,_minmax(0,_1fr))] gap-4">
      <div className="row-span-1" />
      <div className="row-span-6 flex justify-center items-center">
        <div className="grid grid-cols-1 grid-rows-3 gap-2 bg-slate-800 rounded-2xl shadow-lg w-full h-fit">
          <Button
            callback={() => handleNavigate('dashboard')}
            className={ButtonStyle}
          >
            <HomeIcon />
          </Button>
          <Button
            callback={() => handleNavigate('calendar')}
            className={ButtonStyle}
          >
            <CalendarIcon />
          </Button>
          <Button
            callback={() => handleNavigate('stocks')}
            className={ButtonStyle}
          >
            <CompanyIcon />
          </Button>
        </div>
      </div>
      <div className="row-span-1 flex justify-center items-end">
        <div className="grid grid-cols-1 grid-rows-2 gap-2 bg-slate-800 rounded-2xl shadow-lg w-full h-fit">
          <Button
            callback={() => handleNavigate('account')}
            className={ButtonStyle}
          >
            <UserIcon />
          </Button>
          <Button
            callback={() => handleNavigate('/logout')}
            className={ButtonStyle}
          >
            <LogoutIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
