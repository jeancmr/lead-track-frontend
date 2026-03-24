import { useState, type SubmitEvent } from 'react';
import { useParams } from 'react-router';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { BacktoClientList } from '@/lead-track/components/BacktoClientList';
import { ClientDetails } from '@/lead-track/components/ClientDetails';
import { ClientListNotes } from '@/lead-track/components/ClientListNotes';
import { ClientListTasks } from '@/lead-track/components/ClientListTasks';
import { ClientNotesFormDialog } from '@/lead-track/components/ClientNotesFormDialog';
import { ClientTasksFormDialog } from '@/lead-track/components/ClientTasksFormDialog';
import { useClient } from '@/lead-track/hooks/useClient';
import { useNote } from '@/lead-track/hooks/useNote';

export const ClientPage = () => {
  const { idClient } = useParams();
  const [noteDialog, setNoteDialog] = useState(false);

  const { data: client, isLoading } = useClient(idClient || '');
  const { onAddNote, onDeleteNote } = useNote(idClient || '');

  const notes = client?.notes;
  const tasks = client?.tasks;
  const [taskDialog, setTaskDialog] = useState(false);

  const handleAddNote = async (event: SubmitEvent<HTMLFormElement>) => {
    onAddNote(event);
    setNoteDialog((prev) => !prev);
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
            notes={notes || []}
            onDeleteNote={onDeleteNote}
            setNoteDialog={setNoteDialog}
          />

          <ClientListTasks tasks={tasks || []} setTaskDialog={setTaskDialog} />
        </div>
      </div>

      <ClientNotesFormDialog
        noteDialog={noteDialog}
        handleAddNote={handleAddNote}
        setNoteDialog={setNoteDialog}
      />

      <ClientTasksFormDialog taskDialog={taskDialog} setTaskDialog={setTaskDialog} />
    </div>
  );
};
