import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import logger from '../config/logger';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Error interno del servidor';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  logger.error(`[Error] ${statusCode} - ${err.message} - ${req.method} ${req.originalUrl}`);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};