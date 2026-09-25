import { InstrumentModel, IInstrument } from '../model/instrument.model';
import { AppError } from '../errors/appError';
import { Types } from 'mongoose';

export async function getAll(): Promise<IInstrument[]> {
  return await InstrumentModel.find().sort({ createdAt: -1 });
}

export async function getById(id: string | Types.ObjectId): Promise<IInstrument> {
  try {
    const item = await InstrumentModel.findById(id);
    if (!item) throw new AppError(404, 'Instrumento no encontrado');
    return item;
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    if (err.name === 'CastError') throw new AppError(400, 'ID de instrumento inválido');
    throw err;
  }
}

export async function create(data: Partial<IInstrument>): Promise<IInstrument> {
  try {
    return await InstrumentModel.create(data);
  } catch (err: any) {
    if (err.code === 11000) throw new AppError(409, 'El instrumento ya existe');
    throw err;
  }
}

export async function update(id: string | Types.ObjectId, data: Partial<IInstrument>): Promise<IInstrument> {
  try {
    const updated = await InstrumentModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new AppError(404, 'Instrumento no encontrado para actualizar');
    return updated;
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    if (err.code === 11000) throw new AppError(409, 'El nombre del instrumento ya está en uso');
    if (err.name === 'CastError') throw new AppError(400, 'ID de instrumento inválido');
    throw err;
  }
}

export async function remove(id: string | Types.ObjectId): Promise<void> {
  try {
    const deleted = await InstrumentModel.findByIdAndDelete(id);
    if (!deleted) throw new AppError(404, 'Instrumento no encontrado para eliminar');
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    if (err.name === 'CastError') throw new AppError(400, 'ID de instrumento inválido');
    throw err;
  }
}