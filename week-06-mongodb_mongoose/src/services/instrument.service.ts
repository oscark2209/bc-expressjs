import { Types } from 'mongoose';
import { AppError } from '../errors/appError';
import { instrumentRepository } from '../repositories/instrument.repository';
import type { CreateInstrumentDto, UpdateInstrumentDto } from '../schemas/instrument.schema';

export const instrumentService = {
  getAll: () => instrumentRepository.findAll(),
  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de instrumento inválido', 400);
    const instrument = await instrumentRepository.findById(id);
    if (!instrument) throw new AppError('Instrumento no encontrado', 404);
    return instrument;
  },
  create(data: CreateInstrumentDto, userId: string) {
    return instrumentRepository.create({ ...data, addedBy: new Types.ObjectId(userId) });
  },
  async update(id: string, data: UpdateInstrumentDto) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de instrumento inválido', 400);
    const instrument = await instrumentRepository.updateById(id, data);
    if (!instrument) throw new AppError('Instrumento no encontrado', 404);
    return instrument;
  },
  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de instrumento inválido', 400);
    if (!(await instrumentRepository.deleteById(id))) throw new AppError('Instrumento no encontrado', 404);
  },
};