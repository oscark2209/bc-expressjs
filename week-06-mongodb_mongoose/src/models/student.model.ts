import { model, Schema, Types } from 'mongoose';

export interface IStudent {
  name: string;
  email: string;
  age?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  instruments: Types.ObjectId[];
  addedBy: Types.ObjectId;
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 4, max: 120 },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    instruments: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const StudentModel = model<IStudent>('Student', studentSchema);