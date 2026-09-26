import * as repo from '../repositories/secondary.repository';
import type { CreateInstrumentDto, UpdateInstrumentDto } from '../schemas/instrument.schema';
import { AppError } from '../errors/appError';
import { Types } from 'mongoose';

export async function getAll() {
  return await repo.getAll();
}

export async function getById(id: string) {
  const item = await repo.getById(id);
  if (!item) {
    throw new AppError('Instrumento no encontrado', 404);
  }
  return item;
}

export async function createSecondary(dto: CreateInstrumentDto, userId: string) {
  return repo.create({ ...dto, addedBy: new Types.ObjectId(userId) });
}

export async function updateSecondary(id: string, dto: UpdateInstrumentDto) {
  const updated = await repo.update(id, dto);
  if (!updated) {
    throw new AppError('Instrumento no encontrado para actualizar', 404);
  }
  return updated;
}

export async function deleteSecondary(id: string) {
  const deleted = await repo.remove(id);
  if (!deleted) throw new AppError('Instrumento no encontrado para eliminar', 404);
}