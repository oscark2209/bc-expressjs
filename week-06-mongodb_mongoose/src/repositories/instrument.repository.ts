import { InstrumentModel, IInstrument } from '../models/instrument.model';

export const instrumentRepository = {
  findAll: () => InstrumentModel.find().sort({ createdAt: -1 }),
  findById: (id: string) => InstrumentModel.findById(id),
  create: (data: Partial<IInstrument>) => InstrumentModel.create(data),
  updateById: (id: string, data: Partial<IInstrument>) => InstrumentModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  deleteById: (id: string) => InstrumentModel.findByIdAndDelete(id),
};