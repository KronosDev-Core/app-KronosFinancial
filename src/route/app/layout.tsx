import { Outlet } from 'react-router-dom';
import Navbar from './(container)/navbar';

export default function Layout() {
  return (
    <div className="flex w-full h-full">
      <Navbar />
      <div className="grid grid-cols-1 grid-rows-1 gap-4 w-full h-full">
          <Outlet />
      </div>
    </div>
  );
}
