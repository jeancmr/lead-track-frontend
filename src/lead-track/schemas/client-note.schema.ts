import { z } from 'zod';

export const clientNoteSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(6, 'Note content must be at least 6 characters long'),
});

export type ClientNoteFormValues = z.infer<typeof clientNoteSchema>;
