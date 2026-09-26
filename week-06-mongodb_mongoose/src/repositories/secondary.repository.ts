import { InstrumentModel, IInstrument } from '../models/instrument.model';
import { Types } from 'mongoose';

export async function getAll(): Promise<IInstrument[]> {
  return await InstrumentModel.find().sort({ createdAt: -1 });
}

export async function getById(id: string | Types.ObjectId): Promise<IInstrument | null> {
  return InstrumentModel.findById(id);
}

export async function create(data: Partial<IInstrument>): Promise<IInstrument> {
  return InstrumentModel.create(data);
}

export async function update(id: string | Types.ObjectId, data: Partial<IInstrument>): Promise<IInstrument | null> {
  return InstrumentModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function remove(id: string | Types.ObjectId): Promise<IInstrument | null> {
  return InstrumentModel.findByIdAndDelete(id);
}