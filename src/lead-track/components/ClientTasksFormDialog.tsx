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
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { useForm, type Resolver } from 'react-hook-form';
import { clientTaskSchema, type ClientTaskFormValues } from '../schemas/client-task.schema';
import type { User } from '@/interfaces/user.interface';

interface Props {
  taskDialog: boolean;
  users: User[];
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (taskData: ClientTaskFormValues) => Promise<void>;
}

const initialTaskValues: ClientTaskFormValues = {
  title: '',
  dueDate: '',
  status: 'to-do',
  assignedTo: undefined,
};

export const ClientTasksFormDialog = ({ taskDialog, users, setTaskDialog, onSubmit }: Props) => {
  const form = useForm<ClientTaskFormValues>({
    resolver: zodResolver(clientTaskSchema) as Resolver<ClientTaskFormValues>,
    defaultValues: initialTaskValues,
  });

  return (
    <Dialog open={taskDialog} onOpenChange={setTaskDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Add Task
          </DialogTitle>
          <DialogDescription>Create a new task for this client</DialogDescription>
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
              <Button type="button" variant="outline" onClick={() => setTaskDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Task</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
