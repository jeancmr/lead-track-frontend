import type { Task } from '@/interfaces/task.interface';
import { useState } from 'react';
import { toast } from 'sonner';
import type { ClientTaskFormValues } from '../schemas/client-task.schema';
import { useTask } from './useTask';

export const useClientPageTasks = (idClient: number) => {
  const [taskDialog, setTaskDialog] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>();

  const { onDeleteTask, mutation: taskMutation } = useTask();

  const handleTaskSubmit = async (taskData: ClientTaskFormValues) => {
    const taskBody = {
      task: taskData,
      clientId: idClient,
    };

    await taskMutation.mutateAsync(taskBody, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    handleCloseTaskDialog();
  };

  const handleOpenTaskDialog = async (task: Task) => {
    setSelectedTask(task);
    setTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setTaskDialog(false);

    setTimeout(() => {
      setSelectedTask(null);
    }, 200);
  };
  return {
    taskModule: {
      selectedTask,
      taskDialog,
      handleCloseTaskDialog,
      handleOpenTaskDialog,
      handleTaskSubmit,
      onDeleteTask,
      setSelectedTask,
      setTaskDialog,
    },
  };
};
