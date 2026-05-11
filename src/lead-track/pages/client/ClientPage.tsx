import { useAuthStore } from '@/auth/store/auth.store';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { BacktoClientList } from '@/lead-track/components/BacktoClientList';
import { ClientDetails } from '@/lead-track/components/ClientDetails';
import { ClientListNotes } from '@/lead-track/components/ClientListNotes';
import { ClientListTasks } from '@/lead-track/components/ClientListTasks';
import { ClientNotesFormDialog } from '@/lead-track/components/ClientNotesFormDialog';
import { ClientTasksFormDialog } from '@/lead-track/components/ClientTasksFormDialog';
import { useClient } from '@/lead-track/hooks/useClient';
import { useClientPageNotes } from '@/lead-track/hooks/useClientPageNotes';
import { useClientPageTasks } from '@/lead-track/hooks/useClientPageTasks';
import { useUsers } from '@/lead-track/hooks/useUsers';
import { useParams } from 'react-router';

export const ClientPage = () => {
  const { idClient } = useParams();
  const { user } = useAuthStore();

  const { data: client, isLoading } = useClient(idClient || '');

  const { taskModule } = useClientPageTasks(idClient ? +idClient : 0);

  const { noteModule } = useClientPageNotes(user, idClient ? +idClient : 0);

  const { data: users } = useUsers();

  const notes = client?.notes;
  const tasks = client?.tasks;

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
            onHandleOpenDialog={noteModule.handleOpenNoteDialog}
            notes={notes || []}
            onDeleteNote={noteModule.onDeleteNote}
            setNoteDialog={noteModule.setNoteDialog}
          />

          {user?.role === 'admin' && (
            <ClientListTasks
              onHandleOpenDialog={taskModule.handleOpenTaskDialog}
              tasks={tasks || []}
              onDeleteTask={taskModule.onDeleteTask}
              setTaskDialog={taskModule.setTaskDialog}
            />
          )}
        </div>
      </div>

      <ClientNotesFormDialog
        selectedNote={noteModule.selectedNote || null}
        noteDialog={noteModule.noteDialog}
        setNoteDialog={noteModule.setNoteDialog}
        onSubmit={noteModule.handleNoteSubmit}
        onCloseDialog={noteModule.handleCloseNoteDialog}
      />

      <ClientTasksFormDialog
        selectedTask={taskModule.selectedTask || null}
        taskDialog={taskModule.taskDialog}
        setTaskDialog={taskModule.setTaskDialog}
        onSubmit={taskModule.handleTaskSubmit}
        onCloseDialog={taskModule.handleCloseTaskDialog}
        users={users || []}
      />
    </div>
  );
};
