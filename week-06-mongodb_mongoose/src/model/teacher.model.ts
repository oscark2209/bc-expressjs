import { Schema, model, Document, Types } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  email: string;
  instrument: Types.ObjectId;
}

const teacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    instrument: {
      type: Schema.Types.ObjectId,
      ref: 'Instrument',
      required: true,
    },
  },
  { timestamps: true }
);

export const TeacherModel = model<ITeacher>('Teacher', teacherSchema);