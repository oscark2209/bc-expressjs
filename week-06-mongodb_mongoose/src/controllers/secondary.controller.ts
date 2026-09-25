import { Request, Response, NextFunction } from 'express';
import * as service from '../services/secondary.service';
import { createInstrumentSchema, updateInstrumentSchema } from '../schemas/instrument.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const item = await service.getById(id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = createInstrumentSchema.parse(req.body);
    const newItem = await service.createSecondary(validatedData);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const validatedData = updateInstrumentSchema.parse(req.body);
    const updated = await service.updateSecondary(id, validatedData);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await service.deleteSecondary(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}