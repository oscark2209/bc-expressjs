import { model, Schema, Types } from 'mongoose';

export interface IInstrument {
  name: string;
  family: string;
  brand?: string;
  description?: string;
  addedBy: Types.ObjectId;
}

const instrumentSchema = new Schema<IInstrument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    family: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    description: { type: String, trim: true, maxlength: 500 },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const InstrumentModel = model<IInstrument>('Instrument', instrumentSchema);