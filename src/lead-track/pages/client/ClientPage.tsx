import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { BacktoClientList } from '@/lead-track/components/BacktoClientList';
import { ClientDetails } from '@/lead-track/components/ClientDetails';
import { ClientListNotes } from '@/lead-track/components/ClientListNotes';
import { ClientListTasks } from '@/lead-track/components/ClientListTasks';
import { ClientNotesFormDialog } from '@/lead-track/components/ClientNotesFormDialog';
import { ClientTasksFormDialog } from '@/lead-track/components/ClientTasksFormDialog';
import { useClient } from '@/lead-track/hooks/useClient';
import { useNote } from '@/lead-track/hooks/useNote';
import { useTask } from '@/lead-track/hooks/useTask';
import { useUsers } from '@/lead-track/hooks/useUsers';
import { useAuthStore } from '@/auth/store/auth.store';
import type { ClientTaskFormValues } from '@/lead-track/schemas/client-task.schema';
import type { Task } from '@/interfaces/task.interface';
import type { Note } from '@/interfaces/note.interface';
import type { ClientNoteFormValues } from '@/lead-track/schemas/client-note.schema';

export const ClientPage = () => {
  const { idClient } = useParams();
  const { user } = useAuthStore();
  const [noteDialog, setNoteDialog] = useState(false);
  const [taskDialog, setTaskDialog] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>();
  const [selectedNote, setSelectedNote] = useState<Note | null>();

  const { data: client, isLoading } = useClient(idClient || '');
  const { mutation: noteMutation, onDeleteNote } = useNote(idClient || '');
  const { onDeleteTask, mutation: taskMutation } = useTask();

  const { data: users } = useUsers();

  const notes = client?.notes;
  const tasks = client?.tasks;

  const handleTaskSubmit = async (taskData: ClientTaskFormValues) => {
    const taskBody = {
      task: taskData,
      clientId: +(idClient ?? 0),
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

  const handleNoteSubmit = async (noteData: ClientNoteFormValues) => {
    // if (note === '') return toast.error('Note content cannot be empty');

    const noteBody = {
      note: { content: noteData.content, id: noteData.id || '' },
      userId: user?.id,
      clientId: +idClient!,
    };

    await noteMutation.mutateAsync(noteBody, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    handleCloseNoteDialog();
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

  const handleOpenNoteDialog = async (note: Note) => {
    setSelectedNote(note);
    setNoteDialog(true);
  };

  const handleCloseNoteDialog = () => {
    setNoteDialog(false);

    setTimeout(() => {
      setSelectedNote(null);
    }, 200);
  };

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!client) {
    return (
      <div className="space-y-6">
        <BacktoClientList />
        <div className="text-center text-slate-500">Client not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BacktoClientList />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClientDetails client={client} />

        <div className="md:col-span-2 space-y-6">
          <ClientListNotes
            onHandleOpenDialog={handleOpenNoteDialog}
            notes={notes || []}
            onDeleteNote={onDeleteNote}
            setNoteDialog={setNoteDialog}
          />

          {user?.role === 'admin' && (
            <ClientListTasks
              onHandleOpenDialog={handleOpenTaskDialog}
              tasks={tasks || []}
              onDeleteTask={onDeleteTask}
              setTaskDialog={setTaskDialog}
            />
          )}
        </div>
      </div>

      <ClientNotesFormDialog
        selectedNote={selectedNote || null}
        noteDialog={noteDialog}
        setNoteDialog={setNoteDialog}
        onSubmit={handleNoteSubmit}
        onCloseDialog={handleCloseNoteDialog}
      />

      <ClientTasksFormDialog
        selectedTask={selectedTask || null}
        taskDialog={taskDialog}
        setTaskDialog={setTaskDialog}
        onSubmit={handleTaskSubmit}
        onCloseDialog={handleCloseTaskDialog}
        users={users || []}
      />
    </div>
  );
};
