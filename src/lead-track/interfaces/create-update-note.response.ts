import type { Note } from '@/interfaces/note.interface';

export interface CreateUpdateNoteResponse {
  message: string;
  data: Note;
}
