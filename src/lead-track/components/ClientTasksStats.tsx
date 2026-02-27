import { Card, CardContent } from '@/components/ui/card';
import type { LucideProps } from 'lucide-react';

interface Props {
  taskStats: {
    label: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
    color: string;
    value: number;
  }[];
}

export const ClientTasksStats = ({ taskStats }: Props) => {
  return (
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
  );
};
