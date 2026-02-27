import { LogOut, UserCircle } from 'lucide-react';
import { CustomLogo } from '@/components/custom/CustomLogo';
import { Button } from '@/components/ui/button';
import { CustomNavigation } from './CustomNavigation';
import { useAuthStore } from '@/auth/store/auth.store';

export const CustomHeader = () => {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <CustomLogo />

            <CustomNavigation />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">{user.name}</span>

              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                {user.role}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
