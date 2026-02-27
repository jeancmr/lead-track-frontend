import { z } from 'zod';

export const clientStatusEnum = z.enum(['all', 'lead', 'contacted', 'negotiating', 'closed']);

export const baseClientSchema = z.object({
  id: z.number(),

  name: z.string().trim().min(2, 'Name must be at least 2 characters'),

  email: z.string().email('Invalid email address'),

  phone: z.string().min(2, 'Phone must be at least 2 characters'),

  company: z.string().trim().min(2, 'Company must be at least 2 characters'),

  status: clientStatusEnum,
});

export type ClientFormValues = z.infer<typeof baseClientSchema>;
