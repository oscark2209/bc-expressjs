import { z } from 'zod';

export const studentIdParamSchema = z.object({
  id: z.coerce.number().int({ message: 'El ID debe ser un número entero' }).positive({ message: 'El ID debe ser positivo' })
});

export const createStudentSchema = z.object({
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').trim(),
  email: z.string().email('Debe ser un correo electrónico válido').trim(),
  instrumentId: z.number().int().positive('El instrumentId debe ser entero positivo'),
  teacherId: z.number().int().positive('El teacherId debe ser entero positivo'),
  active: z.boolean().default(true)
});

export const updateStudentSchema = createStudentSchema.partial();

export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;