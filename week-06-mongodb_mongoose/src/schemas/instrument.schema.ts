import { z } from 'zod';

export const createInstrumentSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(100),
    family: z.string().trim().min(1).max(50),
    brand: z.string().trim().max(100).optional(),
    description: z.string().trim().max(500).optional(),
  }).strict(),
});

export const updateInstrumentSchema = z.object({
  body: createInstrumentSchema.shape.body.partial().refine((value) => Object.keys(value).length > 0, 'Debe enviar al menos un campo').strict(),
}).strict();

export type CreateInstrumentDto = z.infer<typeof createInstrumentSchema>['body'];
export type UpdateInstrumentDto = z.infer<typeof updateInstrumentSchema>['body'];