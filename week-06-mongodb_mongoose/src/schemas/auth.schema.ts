import { z } from 'zod';

const credentials = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(10).refine((value) => Buffer.byteLength(value, 'utf8') <= 72, 'La contraseña supera el límite seguro de bcrypt'),
});

export const registerSchema = z.object({
  body: credentials.extend({ name: z.string().trim().min(2).max(100) }).strict(),
}).strict();
export const loginSchema = z.object({ body: credentials.strict() }).strict();
export type RegisterDto = z.infer<typeof registerSchema>['body'];
export type LoginDto = z.infer<typeof loginSchema>['body'];