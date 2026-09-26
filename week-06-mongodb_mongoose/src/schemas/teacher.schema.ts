import { z } from 'zod';

export const createTeacherSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    specialty: z.string().trim().min(2).max(100),
    instruments: z.array(z.string().regex(/^[a-f\d]{24}$/i)).default([]),
    availability: z.array(z.string().trim().min(1).max(50)).default([]),
  }).strict(),
}).strict();

export const updateTeacherSchema = z.object({
  body: createTeacherSchema.shape.body.partial().refine((value) => Object.keys(value).length > 0, 'Debe enviar al menos un campo').strict(),
}).strict();

export type CreateTeacherDto = z.infer<typeof createTeacherSchema>['body'];
export type UpdateTeacherDto = z.infer<typeof updateTeacherSchema>['body'];