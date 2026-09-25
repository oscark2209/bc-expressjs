import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../errors/AppError';

const idParamSchema = z.object({
  id: z.string().uuid('El ID debe ser un UUID válido')
});

export class StudentsController {
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);

      res.status(200).json({
        status: 'success',
        data: { id },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(e => e.message).join(', ');
        return next(new AppError(400, messages));
      }
      next(error);
    }
  }
}