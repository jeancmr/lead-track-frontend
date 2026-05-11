import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquare } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Note } from '@/interfaces/note.interface';

import { clientNoteSchema, type ClientNoteFormValues } from '../schemas/client-note.schema';

interface ClientNotesFormDialogProps {
  noteDialog: boolean;
  selectedNote: Note | null;
  setNoteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (noteData: ClientNoteFormValues) => Promise<void>;
  onCloseDialog: () => void;
}

const initialNoteValues: ClientNoteFormValues = {
  id: '',
  content: '',
};

export const ClientNotesFormDialog = ({
  noteDialog,
  selectedNote,
  setNoteDialog,
  onCloseDialog,
  onSubmit,
}: ClientNotesFormDialogProps) => {
  const form = useForm<ClientNoteFormValues>({
    resolver: zodResolver(clientNoteSchema) as Resolver<ClientNoteFormValues>,
    defaultValues: initialNoteValues,
  });

  const isEditing = !!selectedNote;

  useEffect(() => {
    if (selectedNote) {
      form.reset({
        id: selectedNote.id,
        content: selectedNote.content,
      });
    } else {
      form.reset(initialNoteValues);
    }
  }, [selectedNote, form]);

  return (
    <Dialog
      open={noteDialog}
      onOpenChange={(open) => {
        if (!open) onCloseDialog();
        else setNoteDialog(true);
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {isEditing ? 'Edit Note' : 'Add Note'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the content' : 'Type the new note below'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Type here..."
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={onCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? 'Update Note' : 'Add Note'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
