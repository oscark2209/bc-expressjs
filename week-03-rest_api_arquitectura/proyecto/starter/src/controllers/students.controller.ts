import type { Request, Response } from 'express';
import { studentsService } from '../services/students.service.js';

export class StudentsController {
  async getAll(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const result = await studentsService.findAll(page, limit);
    res.status(200).json(result);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const student = await studentsService.findById(id);

    if (!student) {
      res.status(404).json({
        error: 'Not Found',
        message: `Student ${id} not found`
      });
      return;
    }

    res.status(200).json({ data: student });
  }

  async create(req: Request, res: Response): Promise<void> {
    const newStudent = await studentsService.create(req.body);
    res.status(201).json({ data: newStudent });
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const updated = await studentsService.update(id, req.body);

    if (!updated) {
      res.status(404).json({
        error: 'Not Found',
        message: `Student ${id} not found`
      });
      return;
    }

    res.status(200).json({ data: updated });
  }

  async remove(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const deleted = await studentsService.remove(id);

    if (!deleted) {
      res.status(404).json({
        error: 'Not Found',
        message: `Student ${id} not found`
      });
      return;
    }

    res.status(204).send();
  }
}

export const studentsController = new StudentsController();