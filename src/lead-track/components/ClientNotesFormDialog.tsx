import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface ClientNotesFormDialogProps {
  noteDialog: boolean;
  setNoteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddNote: (event: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
}

export const ClientNotesFormDialog = ({
  noteDialog,
  setNoteDialog,
  handleAddNote,
}: ClientNotesFormDialogProps) => {
  return (
    <Dialog open={noteDialog} onOpenChange={setNoteDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Add Note
          </DialogTitle>
          <DialogDescription>Add a note to this client</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleAddNote}>
          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <textarea
              id="note"
              name="note"
              placeholder="Type your note here..."
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none h-32"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setNoteDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Note</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
