import { z } from 'zod';

export const createStudentSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  isActive: z.boolean().optional(),
  instrumentId: z.string().uuid('El ID del instrumento debe ser un UUID válido'),
});

export const updateStudentSchema = createStudentSchema.partial();

export const paginationSchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
});

export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;