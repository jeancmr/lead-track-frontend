import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  taskDialog: boolean;
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClientTasksFormDialog = ({ taskDialog, setTaskDialog }: Props) => {
  const [taskForm, setTaskForm] = useState({
    title: '',
    dueDate: '',
  });

  const handleAddTask = async () => {
    try {
      setTaskDialog(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              placeholder="Enter task title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date (optional)</Label>
            <Input
              id="due-date"
              type="date"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setTaskDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddTask} disabled={!taskForm.title.trim()}>
              Add Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
