import { ClientStats } from '@/lead-track/components/ClientStats';
import { ClientTasksStats } from '@/lead-track/components/ClientTasksStats';
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

      <ClientStats clientStats={clientStats} />

      <ClientTasksStats taskStats={taskStats} />
    </div>
  );
};
