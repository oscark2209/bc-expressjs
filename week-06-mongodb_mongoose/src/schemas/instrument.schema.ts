import { z } from 'zod';

export const createInstrumentSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(100),
  family: z.string().min(1, 'La familia es obligatoria').max(50),
});

export const updateInstrumentSchema = createInstrumentSchema.partial();

export type CreateInstrumentDto = z.infer<typeof createInstrumentSchema>;
export type UpdateInstrumentDto = z.infer<typeof updateInstrumentSchema>;