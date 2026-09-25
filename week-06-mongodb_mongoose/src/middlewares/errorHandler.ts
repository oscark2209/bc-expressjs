import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Si es un error operacional controlado de nuestra app
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // Errores de validación de Zod
  if (err.name === 'ZodError') {
    res.status(400).json({
      status: 'error',
      message: 'Error de validación en los datos enviados',
      errors: err.errors,
    });
    return;
  }

  // Error genérico del servidor (500)
  console.error('ERROR NO CONTROLADO 💥:', err);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
  });
}