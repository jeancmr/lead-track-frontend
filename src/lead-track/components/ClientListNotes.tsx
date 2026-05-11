import { CustomAlertDialogDelete } from '@/components/custom/CustomAlertDialogDelete';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Note } from '@/interfaces/note.interface';
import { Edit2, Plus, Trash2 } from 'lucide-react';

interface Props {
  notes: Note[];
  setNoteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleOpenDialog: (note: Note) => void;
  onDeleteNote: (noteId: string) => Promise<void>;
}

export const ClientListNotes = ({
  notes,
  setNoteDialog,
  onHandleOpenDialog,
  onDeleteNote,
}: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Notes</CardTitle>
          <CardDescription>
            {notes?.length} note{notes?.length !== 1 ? 's' : ''}
          </CardDescription>
        </div>
        <Button size="sm" onClick={() => setNoteDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notes?.length === 0 ? (
            <p className="text-sm text-slate-500">No notes yet</p>
          ) : (
            notes?.map((note) => (
              <div key={note.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{note.content}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {new Date(note.createdAt).toLocaleDateString()} at{' '}
                      {new Date(note.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => onHandleOpenDialog(note)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <CustomAlertDialogDelete
                    itemName={`note ${note.id}`}
                    onDeleteItem={() => onDeleteNote(note.id)}
                  >
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CustomAlertDialogDelete>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
