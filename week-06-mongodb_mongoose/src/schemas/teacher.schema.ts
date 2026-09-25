import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createTeacherSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(100),
  email: z.string().email('Correo electrónico inválido'),
  instrument: z.string().regex(objectIdRegex, 'ID de instrumento inválido'),
});

export const updateTeacherSchema = createTeacherSchema.partial();

export type CreateTeacherDto = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherDto = z.infer<typeof updateTeacherSchema>;