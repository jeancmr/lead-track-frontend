import { Card, CardContent } from '@/components/ui/card';
import { CustomJumbotron } from '@/lead-track/components/CustomJumbotron';
import { Users, TrendingUp, Phone, Clock, CheckCircle, ListTodo, CheckSquare } from 'lucide-react';

const clientStats = [
  { label: 'Total Clients', value: 0, icon: Users, color: 'bg-blue-500' },
  { label: 'Leads', value: 0, icon: TrendingUp, color: 'bg-amber-500' },
  { label: 'Contacted', value: 0, icon: Phone, color: 'bg-cyan-500' },
  { label: 'Negotiating', value: 0, icon: Clock, color: 'bg-orange-500' },
  { label: 'Closed', value: 0, icon: CheckCircle, color: 'bg-emerald-500' },
];

const taskStats = [
  { label: 'To Do', value: 0, icon: ListTodo, color: 'bg-slate-500' },
  { label: 'In Progress', value: 0, icon: Clock, color: 'bg-blue-500' },
  { label: 'Done', value: 0, icon: CheckSquare, color: 'bg-emerald-500' },
];

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <CustomJumbotron
        title="Welcome back, Jean"
        subtitle="Here's an overview of your CRM activity"
      />

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Client Overview</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {clientStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-5">
                  <div className="flex items-center">
                    <div className={`shrink-0 ${stat.color} rounded-md p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Task Summary</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {taskStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-5">
                  <div className="flex items-center">
                    <div className={`shrink-0 ${stat.color} rounded-md p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
