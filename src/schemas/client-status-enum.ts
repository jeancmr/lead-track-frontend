import { z } from 'zod';

export const statusEnum = z.enum(['all', 'lead', 'contacted', 'negotiating', 'closed']);

export type ClientStatus = z.infer<typeof statusEnum>;
