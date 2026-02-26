import { Outlet } from 'react-router';
import { CustomHeader } from '../components/CustomHeader';

export const LeadTrackLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomHeader />
      <Outlet />
    </div>
  );
};
