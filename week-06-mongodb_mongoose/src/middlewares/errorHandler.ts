import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError';

export function errorHandler(
  err: unknown,
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
  if (err instanceof Error && err.name === 'ZodError') {
    res.status(400).json({
      status: 'error',
      message: 'Error de validación en los datos enviados',
      errors: 'issues' in err ? err.issues : undefined,
    });
    return;
  }

  if (err instanceof Error && err.name === 'CastError') {
    res.status(400).json({ status: 'error', message: 'ID inválido' });
    return;
  }

  if (typeof err === 'object' && err !== null && 'code' in err && err.code === 11000) {
    res.status(409).json({ status: 'error', message: 'El registro ya existe' });
    return;
  }

  // Error genérico del servidor (500)
  console.error('ERROR NO CONTROLADO:', err);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
  });
}