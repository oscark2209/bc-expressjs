import { z } from 'zod';

const studentFields = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  age: z.number().int().min(4).max(120).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  instruments: z.array(z.string().regex(/^[a-f\d]{24}$/i)).default([]),
});

export const createStudentSchema = z.object({ body: studentFields.strict() }).strict();
export const updateStudentSchema = z.object({
  body: studentFields.partial().refine((value) => Object.keys(value).length > 0, 'Debe enviar al menos un campo').strict(),
}).strict();
export type CreateStudentDto = z.infer<typeof createStudentSchema>['body'];
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>['body'];