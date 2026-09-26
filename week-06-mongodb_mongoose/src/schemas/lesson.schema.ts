import { z } from 'zod';

const lessonFields = z.object({
  title: z.string().trim().min(2).max(120),
  student: z.string().regex(/^[a-f\d]{24}$/i),
  teacher: z.string().regex(/^[a-f\d]{24}$/i),
  instrument: z.string().regex(/^[a-f\d]{24}$/i),
  scheduledAt: z.coerce.date(),
  durationMinutes: z.number().int().min(15).max(240),
  notes: z.string().trim().max(1000).optional(),
});

export const createLessonSchema = z.object({ body: lessonFields.strict() }).strict();
export const updateLessonSchema = z.object({
  body: lessonFields.partial().refine((value) => Object.keys(value).length > 0, 'Debe enviar al menos un campo').strict(),
}).strict();
export type CreateLessonDto = z.infer<typeof createLessonSchema>['body'];
export type UpdateLessonDto = z.infer<typeof updateLessonSchema>['body'];