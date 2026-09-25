import { Schema, model, Document } from 'mongoose';

export interface IInstrument extends Document {
  name: string;
  family: string;
}

const instrumentSchema = new Schema<IInstrument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    family: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const InstrumentModel = model<IInstrument>('Instrument', instrumentSchema);