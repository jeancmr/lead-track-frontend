import { Outlet } from 'react-router';

export const Authlayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};
