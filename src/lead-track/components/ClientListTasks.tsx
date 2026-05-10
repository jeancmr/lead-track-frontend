import { Calendar, Edit2, Plus, Trash2 } from 'lucide-react';
import { CustomAlertDialogDelete } from '@/components/custom/CustomAlertDialogDelete';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Task } from '@/interfaces/task.interface';

interface Props {
  tasks: Task[];
  onDeleteTask: (taskId: string) => Promise<void>;
  onHandleOpenDialog: (task: Task) => void;
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClientListTasks = ({
  tasks,
  onDeleteTask,
  onHandleOpenDialog,
  setTaskDialog,
}: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            {tasks?.filter((t) => t.status !== 'done').length} active,{' '}
            {tasks?.filter((t) => t.status === 'done').length} completed
          </CardDescription>
        </div>
        <Button size="sm" onClick={() => setTaskDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {tasks?.length === 0 ? (
            <p className="text-sm text-slate-500">No tasks yet</p>
          ) : (
            tasks?.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg border ${task.status === 'done' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-slate-500' : 'text-slate-900'}`}
                        >
                          {task.title}
                        </p>
                        {task.dueDate && (
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <p className="text-xs text-slate-500">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => onHandleOpenDialog(task)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <CustomAlertDialogDelete
                    itemName={`task ${task.title}`}
                    onDeleteItem={() => onDeleteTask(task.id)}
                  >
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CustomAlertDialogDelete>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
