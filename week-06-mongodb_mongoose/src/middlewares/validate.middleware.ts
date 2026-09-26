import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse({ body: req.body });
    if (!result.success) {
      next(result.error);
      return;
    }
    if (typeof result.data === 'object' && result.data !== null && 'body' in result.data) {
      req.body = result.data.body;
    }
    next();
  };
}