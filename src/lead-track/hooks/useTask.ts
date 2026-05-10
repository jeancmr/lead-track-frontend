import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createUpdateTaskAction } from '../actions/create-update-task.action';
import { deleteTaskAction } from '../actions/delete-task.action';
import type { ClientTaskFormValues } from '../schemas/client-task.schema';
import { getTasksByUserAction } from '../actions/get-tasks-by-user.action';
import { useAuthStore } from '@/auth/store/auth.store';
import { updateTaskStatusAction } from '../actions/update-task-status.action';
import type { TaskStatus } from '@/schemas/task-status-enum';

export const useTask = (clientId?: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['tasks', { userId: user?.id }],
    queryFn: () => getTasksByUserAction(user?.id || 0),
    staleTime: 1000 * 6 * 5,
  });

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

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatusAction(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleAddTask = async (taskData: ClientTaskFormValues) => {
    const taskBody = {
      task: taskData,
      clientId: +(clientId ?? 0),
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
    onAddTask: handleAddTask,
    onDeleteTask: handleDeleteTask,
    onUpdateTaskStatus: handleUpdateTaskStatus,
  };
};
