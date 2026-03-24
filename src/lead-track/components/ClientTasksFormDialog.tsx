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
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { useForm, type Resolver } from 'react-hook-form';
import { clientTaskSchema, type ClientTaskFormValues } from '../schemas/client-task.schema';

interface Props {
  taskDialog: boolean;
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (taskData: ClientTaskFormValues) => Promise<void>;
}

const initialTaskValues: ClientTaskFormValues = {
  title: '',
  dueDate: '',
  status: 'to-do',
};

export const ClientTasksFormDialog = ({ taskDialog, setTaskDialog, onSubmit }: Props) => {
  const form = useForm<ClientTaskFormValues>({
    // resolver: zodResolver(clientTaskSchema),
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
                  <FormLabel>Due Date (optional)</FormLabel>
                  <FormControl>
                    <Input id="due-date" type="date" {...field} />
                  </FormControl>
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
