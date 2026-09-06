import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { logger } from '../config/logger.js';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Validation failed',
      issues: err.issues
    });
    return;
  }

  if (err instanceof AppError) {
    logger.warn(`Operational Error [${err.statusCode}]: ${err.message}`);
    res.status(err.statusCode).json({
      error: err.statusCode === 404 ? 'Not Found' : 'Error',
      message: err.message
    });
    return;
  }

  logger.error(`Unhandled Error: ${err.stack || err.message}`);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
};