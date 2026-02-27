import { NavLink } from 'react-router';
import { LayoutDashboard, Users, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CustomNavigation = () => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/clients', label: 'Clients', icon: Users },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  ];

  return (
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
  );
};
