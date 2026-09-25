import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateSchema = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validamos únicamente el body de la petición contra el esquema Zod
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          statusCode: 400,
          // Mapeamos los errores de Zod de forma clara
          message: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', '),
          errors: error.errors,
        });
        return;
      }
      next(error);
    }
  };
};