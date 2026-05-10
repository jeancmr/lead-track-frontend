import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { useForm, type Resolver } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clientTaskSchema, type ClientTaskFormValues } from '../schemas/client-task.schema';
import type { User } from '@/interfaces/user.interface';
import type { Task } from '@/interfaces/task.interface';

interface Props {
  taskDialog: boolean;
  selectedTask: Task | null;
  users: User[];
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (taskData: ClientTaskFormValues) => Promise<void>;
  onCloseDialog: () => void;
}

const initialTaskValues: ClientTaskFormValues = {
  id: '',
  title: '',
  dueDate: '',
  status: 'to-do',
  assignedTo: undefined,
};

export const ClientTasksFormDialog = ({
  taskDialog,
  selectedTask,
  users,
  setTaskDialog,
  onSubmit,
  onCloseDialog,
}: Props) => {
  const form = useForm<ClientTaskFormValues>({
    resolver: zodResolver(clientTaskSchema) as Resolver<ClientTaskFormValues>,
    defaultValues: initialTaskValues,
  });

  const isEditing = !!selectedTask;

  useEffect(() => {
    if (selectedTask) {
      form.reset({
        id: selectedTask.id,
        title: selectedTask.title,
        dueDate: selectedTask.dueDate.split('T')[0],
        status: selectedTask.status,
        assignedTo: selectedTask.assignedTo.id,
      });
    } else {
      form.reset(initialTaskValues);
    }
  }, [selectedTask, form]);

  return (
    <Dialog
      open={taskDialog}
      onOpenChange={(open) => {
        if (!open) onCloseDialog();
        else setTaskDialog(true);
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            {isEditing ? 'Edit Task' : 'Create Task'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the details of the task'
              : 'Fill in the details to create a new task for this client'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input id="task-title" placeholder="Enter task title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input id="due-date" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign to</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
                    value={field.value?.toString() ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={onCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? 'Update Task' : 'Create Task'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
