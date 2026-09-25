import { Types } from 'mongoose';
import * as repo from '../repositories/primary.repository';
import type { CreateTeacherDto, UpdateTeacherDto } from '../schemas/teacher.schema';

export async function getAll(page: number, limit: number, search?: string) {
  return await repo.getAll(page, limit, search);
}

export async function getById(id: string) {
  return await repo.getById(id);
}

export async function createPrimary(dto: CreateTeacherDto) {
  // Convertimos el string del DTO a Types.ObjectId para que coincida con ITeacher
  const dataToCreate = {
    ...dto,
    instrument: new Types.ObjectId(dto.instrument),
  };
  return await repo.create(dataToCreate);
}

export async function updatePrimary(id: string, dto: UpdateTeacherDto) {
  // Si viene instrument en el DTO de actualización, también lo convertimos a ObjectId
  const dataToUpdate: any = { ...dto };
  if (dto.instrument) {
    dataToUpdate.instrument = new Types.ObjectId(dto.instrument);
  }
  return await repo.update(id, dataToUpdate);
}

export async function deletePrimary(id: string) {
  return await repo.remove(id);
}