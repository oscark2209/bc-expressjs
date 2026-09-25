import * as repo from '../repositories/secondary.repository';
import type { CreateInstrumentDto, UpdateInstrumentDto } from '../schemas/instrument.schema';

export async function getAll() {
  return await repo.getAll();
}

export async function getById(id: string) {
  return await repo.getById(id);
}

export async function createSecondary(dto: CreateInstrumentDto) {
  return await repo.create(dto);
}

export async function updateSecondary(id: string, dto: UpdateInstrumentDto) {
  return await repo.update(id, dto);
}

export async function deleteSecondary(id: string) {
  return await repo.remove(id);
}