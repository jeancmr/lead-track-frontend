import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/auth/store/auth.store';
import { createUpdateTaskAction } from '../actions/create-update-task.action';
import type { ClientTaskFormValues } from '../schemas/client-task.schema';
import { deleteTaskAction } from '../actions/delete-task.action';

export const useTask = (clientId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const taskMutation = useMutation({
    mutationFn: createUpdateTaskAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  const handleAddTask = async (taskData: ClientTaskFormValues) => {
    const taskBody = {
      task: taskData,
      userId: user?.id,
      clientId: +clientId,
    };

    await taskMutation.mutateAsync(taskBody, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTaskMutation.mutateAsync(taskId, {
      onSuccess: () => toast.success(`Task deleted succesfully`),
      onError: (error) => toast.error(error.message),
    });
  };

  return { onAddTask: handleAddTask, onDeleteTask: handleDeleteTask };
};
