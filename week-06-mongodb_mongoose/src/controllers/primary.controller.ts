import { Request, Response, NextFunction } from 'express';
import * as service from '../services/primary.service';
import { createTeacherSchema, updateTeacherSchema } from '../schemas/teacher.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;

    const result = await service.getAll(page, limit, search);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Aseguramos que el id sea un string plano
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const item = await service.getById(id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = createTeacherSchema.parse(req.body);
    const newItem = await service.createPrimary(validatedData);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const validatedData = updateTeacherSchema.parse(req.body);
    const updated = await service.updatePrimary(id, validatedData);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await service.deletePrimary(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}