import type { Request, Response, NextFunction } from 'express';
import { studentsService } from '../services/students.service.js';
import { studentIdParamSchema, createStudentSchema, updateStudentSchema } from '../schemas/student.schema.js';

export class StudentsController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit } = req.query;
      const result = await studentsService.getAll(page as string, limit as string);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedParams = studentIdParamSchema.parse(req.params);
      const student = await studentsService.getById(parsedParams.id);
      res.status(200).json({ data: student });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedBody = createStudentSchema.parse(req.body);
      const newStudent = await studentsService.create(parsedBody);
      res.status(201).json({ data: newStudent });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedParams = studentIdParamSchema.parse(req.params);
      const parsedBody = updateStudentSchema.parse(req.body);
      const updatedStudent = await studentsService.update(parsedParams.id, parsedBody);
      res.status(200).json({ data: updatedStudent });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedParams = studentIdParamSchema.parse(req.params);
      await studentsService.delete(parsedParams.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}