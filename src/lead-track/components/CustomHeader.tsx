import { CustomLogo } from '@/components/custom/CustomLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckSquare, LayoutDashboard, LogOut, UserCircle, Users } from 'lucide-react';
import { NavLink } from 'react-router';

export const CustomHeader = () => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/clients', label: 'Clients', icon: Users },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <CustomLogo />
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    to={item.path}
                    key={item.path}
                    className={({ isActive }) =>
                      cn(
                        'inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'border-primary text-slate-900'
                          : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300',
                      )
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">User</span>

              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                Support
              </span>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
