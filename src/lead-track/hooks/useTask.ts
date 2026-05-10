import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/auth/store/auth.store';
import type { TaskStatus } from '@/schemas/task-status-enum';
import { createUpdateTaskAction } from '../actions/create-update-task.action';
import { deleteTaskAction } from '../actions/delete-task.action';
import { getTasksByUserAction } from '../actions/get-tasks-by-user.action';
import { updateTaskStatusAction } from '../actions/update-task-status.action';

export const useTask = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['tasks', { userId: user?.id }],
    queryFn: () => getTasksByUserAction(user?.id || 0),
    staleTime: 1000 * 6 * 5,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatusAction(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const mutation = useMutation({
    mutationFn: createUpdateTaskAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleDeleteTask = async (taskId: string) => {
    await deleteTaskMutation.mutateAsync(taskId, {
      onSuccess: () => toast.success(`Task deleted succesfully`),
      onError: (error) => toast.error(error.message),
    });
  };

  const handleUpdateTaskStatus = async (taskId: string, status: TaskStatus) => {
    await updateTaskStatusMutation.mutateAsync(
      { taskId, status },
      {
        onSuccess: () => toast.success(`Task status updated`),
        onError: (error) => toast.error(error.message),
      },
    );
  };

  return {
    ...query,
    mutation,
    onDeleteTask: handleDeleteTask,
    onUpdateTaskStatus: handleUpdateTaskStatus,
  };
};
